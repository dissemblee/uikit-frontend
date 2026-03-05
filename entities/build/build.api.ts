import { baseApi } from "@shared/api";

import type {
  BuildResultDto,
  BuildCursorResultDto,
  BuildLogsCursorResultDto,
} from "./build.dto";

const ENDPOINT = "build";

export const buildsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBuilds: builder.query<
      BuildCursorResultDto,
      { page?: number; perPage?: number }
    >({
      query: ({ page = 1, perPage = 10 }) => ({
        url: ENDPOINT,
        method: "GET",
        params: { page, perPage },
      }),

      providesTags: (result) => {
        const builds = result?.result?.data;

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

    getBuildById: builder.query<BuildResultDto, string>({
      query: (id) => ({
        url: `${ENDPOINT}/${id}`,
        method: "GET",
      }),

      providesTags: (_result, _error, id) => [
        { type: "Builds", id },
      ],
    }),

    startBuild: builder.mutation<
      BuildResultDto,
      { componentId: string }
    >({
      query: (body) => ({
        url: ENDPOINT,
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Builds", id: "LIST" }],
    }),

    getBuildLogs: builder.query<
      BuildLogsCursorResultDto,
      { buildId: string; cursor?: string }
    >({
      query: ({ buildId, cursor }) => ({
        url: `${ENDPOINT}/${buildId}/logs`,
        method: "GET",
        params: { cursor },
      }),

      providesTags: (_result, _error, { buildId }) => [
        { type: "Builds", id: buildId },
      ],
    }),
  }),
});

export const {
  useGetAllBuildsQuery,
  useGetBuildByIdQuery,
  useStartBuildMutation,
  useGetBuildLogsQuery,
} = buildsApi;
