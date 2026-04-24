import { baseApi } from "@shared/api";
import type { SignInDto, SignInResultDto, SignUpDto, SignUpResultDto } from "./auth.dto";
import { tokenStore } from "@shared/tokenStore";

const ENDPOINT = "auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
        console.log('Raw login response:', response);
        
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
          console.log('🔄 Token refreshed and saved');
        }
        
        return response;
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshMutation,
} = authApi;
