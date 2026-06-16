import { baseApi, setRefreshFn } from "@shared/api";
import type { SignInDto, SignInResultDto, SignUpDto, SignUpResultDto, UserBanInfoResultDto, UserBanReason, UserPublicCursorResultDto } from "./auth.dto";
import { tokenStore } from "@shared/tokenStore";
import { store } from "~/provider/store";
import type { UserChangePasswordDto } from "@entities/user/user.dto";
import type { ResultDto } from "@shared/types/api";

const ENDPOINT = "auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<
      UserPublicCursorResultDto,
      {
        skip?: number;
        limit?: number;
        search?: string;
        sort?: "asc" | "desc";
        startDate?: string;
      }
    >({
      query: ({ skip = 0, limit = 10, search, sort, startDate }) => ({
        url: ENDPOINT + "/users",
        method: "GET",
        params: {
          skip,
          limit,
          ...(search && { query: search }),
          ...(sort && { sort }),
          ...(startDate && { startDate }),
        },
        service: "auth"
      }),
      serializeQueryArgs: ({ queryArgs }) => {
        return JSON.stringify(queryArgs);
      },
      providesTags: (result) => {
        const users = result?.result?.data;
        if (!users) return [{ type: "Users", id: "LIST" }];
        return [
          ...users.map(({ id }) => ({ type: "Users" as const, id })),
          { type: "Users", id: "LIST" },
        ];
      },
    }),

    register: builder.mutation<SignUpResultDto, SignUpDto>({
      query: (data) => ({
        url: `${ENDPOINT}/sign-up`,
        method: "POST",
        body: data,
        service: "auth"
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),

    login: builder.mutation<SignInResultDto, SignInDto>({
      query: (data) => ({
        url: `${ENDPOINT}/sign-in`,
        method: "POST",
        body: data,
        service: "auth"
      }),
      transformResponse: (response: SignInResultDto) => {
        const accessToken = response?.result?.token;
        
        if (accessToken) {
          tokenStore.set(accessToken);
        } else {
          console.error('Ошибка токена', response);
        }
        
        return response;
      },
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: `${ENDPOINT}/sign-out`,
        method: "POST",
        service: "auth"
      }),
    }),

    refresh: builder.mutation<SignInResultDto, void>({
      query: () => ({
        url: `${ENDPOINT}/refresh`,
        method: "POST",
        service: "auth"
      }),
      transformResponse: (response: SignInResultDto) => {
        const accessToken = response?.result?.token;
        
        if (accessToken) {
          tokenStore.set(accessToken);
        }
        
        return response;
      },
    }),

    changePassword: builder.mutation<
      { success: boolean },
      UserChangePasswordDto
    >({
      query: (body) => ({
        url: `${ENDPOINT}/change-password`,
        method: "POST",
        body,
        service: "auth"
      }),

      invalidatesTags: [],
    }),

    banUser: builder.mutation<
      ResultDto<unknown>,
      { userId: string; banReason: UserBanReason }
    >({
      query: ({ userId, banReason }) => ({
        url: `${ENDPOINT}/ban/${userId}`,
        method: "POST",
        body: { banReason },
        service: "auth"
      }),

      invalidatesTags: (_result, _error, { userId }) => [
        { type: "Users", id: userId },
        { type: "Users", id: "LIST" },
      ],
    }),

    unbanUser: builder.mutation<
      ResultDto<unknown>,
      { userId: string }
    >({
      query: ({ userId }) => ({
        url: `${ENDPOINT}/unban/${userId}`,
        method: "POST",
        service: "auth"
      }),

      invalidatesTags: (_result, _error, { userId }) => [
        { type: "Users", id: userId },
        { type: "Users", id: "LIST" },
      ],
    }),

    assignAdmin: builder.mutation<
      ResultDto<unknown>,
      { userId: string }
    >({
      query: ({ userId }) => ({
        url: `${ENDPOINT}/assign-admin/${userId}`,
        method: "POST",
        service: "auth"
      }),

      invalidatesTags: (_result, _error, { userId }) => [
        { type: "Users", id: userId },
        { type: "Users", id: "LIST" },
      ],
    }),

    getBanInfo: builder.query<UserBanInfoResultDto, string>({
      query: (userId) => ({
        url: `${ENDPOINT}/ban-info/${userId}`,
        method: "GET",
        service: "auth"
      }),

      providesTags: (_result, _error) => [
        { type: "Users", id: _result?.result?.userId },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllUsersQuery,
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshMutation,
  useChangePasswordMutation,
  useBanUserMutation,
  useUnbanUserMutation,
  useAssignAdminMutation,
  useGetBanInfoQuery,
} = authApi;

export const initAuthInterceptor = () => {
  setRefreshFn(async () => {
    await store.dispatch(authApi.endpoints.refresh.initiate()).unwrap();
  });
};
