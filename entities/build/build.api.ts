import { baseApi } from "@shared/api";

import type { BuildDto, BuildLogsResponse, BuildsListResponse } from "./build.dto";

const ENDPOINT = "repo";

export const buildsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserBuilds: builder.query<
      BuildsListResponse,
      { username: string;}
    >({
      query: ({ username}) => ({
        url: `${ENDPOINT}/${username}/builds`,
        method: "GET",
        service: "repo"
      }),

      providesTags: (result) => {
        const builds = result;

        if (!builds) {
          return [{ type: "Builds", id: "LIST" }];
        }

        return [
          ...builds.map(({ id }) => ({
            type: "Builds" as const,
            id,
          })),
          { type: "Builds" as const, id: "LIST" },
        ];
      },
    }),

    getRepoBuilds: builder.query<
      BuildsListResponse,
      { username: string; repoName: string; }
    >({
      query: ({ username, repoName}) => ({
        url: `${ENDPOINT}/${username}/${repoName}/builds`,
        method: "GET",
        service: "repo"
      }),

      providesTags: (result, _error, { username, repoName }) => {
        const builds = result;
        const tagId = `${username}/${repoName}`;

        if (!builds) {
          return [{ type: "Builds", id: tagId }];
        }

        return [
          ...builds.map(({ id }) => ({
            type: "Builds" as const,
            id,
          })),
          { type: "Builds" as const, id: tagId },
        ];
      },
    }),

    getBuildById: builder.query<BuildDto, string>({
      query: (buildId) => ({
        url: `${ENDPOINT}/builds/${buildId}`,
        method: "GET",
        service: "repo"
      }),

      providesTags: (_result, _error, buildId) => [
        { type: "Builds", id: buildId },
      ],
    }),

    getBuildLogs: builder.query<
      BuildLogsResponse,
      { buildId: string }
    >({
      query: ({ buildId }) => ({
        url: `${ENDPOINT}/builds/${buildId}/logs`,
        method: "GET",
        service: "repo"
      }),

      providesTags: (_result, _error, { buildId }) => [
        { type: "Builds", id: buildId },
      ],
    }),
  }),
});


export const {
  useGetUserBuildsQuery,
  useGetRepoBuildsQuery,
  useGetBuildByIdQuery,
  useGetBuildLogsQuery,
} = buildsApi;