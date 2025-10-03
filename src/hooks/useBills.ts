import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { fetchBills, type FetchBillsParams } from '../services/api';
import type { BillsResponse } from '../types/bill';

interface UseBillsParams extends FetchBillsParams {
  billType?: string;
}

export const useBills = ({ billType, ...apiParams }: UseBillsParams = {}) => {
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

  return {
    ...query,
    data: filteredData,
  };
};
