import type { Bill, FavoriteBill } from '../types/bill';

export const getBillTitle = (bill: Bill, language: 'en' | 'ga'): string => {
  if (language === 'en') {
    return bill.bill.shortTitleEn || bill.bill.longTitleEn || 'No title available';
  }
  return bill.bill.shortTitleGa || bill.bill.longTitleGa || 'No title available';
};

export const transformBillToFavorite = (bill: Bill): FavoriteBill => {
  return {
    id: bill.id,
    billNo: bill.bill.billNo,
    billType: bill.bill.billType,
    status: bill.bill.status,
    sponsor: bill.bill.sponsor?.by?.showAs || 'Unknown',
    englishTitle: getBillTitle(bill, 'en'),
    irishTitle: getBillTitle(bill, 'ga'),
  };
};

export const getBillTypes = (): Array<{ value: string; label: string }> => [
  { value: '', label: 'All Types' },
  { value: 'Public', label: 'Public Bill' },
  { value: 'Private', label: 'Private Bill' },
];
