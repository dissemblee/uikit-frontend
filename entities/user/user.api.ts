import { baseApi } from "@shared/api";
import type {
  UserUpdateDto,
  UserResultDto,
  UserCreateDto,
} from "./user.dto";

const ENDPOINT = "user";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
  useGetUserByIdQuery,
  useGetMeQuery,
  useUpdateUserMutation,
} = usersApi;
