import { baseApi } from "@shared/api";
import type { BuildDto, BuildLogsResponse, BuildsListResponse } from "./build.dto";

export const buildsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserBuilds: builder.query<BuildsListResponse, { username: string }>({
      async queryFn({ username }, _api, _extraOptions, baseQuery) {
        const [repoBuilds, componentBuilds] = await Promise.all([
          baseQuery({ url: `repo/${username}/builds`, service: 'repo' }),
          baseQuery({ url: `components/${username}/builds`, service: 'components' }),
        ]);

        const result = [
          ...((repoBuilds.data as BuildsListResponse) ?? []).map(b => ({ ...b, service: 'repo' as const })),
          ...((componentBuilds.data as BuildsListResponse) ?? []).map(b => ({ ...b, service: 'components' as const })),
        ].sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());

        return { data: result };
      },
      providesTags: (result) => [
        ...(result ?? []).map(({ id }) => ({ type: 'Builds' as const, id })),
        { type: 'Builds' as const, id: 'LIST' },
      ],
    }),

    getRepoBuilds: builder.query<BuildsListResponse, { username: string; repoName: string }>({
      query: ({ username, repoName }) => ({
        url: `repo/${username}/${repoName}/builds`,
        method: 'GET',
        service: 'repo',
      }),
      providesTags: (result, _error, { username, repoName }) => [
        ...(result ?? []).map(({ id }) => ({ type: 'Builds' as const, id })),
        { type: 'Builds' as const, id: `${username}/${repoName}` },
      ],
    }),

    getComponentBuilds: builder.query<BuildsListResponse, { username: string; componentName: string }>({
      query: ({ username, componentName }) => ({
        url: `components/${username}/${componentName}/builds`,
        method: 'GET',
        service: 'components',
      }),
      providesTags: (result, _error, { username, componentName }) => [
        ...(result ?? []).map(({ id }) => ({ type: 'Builds' as const, id })),
        { type: 'Builds' as const, id: `${username}/${componentName}` },
      ],
    }),

    getBuildById: builder.query<BuildDto, { buildId: string; service: 'repo' | 'components' }>({
      query: ({ buildId, service }) => ({
        url: `${service}/builds/${buildId}`,
        method: 'GET',
        service,
      }),
      providesTags: (_result, _error, { buildId }) => [{ type: 'Builds', id: buildId }],
    }),

    getBuildLogs: builder.query<BuildLogsResponse, { buildId: string; service: 'repo' | 'components' }>({
      query: ({ buildId, service }) => ({
        url: `${service}/builds/${buildId}/logs`,
        method: 'GET',
        service,
      }),
      providesTags: (_result, _error, { buildId }) => [{ type: 'Builds', id: buildId }],
    }),
  }),
});

export const {
  useGetUserBuildsQuery,
  useGetRepoBuildsQuery,
  useGetComponentBuildsQuery,
  useGetBuildByIdQuery,
  useGetBuildLogsQuery,
} = buildsApi;
