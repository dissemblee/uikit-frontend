import { baseApi } from "@shared/api";

import type {
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
  }),
});

export const {
  useGetAllComponentsQuery,
  useGetComponentByIdQuery,
} = componentsApi;
