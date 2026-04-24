import axios, { AxiosError, type AxiosResponse } from "axios";
import { createApi, type BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { tokenStore } from "./tokenStore";
import { mockBaseQuery } from "./mockServer/repositoryMockBaseQuery";

export interface MetaResponse {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

interface ApiArgs {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  data?: any;
  body?: unknown;
  params?: Record<string, any>;
  service?: "components" | "auth" | "user";
  formData?: boolean;
}

interface ApiArgsAxios<TData = any> {
  endPoint: string
  id?: number
  method: "GET" | "POST" | "PUT" | "DELETE"
  data?: TData
  query?: Record<string, any>
  service?: "components" | "auth" | "user"
  formData?: boolean;
}

const SERVICES = {
  components: {
    baseURL: "http://localhost:80/api/",
    port: 80
  },
  auth: {
    baseURL: "http://localhost:81/api/",
    port: 81
  },
  user: {
    baseURL: "http://localhost:8081/api/",
    port: 8081
  }
};

const getAxiosInstance = (service: "components" | "auth" | "user" = "components") => {
  return axios.create({
    baseURL: SERVICES[service].baseURL,
    withCredentials: true,
    headers: {
      Accept: "application/json",
    },
  });
};

export async function $api<TResponse = any, TData = any>(
  args: ApiArgsAxios<TData>
): Promise<AxiosResponse<TResponse>> {
  const axiosInstance = getAxiosInstance(args.service || "components");
  
  try {
    const response = await axiosInstance.request<TResponse>({
      url: args.id ? `${args.endPoint}/${args.id}` : args.endPoint,
      method: args.method,
      data: args.data,
      params: args.query,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer"
      }
    })

    return response
  } catch (e) {
    console.error("Ошибка при запросе:", e)
    throw e
  }
}

export const customBaseQuery: BaseQueryFn<
  ApiArgs,
  unknown,
  { status?: number; data?: any }
> = async ({ url, method = "GET", body, params, service = "components", formData = false }) => {
  try {
    const token = tokenStore.get();
    const axiosInstance = getAxiosInstance(service);
    const headers: Record<string, string> = {};
    console.log('Token being sent:', token);
    console.log('Request URL:', url);
    console.log('Method:', method);
    if (!formData) {
      headers["Content-Type"] = "application/json";
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await axiosInstance.request({
      url,
      method,
      data: body,
      params,
      headers,
    });

    return { data: response.data };
  } catch (err) {
    const error = err as AxiosError;
    return {
      error: {
        status: error.response?.status,
        data: error.response?.data,
      },
    };
  }
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: customBaseQuery,
  tagTypes: ["Users", "Repositories", "Components", "Builds"],
  endpoints: () => ({}),
});
