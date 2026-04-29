import { baseApi } from "@shared/api";
import type {
  UserUpdateDto,
  UserChangePasswordDto,
  UserCursorResultDto,
  UserResultDto,
  UserCreateDto,
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

    getMe: builder.query<UserResultDto, void>({
      query: () => ({
        url: `${ENDPOINT}/me`,
        method: "GET",
        service: "user"
      }),

      providesTags: (_result, _error) => [
        { type: "Users", id: "me" },
      ],
    }),

    createUser: builder.mutation<
      UserResultDto,
      { data: UserCreateDto }
    >({
      query: ({ data }) => ({
        url: `${ENDPOINT}`,
        method: "POST",
        body: data,
        service: "user"
      }),

      invalidatesTags: (_result, _error,) => [
        { type: "Users", },
        { type: "Users", id: "LIST" },
      ],
    }),

    updateUser: builder.mutation<
      UserResultDto,
      { data: UserUpdateDto }
    >({
      query: ({ data }) => ({
        url: `${ENDPOINT}`,
        method: "PUT",
        body: data,
        service: "user"
      }),

      invalidatesTags: (_result, _error,) => [
        { type: "Users", },
        { type: "Users", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useGetMeQuery,
} = usersApi;
