import { baseApi } from "@shared/api";
import type {
  ComponentCreateDto,
  ComponentCreateResultDto,
  ComponentCursorResultDto,
  ComponentResultDto,
} from "./component.dto";

const ENDPOINT = "component";

export const componentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllComponents: builder.query<
      ComponentCursorResultDto,
      { skip?: number; limit?: number }
    >({
      query: ({ skip = 0, limit = 10 }) => ({
        url: ENDPOINT,
        method: "GET",
        params: { skip, limit },
        service: "components"
      }),
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
        url: `${ENDPOINT}/${username}/${name}`,
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
        url: `${ENDPOINT}/${username}`,
        method: "GET",
        params: { skip, limit, startDate },
        service: "components"
      }),
    }),
    createComponent: builder.mutation<ComponentCreateResultDto, FormData>({
      query: (formData) => ({
        url: `${ENDPOINT}/upload`,
        method: "POST",
        body: formData,
        service: "components",
        formData: true,
      }),
      invalidatesTags: [{ type: "Components", id: "LIST" }],
    }),
    getComponentPackage: builder.query<Blob, { username: string; name: string }>({
      query: ({ username, name }) => ({
        url: `${ENDPOINT}/package/${username}/${name}`,
        method: "GET",
        service: "components",
        responseHandler: (response: { blob: () => any; }) => response.blob(),
      }),
    }),
    getComponentPreview: builder.query<
      { url: string },
      { username: string; name: string }
    >({
      query: ({ username, name }) => ({
        url: `${ENDPOINT}/preview/${username}/${name}`,
        method: "GET",
        service: "components",
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
  }),
});

export const {
  useGetAllComponentsQuery,
  useCreateComponentMutation,
  useGetComponentByIdQuery,
  useGetComponentsByUserQuery,
  useLazyGetComponentPackageQuery,
  useGetComponentPreviewQuery,
  useGetComponentSourceQuery,
} = componentsApi;
