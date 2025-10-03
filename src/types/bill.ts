export interface Bill {
  id: string; // Composite key: billYear-billNo
  bill: {
    billNo: string;
    billYear: string;
    billType: string;
    status: string;
    sponsor?: {
      by: {
        showAs: string;
      };
    };
    shortTitleEn?: string;
    shortTitleGa?: string;
    longTitleEn?: string;
    longTitleGa?: string;
    uri: string;
  };
}

export interface BillsResponse {
  results: Bill[];
  head: {
    counts: {
      resultCount: number;
    };
  };
}

export interface BillType {
  value: string;
  label: string;
}

export interface FavoriteBill {
  id: string; // Client-side UUID v4
  billNo: string;
  billYear: string;
  billType: string;
  status: string;
  sponsor: string;
  englishTitle: string;
  irishTitle: string;
}
