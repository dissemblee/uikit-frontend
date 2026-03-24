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
      { page?: number; perPage?: number }
    >({
      query: ({ page = 1, perPage = 10 }) => ({
        url: ENDPOINT,
        method: "GET",
        params: { page, perPage },
      }),

      providesTags: (result) => {
        const components = result?.result?.data;

        if (!components) {
          return [{ type: "Components", id: "LIST" }];
        }

        return [
          ...components.map(({ id }) => ({
            type: "Components" as const,
            id,
          })),
          { type: "Components" as const, id: "LIST" },
        ];
      },
    }),

    getComponentById: builder.query<ComponentResultDto, string>({
      query: (id) => ({
        url: `${ENDPOINT}/${id}`,
        method: "GET",
      }),

      providesTags: (_result, _error, id) => [
        { type: "Components", id },
      ],
    }),
    createComponent: builder.mutation<ComponentCreateResultDto, ComponentCreateDto>({
      query: (componentData) => {
        const formData = new FormData();
        
        formData.append("name", componentData.name);
        formData.append("description", componentData.description);
        formData.append("meta", JSON.stringify(componentData.meta));
        
        formData.append("archive", componentData.archive);

        return {
          url: ENDPOINT,
          method: "POST",
          body: formData,
          formData: true,
        };
      },
      
      invalidatesTags: [{ type: "Components", id: "LIST" }],
      
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Failed to create component:", error);
        }
      },
    }),
  }),
});

export const {
  useGetAllComponentsQuery,
  useCreateComponentMutation,
  useGetComponentByIdQuery,
} = componentsApi;
