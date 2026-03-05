import { baseApi } from "@shared/api";

import type {
  RepositoryDto,
  RepositoryCreateDto,
  RepositoryUpdateDto,
  RepositoryCursorResultDto,
  RepositoryCreateResultDto,
  RepositoryResultDto,
} from "./repository.dto";

const ENDPOINT = "repository";

export const repositoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRepositories: builder.query<
      RepositoryCursorResultDto,
      { page?: number; perPage?: number }
    >({
      query: ({ page = 1, perPage = 10 }) => ({
        url: ENDPOINT,
        method: "GET",
        params: { page, perPage },
      }),

      providesTags: (result) => {
        if (!result?.result?.data) {
          return [{ type: "Repositories", id: "LIST" }];
        }

        return [
          ...result.result.data.map(({ id }) => ({
            type: "Repositories" as const,
            id,
          })),
          { type: "Repositories" as const, id: "LIST" },
        ];
      },
    }),

    getRepositoryById: builder.query<
      RepositoryResultDto,
      string
    >({
      query: (id) => ({
        url: `${ENDPOINT}/${id}`,
        method: "GET",
      }),

      providesTags: (result, error, id) => [
        { type: "Repositories", id },
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
  useCreateRepositoryMutation,
  useUpdateRepositoryMutation,
  useDeleteRepositoryMutation,
} = repositoriesApi;
