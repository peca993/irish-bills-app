import { describe, expect, it } from 'vitest';
import type { Bill } from '../../types/bill';
import { getBillTitle, getBillTypes, transformBillToFavorite } from '../billUtils';

const mockBill: Bill = {
  id: '2023-001',
  bill: {
    billNo: '001',
    billYear: '2023',
    billType: 'Public Bill',
    status: 'Published',
    sponsor: {
      by: {
        showAs: 'Test Sponsor',
      },
    },
    shortTitleEn: 'Test Bill Title',
    shortTitleGa: 'Teideal Tástála',
    uri: 'test-uri',
  },
};

describe('billUtils', () => {
  describe('getBillTitle', () => {
    it('returns English title when language is "en"', () => {
      const title = getBillTitle(mockBill, 'en');
      expect(title).toBe('Test Bill Title');
    });

    it('returns Irish title when language is "ga"', () => {
      const title = getBillTitle(mockBill, 'ga');
      expect(title).toBe('Teideal Tástála');
    });

    it('returns fallback message when title not found', () => {
      const billWithoutTitles: Bill = {
        ...mockBill,
        bill: {
          ...mockBill.bill,
          shortTitleEn: undefined,
          shortTitleGa: undefined,
          longTitleEn: undefined,
          longTitleGa: undefined,
        },
      };

      const title = getBillTitle(billWithoutTitles, 'en');
      expect(title).toBe('No title available');
    });
  });

  describe('transformBillToFavorite', () => {
    it('transforms Bill to FavoriteBill correctly', () => {
      const favorite = transformBillToFavorite(mockBill);

      expect(favorite).toEqual({
        id: 'TEST-001-test-uri',
        billNo: 'TEST-001',
        billType: 'Public Bill',
        status: 'Published',
        sponsor: 'Test Sponsor',
        englishTitle: 'Test Bill Title',
        irishTitle: 'Teideal Tástála',
      });
    });

    it('handles missing sponsor gracefully', () => {
      const billWithoutSponsor: Bill = {
        ...mockBill,
        bill: {
          ...mockBill.bill,
          sponsor: { by: { showAs: '' } },
        },
      };

      const favorite = transformBillToFavorite(billWithoutSponsor);
      expect(favorite.sponsor).toBe('Unknown');
    });
  });

  describe('getBillTypes', () => {
    it('returns correct bill types array', () => {
      const types = getBillTypes();

      expect(types).toHaveLength(3);
      expect(types[0]).toEqual({ value: '', label: 'All Types' });
      expect(types[1]).toEqual({ value: 'Public', label: 'Public Bill' });
      expect(types[2]).toEqual({ value: 'Private', label: 'Private Bill' });
    });
  });
});
