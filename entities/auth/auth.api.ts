import { baseApi, setRefreshFn } from "@shared/api";
import type { SignInDto, SignInResultDto, SignUpDto, SignUpResultDto } from "./auth.dto";
import { tokenStore } from "@shared/tokenStore";
import { store } from "~/provider/store";
import type { UserChangePasswordDto } from "@entities/user/user.dto";

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
          console.log('Token refreshed and saved');
        }
        
        return response;
      },
    }),

    changePassword: builder.mutation<
      { result: { success: boolean } },
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
  }),
  overrideExisting: false,
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshMutation,
  useChangePasswordMutation
} = authApi;

export const initAuthInterceptor = () => {
  setRefreshFn(async () => {
    await store.dispatch(authApi.endpoints.refresh.initiate()).unwrap();
  });
};
