import { baseApi } from "@shared/api";
import type { RepositoryStatResultDto, UserStatResultDto } from "../dto/stat.dto";

const ENDPOINT = "repo/stat";

export const statApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRepositoryStat: builder.query<RepositoryStatResultDto, { repoId: string }>({
      query: ({ repoId }) => ({
        url: `${ENDPOINT}/repo/${repoId}`,
        method: "GET",
        service: "repo",
      }),
    }),
    getUserRepoStat: builder.query<UserStatResultDto, { username: string }>({
      query: ({ username }) => ({
        url: `${ENDPOINT}/users/${username}`,
        method: "GET",
        service: "repo",
      }),
    }),
  }),
});

export const {
  useGetRepositoryStatQuery,
  useGetUserRepoStatQuery,
} = statApi;
