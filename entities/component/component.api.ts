import { baseApi } from "@shared/api";
import type {
  ComponentCreateDto,
  ComponentCreateResultDto,
  ComponentCursorResultDto,
  ComponentResultDto,
  ComponentFiltersDto
} from "./component.dto";

const ENDPOINT = "components";

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
        url: `${ENDPOINT}/main`,
        method: "GET",
        params: {
          skip,
          limit,
          ...(query && { query }),
          ...(framework && { framework }),
          ...(username && { username }),
          ...(startDate && { startDate }),
          ...(tags?.length && { tags }),
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
    getComponentById: builder.query<ComponentResultDto, { username: string; name: string }>({
      query: ({ username, name }) => ({
        url: `${ENDPOINT}/main/${username}/${name}`,
        method: "GET",
        service: "components"
      }),
      providesTags: (_result, _error, { username, name }) => [
        { type: "Components", id: `${username}/${name}` },
      ],
    }),
    createComponent: builder.mutation<ComponentCreateResultDto, FormData>({
      query: (formData) => ({
        url: `${ENDPOINT}/main/upload`,
        method: "POST",
        body: formData,
        service: "components",
        formData: true,
      }),
      invalidatesTags: [{ type: "Components", id: "LIST" }],
    }),
    getComponentSource: builder.query<string, { id: string }>({
      query: ({ id }) => ({
        url: `${ENDPOINT}/builds/${id}/source`,
        method: "GET",
        service: "components",
        responseHandler: (response: any) => response.text(),
      }),
    }),
    getComponentStat: builder.query<any, { id: string }>({
      query: ({ id }) => ({
        url: `${ENDPOINT}/stat/components/${id}`,
        method: "GET",
        service: "components",
      }),
    }),
    getUserStat: builder.query<any, { username: string }>({
      query: ({ username }) => ({
        url: `${ENDPOINT}/stat/users/${username}`,
        method: "GET",
        service: "components",
      }),
    }),
  }),
});

export const {
  useGetAllComponentsQuery,
  useCreateComponentMutation,
  useGetComponentByIdQuery,
  useGetComponentSourceQuery,
  useGetComponentStatQuery,
  useGetUserStatQuery,
} = componentsApi;
