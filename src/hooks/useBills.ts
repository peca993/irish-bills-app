import { useQuery } from '@tanstack/react-query';
import { fetchBills, type FetchBillsParams } from '../services/api';

export const useBills = (params: FetchBillsParams = {}) => {
  return useQuery({
    queryKey: ['bills', params],
    queryFn: () => fetchBills(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
