export interface Bill {
  bill: {
    billNo: string;
    billType: string;
    status: string;
    sponsor: {
      by: {
        showAs: string;
      };
    };
    titles: {
      title: Array<{
        lang: string;
        value: string;
      }>;
    };
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
  billNo: string;
  billType: string;
  status: string;
  sponsor: string;
  englishTitle: string;
  irishTitle: string;
}
