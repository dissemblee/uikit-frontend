import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from "axios";
import { createApi, type BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { tokenStore } from "./tokenStore";

export interface MetaResponse {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

interface Services {
  components: {
    baseURL: string;
  };
  auth: {
    baseURL: string;
  };
  user: {
    baseURL: string;
  };
  repo: {
    baseURL: string;
  };
}

interface ApiArgs {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  data?: any;
  body?: unknown;
  params?: Record<string, any>;
  service?: keyof Services;
  formData?: boolean;
}

const SERVICES: Services = {
  components: {
    baseURL: "http://localhost:80/api/",
  },
  auth: {
    baseURL: "http://localhost:81/api/",
  },
  user: {
    baseURL: "http://localhost:8081/api/",
  },
  repo: {
    baseURL: "http://localhost:82/api/",
  }
};

const axiosInstances: Record<string, AxiosInstance> = {};

const getAxiosInstance = (service: keyof Services = "components") => {
  if (!axiosInstances[service]) {
    axiosInstances[service] = axios.create({
      baseURL: SERVICES[service].baseURL,
      withCredentials: true,
      headers: { Accept: "application/json" },
    });
  }
  return axiosInstances[service];
};

let refreshFn: (() => Promise<void>) | null = null;

export const setRefreshFn = (fn: () => Promise<void>) => {
  refreshFn = fn;
};

const setupInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const originalRequest = error.config as any;

      if (error.response?.status === 401 && !originalRequest._retry && refreshFn) {
        originalRequest._retry = true;
        try {
          await refreshFn();
          originalRequest.headers["Authorization"] = `Bearer ${tokenStore.get()}`;
          return instance(originalRequest);
        } catch {
          tokenStore.clear();
          window.dispatchEvent(new Event("auth:logout"));
        }
      }

      return Promise.reject(error);
    }
  );
};

(["components", "auth", "user", "repo"] as const).forEach((service) => {
  const instance = getAxiosInstance(service);
  setupInterceptors(instance);
});


export const customBaseQuery: BaseQueryFn<
  ApiArgs,
  unknown,
  { status?: number; data?: any }
> = async ({ url, method = "GET", body, params, service = "components", formData = false }) => {
  try {
    const token = tokenStore.get();
    const axiosInstance = getAxiosInstance(service);
    const headers: Record<string, string> = {};
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
