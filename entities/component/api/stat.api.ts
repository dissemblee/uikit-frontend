import { baseApi } from "@shared/api";
import type { ComponentStatResultDto, UserStatResultDto } from "../dto/stat.dto";

const ENDPOINT = "components/stat";

export const statApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getComponentStat: builder.query<ComponentStatResultDto, { componentId: string }>({
      query: ({ componentId }) => ({
        url: `${ENDPOINT}/components/${componentId}`,
        method: "GET",
        service: "components",
      }),
    }),
    getUserStat: builder.query<UserStatResultDto, { username: string }>({
      query: ({ username }) => ({
        url: `${ENDPOINT}/users/${username}`,
        method: "GET",
        service: "components",
      }),
    }),
  }),
});

export const {
  useGetComponentStatQuery,
  useGetUserStatQuery,
} = statApi;
