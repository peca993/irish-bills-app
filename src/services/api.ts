import type { BillsResponse, Bill } from '../types/bill';

const BASE_URL = 'https://api.oireachtas.ie/v1';

export interface FetchBillsParams {
  limit?: number;
  skip?: number;
  // Note: billType filtering is done client-side since API doesn't support it
}

export const fetchBills = async ({
  limit = 20,
  skip = 0,
}: FetchBillsParams = {}): Promise<BillsResponse> => {
  const params = new URLSearchParams({
    limit: limit.toString(),
    skip: skip.toString(),
  });

  const response = await fetch(`${BASE_URL}/legislation?${params}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch bills: ${response.statusText}`);
  }

  const data = await response.json();

  // Generate consistent ID from billYear and billNo
  return {
    ...data,
    results: data.results.map((bill: Bill) => ({
      ...bill,
      id: `${bill.bill.billYear}-${bill.bill.billNo}`,
    })),
  };
};

export const mockFavoriteBill = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
};

export const mockUnfavoriteBill = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
};
