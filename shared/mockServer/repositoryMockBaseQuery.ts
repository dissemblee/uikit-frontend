import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import { crud } from "./router";

export const mockBaseQuery: BaseQueryFn<any, unknown, unknown> =
  async ({ url, method = "GET", body }) => {
    await new Promise((r) => setTimeout(r, 150));

    const [table, id] = url.split("/");

    const result = crud(table, method, id, body);

    if (!result) {
      return { error: { status: 404 } };
    }

    return {
      data: {
        success: true,
        result,
      },
    };
  };