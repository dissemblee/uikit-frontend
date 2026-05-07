import { baseApi } from "@shared/api";

import type {
  RepositoryCreateDto,
  RepositoryUpdateDto,
  RepositoryCursorResultDto,
  RepositoryCreateResultDto,
  RepositoryResultDto,
} from "./repository.dto";

const ENDPOINT = "repo";

export const repositoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRepositories: builder.query<
      RepositoryResultDto[],
      void
    >({
      query: () => ({
        url: ENDPOINT,
        method: "GET",
        service: "repo",
      }),

      providesTags: (result) => {
        if (!result || result.length === 0) {
          return [{ type: "Repositories", id: "LIST" }];
        }
        return [
          ...result.map(({ id }) => ({ type: "Repositories" as const, id })),
          { type: "Repositories", id: "LIST" },
        ];
      },
    }),

    getRepositoryById: builder.query<
      RepositoryResultDto,
      { username: string; name: string }
    >({
      query: ({ username, name }) => ({
        url: `${ENDPOINT}/${username}/${name}`,
        method: "GET",
        service: "repo",
      }),
      providesTags: (_result, _error, { username, name }) => [
        { type: "Repositories", id: `${username}/${name}` },
      ],
    }),
    getRepositoryByUser: builder.query<
      RepositoryCursorResultDto,
      { username: string; skip?: number; limit?: number; startDate?: string }
    >({
      query: ({ username, skip = 0, limit = 10, startDate }) => ({
        url: `${ENDPOINT}/${username}`,
        method: "GET",
        params: { skip, limit, startDate },
        service: "repo",
      }),
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

    updateRepository: builder.mutation<
      RepositoryResultDto,
      { id: string; data: RepositoryUpdateDto }
    >({
      query: ({ id, data }) => ({
        url: `${ENDPOINT}/${id}`,
        method: "PATCH",
        body: data,
        service: "repo",
      }),

      invalidatesTags: (result, error, { id }) => [
        { type: "Repositories", id },
        { type: "Repositories", id: "LIST" },
      ],
    }),

    deleteRepository: builder.mutation<
      { result: { success: boolean } },
      string
    >({
      query: (id) => ({
        url: `${ENDPOINT}/${id}`,
        method: "DELETE",
        service: "repo",
      }),

      invalidatesTags: (result, error, id) => [
        { type: "Repositories", id },
        { type: "Repositories", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllRepositoriesQuery,
  useGetRepositoryByIdQuery,
  useGetRepositoryByUserQuery,
  useCreateRepositoryMutation,
  useUpdateRepositoryMutation,
  useDeleteRepositoryMutation,
} = repositoriesApi;
