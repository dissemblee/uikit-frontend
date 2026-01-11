import axios, { AxiosError, type AxiosResponse } from "axios";
import type { BaseQueryFn } from "@reduxjs/toolkit/query/react";

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
  params?: Record<string, any>;
}

interface ApiArgsAxios<TData = any> {
  endPoint: string
  id?: number
  method: "GET" | "POST" | "PUT" | "DELETE"
  data?: TData
  query?: Record<string, any>
}

/**
 * Axios instance с правильными заголовками и withCredentials
 */
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Accept": "application/json",
  },
});

/**
 * Makes a request to the backend API.
 *
 * @param {ApiArgs<TData>} args - The request arguments.
 * @returns {Promise<AxiosResponse<TResponse>>} - The response.
 *
 * @throws {Error} - If there is an error with the request.
 */
export async function $api<TResponse = any, TData = any>(
  args: ApiArgsAxios<TData>
): Promise<AxiosResponse<TResponse>> {

  try {
    const response = await axiosInstance.request<TResponse>({
      url: args.id ? `${args.endPoint}/${args.id}` : args.endPoint,
      method: args.method,
      data: args.data,
      params: args.query,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Barer"
      }
    })

    return response
  } catch (e) {
    console.error("Ошибка при запросе:", e)
    throw e
  }
}

/**
 * customBaseQuery для RTK Query
 */
export const customBaseQuery: BaseQueryFn<
  ApiArgs,
  unknown,
  { status?: number; data?: any }
> = async ({ url, method = "GET", body, params }: any) => {
  try {
    const response = await axiosInstance.request({
      url,
      method,
      data: body,
      params,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Barer"
      }
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
