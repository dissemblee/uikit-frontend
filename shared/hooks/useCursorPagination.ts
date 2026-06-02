import { useCallback, useEffect, useState } from "react";

export interface CursorPage<T> {
  data: T[];
  itemsLeft: number;
  itemsSkipped: number;
  startDate: string;
}

interface UseCursorPaginationOptions {
  limit: number;
  resetOn: unknown[];
}

export const useCursorPagination = ({ limit, resetOn }: UseCursorPaginationOptions) => {
  const [cursor, setCursor] = useState<{ skip: number; startDate?: string }>({
    skip: 0,
  });

  useEffect(() => {
    setCursor({ skip: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, resetOn);

  const loadMore = useCallback(
    <T,>(page: CursorPage<T> | undefined) => {
      if (!page || page.itemsSkipped == null || !page.startDate) return;
      setCursor({ skip: page.itemsSkipped + limit, startDate: page.startDate });
    },
    [limit],
  );

  const reset = useCallback(() => setCursor({ skip: 0 }), []);

  return { cursor, loadMore, reset, isFirstPage: cursor.skip === 0 };
};
