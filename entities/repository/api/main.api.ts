import { baseApi } from "@shared/api";

import type {
  RepositoryCreateDto,
  RepositoryUpdateDto,
  RepositoryCursorResultDto,
  RepositoryCreateResultDto,
  RepositoryResultDto,
  RepoFiltersDto,
  RepositoryNewVersionResultDto,
  RepositoryNewVersionDto,
} from "../dto/main.dto";

const ENDPOINT = "repo/main";

export const repositoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRepositories: builder.query<
      RepositoryCursorResultDto,
      Partial<RepoFiltersDto> & { sort?: "asc" | "desc" }
    >({
      query: ({
        skip = 0,
        limit = 10,
        query,
        username,
        startDate,
        sort,
      } = {}) => ({
        url: `${ENDPOINT}`,
        method: "GET",
        params: {
          skip,
          limit,
          ...(query && { query }),
          ...(username && { username }),
          ...(startDate && { startDate }),
          ...(sort && { sort }),
        },
        service: "repo",
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
        const repository = result?.result?.data;
        if (!repository) return [{ type: "Repositories", id: "LIST" }];
        return [
          ...repository.map(({ id }) => ({ type: "Repositories" as const, id })),
          { type: "Repositories", id: "LIST" },
        ];
      },
    }),
    getRepositoryById: builder.query<
      RepositoryResultDto,
      { username: string; name: string, version?: number }
    >({
      query: ({ username, name, version }) => ({
        url: `${ENDPOINT}/${username}/${name}`,
        params: version != null ? { version } : undefined,
        method: "GET",
        service: "repo",
      }),
      providesTags: (_result, _error, { username, name, version }) => [
        { type: "Repositories", id: `${username}/${name}${version ? `/v${version}` : ""}` },
      ],
    }),
    createRepository: builder.mutation<
      RepositoryCreateResultDto,
      RepositoryCreateDto
    >({
      query: (body) => ({
        url: ENDPOINT,
        method: "POST",
        body,
        service: "repo",
      }),

      invalidatesTags: (result) =>
        result
          ? [
              { type: "Repositories", id: "LIST" },
              { type: "Repositories", id: result?.result?.id },
            ]
          : [{ type: "Repositories", id: "LIST" }],
    }),
    newVersionRepository: builder.mutation<RepositoryNewVersionResultDto, { repoId: string; dto: RepositoryNewVersionDto, }>({
      query: ({ repoId, dto }) => ({
        url: `${ENDPOINT}/${repoId}/version`,
        method: "POST",
        body: dto,
        service: "repo",
      }),
      invalidatesTags: [{ type: "Repositories", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllRepositoriesQuery,
  useGetRepositoryByIdQuery,
  useCreateRepositoryMutation,
  useNewVersionRepositoryMutation,
} = repositoriesApi;
