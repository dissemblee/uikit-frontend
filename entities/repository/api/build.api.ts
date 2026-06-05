import { baseApi } from "@shared/api";
import type { BuildCursorResultDto, BuildFiltersDto, BuildResultDto } from "../dto/build.dto";

const ENDPOINT = "repo/builds";

export const buildsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRepoBuilds: builder.query<
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
        repoId,
        status
      } = {}) => ({
        url: `${ENDPOINT}`,
        method: "GET",
        params: {
          skip,
          limit,
          ...(repoId && { repoId }),
          ...(status && { status }),
          ...(username && { username }),
          ...(startDate && { startDate }),
          ...(query && { query }),
          ...(sort && { sort }),
        },
        service: "repo",
      }),
      serializeQueryArgs: ({ queryArgs }) => {
        const { skip: _s, startDate: _d, ...rest } = queryArgs;
        return `repo:${JSON.stringify(rest)}`;
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
        const repository = result?.result?.data;
        if (!repository) return [{ type: "Builds", id: "LIST" }];
        return [
          ...repository.map(({ id }) => ({ type: "Builds" as const, id })),
          { type: "Builds", id: "LIST" },
        ];
      },
    }),
    getRepoBuildById: builder.query<BuildResultDto, { buildId: string; }>({
      query: ({ buildId }) => ({
        url: `${ENDPOINT}/${buildId}`,
        method: "GET",
        service: "repo"
      }),
      providesTags: (_result, _error, { buildId }) => [
        { type: "Builds", id: `${buildId}` },
      ],
    }),
  }),
});

export const {
  useGetAllRepoBuildsQuery,
  useGetRepoBuildByIdQuery,
} = buildsApi;
