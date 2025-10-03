import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { fetchBills, type FetchBillsParams } from '../services/api';
import type { BillsResponse } from '../types/bill';

interface UseBillsParams extends FetchBillsParams {
  billType?: string;
}

export const useBills = ({ billType, ...apiParams }: UseBillsParams = {}) => {
  const query = useQuery({
    queryKey: ['bills', apiParams],
    queryFn: () => fetchBills(apiParams),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  // Client-side filtering since API doesn't support bill_type filter
  const filteredData = useMemo((): BillsResponse | undefined => {
    if (!query.data) return undefined;

    if (!billType) return query.data;

    const filteredResults = query.data.results.filter(
      (bill) => bill.bill.billType === billType
    );

    return {
      ...query.data,
      results: filteredResults,
      head: {
        ...query.data.head,
        counts: {
          resultCount: filteredResults.length,
        },
      },
    };
  }, [query.data, billType]);

  return {
    ...query,
    data: filteredData,
  };
};
