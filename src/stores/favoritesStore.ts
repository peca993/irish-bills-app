import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';
import type { FavoriteBill } from '../types/bill';
import { mockFavoriteBill, mockUnfavoriteBill } from '../services/api';

interface FavoritesState {
  favorites: FavoriteBill[];
  addFavorite: (bill: FavoriteBill) => Promise<void>;
  removeFavorite: (billNo: string) => Promise<void>;
  isFavorite: (billNo: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: async (bill: FavoriteBill) => {
        const { billNo } = bill;
        
        // Optimistic update
        set((state) => ({
          favorites: [...state.favorites, bill],
        }));

        try {
          await mockFavoriteBill(billNo);
          // Silent success - user already sees the result
        } catch (error) {
          // Rollback on error with toast notification
          set((state) => ({
            favorites: state.favorites.filter((f) => f.billNo !== billNo),
          }));
          toast.error(`Failed to add ${billNo} to favorites. Please try again.`);
        }
      },

      removeFavorite: async (billNo: string) => {
        const previousFavorites = get().favorites;
        
        // Optimistic update
        set((state) => ({
          favorites: state.favorites.filter((f) => f.billNo !== billNo),
        }));

        try {
          await mockUnfavoriteBill(billNo);
          // Silent success - user already sees the result
        } catch (error) {
          // Rollback on error with toast notification
          set({ favorites: previousFavorites });
          toast.error(`Failed to remove ${billNo} from favorites. Please try again.`);
        }
      },

      isFavorite: (billNo: string) => {
        return get().favorites.some((f) => f.billNo === billNo);
      },
    }),
    {
      name: 'favorites-storage',
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);
