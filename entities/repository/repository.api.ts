import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "@shared/api";
import type { RepositoryDto, RepositoryCreateDto, RepositoryUpdateDto, RepositoryCursorResultDto, RepositoryCreateResultDto, RepositoryResultDto } from "./repository.dto";

const ENDPOINT = "repository";

export const repositoriesApi = createApi({
  reducerPath: "repositoriesApi",
  baseQuery: customBaseQuery,
  tagTypes: ["Repositories"],
  endpoints: (builder) => ({
    getAllRepositories: builder.query<RepositoryCursorResultDto, { page?: number; perPage?: number }>({
      query: ({ page = 1, perPage = 10 }) => ({
        url: ENDPOINT,
        method: "GET",
        params: { page, perPage },
      }),
      providesTags: (result) =>
        result?.result?.data
          ? [
              ...result.result.data.map(({ id }) => ({ type: "Repositories" as const, id })),
              { type: "Repositories" as const, id: "LIST" },
            ]
          : [{ type: "Repositories" as const, id: "LIST" }],
    }),

    getRepositoryById: builder.query<RepositoryResultDto, string>({
      query: (id) => ({
        url: `${ENDPOINT}/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Repositories", id }],
    }),

    createRepository: builder.mutation<RepositoryCreateResultDto, RepositoryCreateDto>({
      query: (body) => ({
        url: ENDPOINT,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Repositories", id: "LIST" }],
    }),

    updateRepository: builder.mutation<RepositoryDto, { id: string; data: RepositoryUpdateDto }>({
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

    deleteRepository: builder.mutation<{ success: boolean }, string>({
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
