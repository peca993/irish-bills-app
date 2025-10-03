import type { BillsResponse } from '../types/bill';

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

  return response.json();
};

export const mockFavoriteBill = async (billNo: string): Promise<void> => {
  // Mock API call with delay to simulate network request
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log(`API: Favorited bill ${billNo}`);
};

export const mockUnfavoriteBill = async (billNo: string): Promise<void> => {
  // Mock API call with delay to simulate network request
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log(`API: Unfavorited bill ${billNo}`);
};
