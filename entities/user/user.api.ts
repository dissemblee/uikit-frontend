import { baseApi } from "@shared/api";
import type {
  UserUpdateDto,
  UserChangePasswordDto,
  UserCursorResultDto,
  UserResultDto,
} from "./user.dto";

const ENDPOINT = "user";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<
      UserCursorResultDto,
      { page?: number; perPage?: number }
    >({
      query: ({ page = 1, perPage = 10 }) => ({
        url: ENDPOINT,
        method: "GET",
        params: { page, perPage },
        service: "user"
      }),

      providesTags: (result) => {
        const users = result?.result?.data;

        if (!users) {
          return [{ type: "Users", id: "LIST" }];
        }

        return [
          ...users.map(({ id }) => ({
            type: "Users" as const,
            id,
          })),
          { type: "Users" as const, id: "LIST" },
        ];
      },
    }),

    getUserById: builder.query<UserResultDto, string>({
      query: (id) => ({
        url: `${ENDPOINT}/${id}`,
        method: "GET",
        service: "user"
      }),

      providesTags: (_result, _error, id) => [
        { type: "Users", id },
      ],
    }),

    updateUser: builder.mutation<
      UserResultDto,
      { data: UserUpdateDto }
    >({
      query: ({ data }) => ({
        url: `${ENDPOINT}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: (_result, _error,) => [
        { type: "Users", },
        { type: "Users", id: "LIST" },
      ],
    }),

    changePassword: builder.mutation<
      { result: { success: boolean } },
      UserChangePasswordDto
    >({
      query: (body) => ({
        url: `${ENDPOINT}/change-password`,
        method: "POST",
        body,
        service: "user"
      }),

      invalidatesTags: [],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useChangePasswordMutation,
} = usersApi;
