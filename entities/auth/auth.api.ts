import { baseApi } from "@shared/api";
import type { SignInDto, SignUpDto, SignUpResultDto } from "./auth.dto";

const ENDPOINT = "auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<SignUpResultDto, SignUpDto>({
      query: (data) => ({
        url: `${ENDPOINT}/sign-up`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),

    login: builder.mutation<void, SignInDto>({
      query: (data) => ({
        url: `${ENDPOINT}/sign-in`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Users", id: "ME" }],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
      invalidatesTags: [{ type: "Users", id: "ME" }],
    }),

    refresh: builder.mutation<void, void>({
      query: () => ({
        url: `${ENDPOINT}/refresh`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Users", id: "ME" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
} = authApi;
