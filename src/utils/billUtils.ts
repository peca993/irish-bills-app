import type { Bill, FavoriteBill } from '../types/bill';

export const getBillTitle = (bill: Bill, language: 'en' | 'ga'): string => {
  const titles = bill.bill.titles?.title || [];
  const title = titles.find((t) => t.lang === language);
  return title?.value || 'No title available';
};

export const transformBillToFavorite = (bill: Bill): FavoriteBill => {
  return {
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
  { value: 'Public Bill', label: 'Public Bill' },
  { value: 'Private Bill', label: 'Private Bill' },
  { value: 'Private Members Bill', label: 'Private Members Bill' },
];
