import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { fetchBills, type FetchBillsParams } from '../services/api';
import type { BillsResponse } from '../types/bill';

interface UseBillsParams extends FetchBillsParams {
  billType?: string;
  enablePrefetch?: boolean;
}

export const useBills = ({
  billType,
  enablePrefetch = false,
  ...apiParams
}: UseBillsParams = {}) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['bills', apiParams], // Don't include billType in cache key - it's client-side only
    queryFn: () => fetchBills(apiParams),
  });

  // Client-side filtering on current page only (API doesn't support bill_type filter)
  const filteredData = useMemo((): BillsResponse | undefined => {
    if (!query.data) return undefined;

    if (!billType) return query.data;

    const filteredResults = query.data.results.filter((bill) => bill.bill.billType === billType);

    return {
      ...query.data,
      results: filteredResults,
      // Keep original total count for server-side pagination
      head: query.data.head,
    };
  }, [query.data, billType]);

  // Prefetch next page for instant navigation
  useEffect(() => {
    if (!enablePrefetch || query.isLoading || !query.data) return;

    const totalCount = query.data.head?.counts?.resultCount || 0;
    const limit = apiParams.limit || 10;
    const skip = apiParams.skip || 0;
    const currentPage = Math.floor(skip / limit);
    const hasNextPage = (currentPage + 1) * limit < totalCount;

    if (hasNextPage) {
      const nextPageParams = {
        ...apiParams,
        limit,
        skip: (currentPage + 1) * limit,
      };

      queryClient.prefetchQuery({
        queryKey: ['bills', nextPageParams],
        queryFn: () => fetchBills(nextPageParams),
      });
    }
  }, [enablePrefetch, query.isLoading, query.data, apiParams, queryClient]);

  return {
    ...query,
    data: filteredData,
  };
};
