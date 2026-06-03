import { baseApi } from "@shared/api";
import type {
  ComponentCreateResultDto,
  ComponentCursorResultDto,
  ComponentResultDto,
  ComponentFiltersDto,
  ComponentNewVersionResultDto,
  ComponentNewVersionDto,
} from "../dto/component.dto";

const ENDPOINT = "components/main";

export const componentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllComponents: builder.query<
      ComponentCursorResultDto,
      Partial<ComponentFiltersDto> & { sort?: "asc" | "desc" }
    >({
      query: ({
        skip = 0,
        limit = 10,
        query,
        framework,
        username,
        startDate,
        tags,
        sort,
      } = {}) => ({
        url: `${ENDPOINT}`,
        method: "GET",
        params: {
          skip,
          limit,
          ...(query && { query }),
          ...(framework && { framework }),
          ...(username && { username }),
          ...(startDate && { startDate }),
          ...(tags?.length && { tags: tags.join(",") }),
          ...(sort && { sort }),
        },
        service: "components",
      }),
      serializeQueryArgs: ({ queryArgs }) => {
        const { skip: _s, startDate: _d, ...rest } = queryArgs;
        return JSON.stringify(rest);
      },
      merge: (currentCache, newItems, { arg }) => {
        if (!arg.skip && !arg.startDate) {
          return newItems;
        }
        const currentData = currentCache.result?.data ?? [];
        const newData = newItems.result?.data ?? [];
        const existingIds = new Set(currentData.map((c) => c.id));
        const mergedData = [
          ...currentData,
          ...newData.filter((c) => !existingIds.has(c.id)),
        ];

        currentCache.result = {
          ...(newItems.result ?? {}),
          data: mergedData,
        } as typeof newItems.result;
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return (
          currentArg?.skip !== previousArg?.skip ||
          currentArg?.startDate !== previousArg?.startDate
        );
      },
      providesTags: (result) => {
        const components = result?.result?.data;
        if (!components) return [{ type: "Components", id: "LIST" }];
        return [
          ...components.map(({ id }) => ({ type: "Components" as const, id })),
          { type: "Components", id: "LIST" },
        ];
      },
    }),
    getComponentById: builder.query<
      ComponentResultDto,
      { username: string; name: string; version?: number }
    >({
      query: ({ username, name, version }) => ({
        url: `${ENDPOINT}/${username}/${name}`,
        method: "GET",
        params: version != null ? { version } : undefined,
        service: "components",
      }),
      providesTags: (_result, _error, { username, name, version }) => [
        { type: "Components", id: `${username}/${name}${version ? `/v${version}` : ""}` },
      ],
    }),
    createComponent: builder.mutation<ComponentCreateResultDto, FormData>({
      query: (formData) => ({
        url: `${ENDPOINT}/upload`,
        method: "POST",
        body: formData,
        service: "components",
        formData: true,
      }),
      invalidatesTags: [{ type: "Components", id: "LIST" }],
    }),
    newVersionComponent: builder.mutation<ComponentNewVersionResultDto, { username: string; name: string; formData: FormData, }>({
      query: ({ username, name, formData }) => ({
        url: `${ENDPOINT}/${username}/${name}/version`,
        method: "POST",
        body: formData,
        service: "components",
        formData: true,
      }),
      invalidatesTags: [{ type: "Components", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllComponentsQuery,
  useCreateComponentMutation,
  useGetComponentByIdQuery,
  useNewVersionComponentMutation,
} = componentsApi;
