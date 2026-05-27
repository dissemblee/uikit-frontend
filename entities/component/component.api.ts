import { baseApi } from "@shared/api";
import type {
  ComponentCreateDto,
  ComponentCreateResultDto,
  ComponentCursorResultDto,
  ComponentResultDto,
} from "./component.dto";

const ENDPOINT = "components";

export const componentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllComponents: builder.query<
      ComponentCursorResultDto,
      {
        skip?: number;
        limit?: number;
        search?: string;
        framework?: string;
        sort?: "asc" | "desc";
        startDate?: string;
      }
    >({
      query: ({ skip = 0, limit = 10, search, framework, sort, startDate }) => ({
        url: `${ENDPOINT}/main`,
        method: "GET",
        params: {
          skip,
          limit,
          ...(search && { query: search }),
          ...(framework && { framework }),
          ...(sort && { sort }),
          ...(startDate && { startDate }),
        },
        service: "components"
      }),
      serializeQueryArgs: ({ queryArgs }) => {
        return JSON.stringify(queryArgs);
      },
      providesTags: (result) => {
        const components = result?.result?.data;
        if (!components) return [{ type: "Components", id: "LIST" }];
        return [
          ...components.map(({ id }) => ({ type: "Components" as const, id })),
          { type: "Components", id: "LIST" },
        ];
      },
    }),
    getComponentById: builder.query<ComponentResultDto, { username: string; name: string }>({
      query: ({ username, name }) => ({
        url: `${ENDPOINT}/main/${username}/${name}`,
        method: "GET",
        service: "components"
      }),
      providesTags: (_result, _error, { username, name }) => [
        { type: "Components", id: `${username}/${name}` },
      ],
    }),
    getComponentsByUser: builder.query<
      ComponentCursorResultDto,
      { username: string; skip?: number; limit?: number; startDate?: string }
    >({
      query: ({ username, skip = 0, limit = 10, startDate }) => ({
        url: `${ENDPOINT}/main/${username}`,
        method: "GET",
        params: { skip, limit, startDate },
        service: "components"
      }),
    }),
    createComponent: builder.mutation<ComponentCreateResultDto, FormData>({
      query: (formData) => ({
        url: `${ENDPOINT}/main/upload`,
        method: "POST",
        body: formData,
        service: "components",
        formData: true,
      }),
      invalidatesTags: [{ type: "Components", id: "LIST" }],
    }),
    getComponentPackage: builder.query<Blob, { username: string; name: string }>({
      query: ({ username, name }) => ({
        url: `${ENDPOINT}/main/package/${username}/${name}`,
        method: "GET",
        service: "components",
        responseHandler: (response: { blob: () => any; }) => response.blob(),
      }),
    }),
    getComponentSource: builder.query<string, { id: string }>({
      query: ({ id }) => ({
        url: `${ENDPOINT}/source/text/${id}`,
        method: "GET",
        service: "components",
        responseHandler: (response: any) => response.text(),
      }),
    }),
    getComponentStat: builder.query<any, { id: string }>({
      query: ({ id }) => ({
        url: `${ENDPOINT}/stat/components/${id}`,
        method: "GET",
        service: "components",
      }),
    }),
    getUserStat: builder.query<any, { username: string }>({
      query: ({ username }) => ({
        url: `${ENDPOINT}/stat/users/${username}`,
        method: "GET",
        service: "components",
      }),
    }),
  }),
});

export const {
  useGetAllComponentsQuery,
  useCreateComponentMutation,
  useGetComponentByIdQuery,
  useGetComponentsByUserQuery,
  useLazyGetComponentPackageQuery,
  useGetComponentSourceQuery,
  useGetComponentStatQuery,
  useGetUserStatQuery,
} = componentsApi;
