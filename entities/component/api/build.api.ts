import { baseApi } from "@shared/api";
import type { BuildCursorResultDto, BuildFiltersDto, BuildResultDto } from "../dto/builds.dto";

const ENDPOINT = "components/builds";

export const buildsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBuilds: builder.query<
      BuildCursorResultDto,
      Partial<BuildFiltersDto> & { sort?: "asc" | "desc" }
    >({
      query: ({
        skip = 0,
        limit = 10,
        username,
        startDate,
        sort,
        query,
        componentId,
        status
      } = {}) => ({
        url: `${ENDPOINT}`,
        method: "GET",
        params: {
          skip,
          limit,
          ...(componentId && { componentId }),
          ...(query && { query }),
          ...(status && { status }),
          ...(username && { username }),
          ...(startDate && { startDate }),
          ...(sort && { sort }),
        },
        service: "components",
      }),
      serializeQueryArgs: ({ queryArgs }) => {
        const { skip: _s, startDate: _d, ...rest } = queryArgs;
        return `component:${JSON.stringify(rest)}`;
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
        if (!components) return [{ type: "Builds", id: "LIST" }];
        return [
          ...components.map(({ id }) => ({ type: "Builds" as const, id })),
          { type: "Builds", id: "LIST" },
        ];
      },
    }),
    getBuildById: builder.query<BuildResultDto, { buildId: string; }>({
      query: ({ buildId }) => ({
        url: `${ENDPOINT}/${buildId}`,
        method: "GET",
        service: "components"
      }),
      providesTags: (_result, _error, { buildId }) => [
        { type: "Builds", id: `${buildId}` },
      ],
    }),
    getBuildSource: builder.query<string, { id: string }>({
      query: ({ id }) => ({
        url: `${ENDPOINT}/${id}/source`,
        method: "GET",
        service: "components",
        responseHandler: (response: any) => response.text(),
      }),
    }),
  }),
});

export const {
  useGetAllBuildsQuery,
  useGetBuildByIdQuery,
  useGetBuildSourceQuery,
} = buildsApi;
