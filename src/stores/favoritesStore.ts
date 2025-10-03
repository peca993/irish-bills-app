import toast from 'react-hot-toast';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockFavoriteBill, mockUnfavoriteBill } from '../services/api';
import type { FavoriteBill } from '../types/bill';

interface FavoritesState {
  favorites: FavoriteBill[];
  addFavorite: (bill: FavoriteBill) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: async (bill: FavoriteBill) => {
        const { id, billNo } = bill;

        // Optimistic update
        set((state) => ({
          favorites: [...state.favorites, bill],
        }));

        try {
          await mockFavoriteBill();
        } catch {
          set((state) => ({
            favorites: state.favorites.filter((f) => f.id !== id),
          }));
          toast.error(`Failed to add ${billNo} to favorites. Please try again.`);
        }
      },

      removeFavorite: async (id: string) => {
        const previousFavorites = get().favorites;
        const bill = previousFavorites.find((f) => f.id === id);

        // Optimistic update
        set((state) => ({
          favorites: state.favorites.filter((f) => f.id !== id),
        }));

        try {
          await mockUnfavoriteBill();
        } catch {
          set({ favorites: previousFavorites });
          toast.error(`Failed to remove ${bill?.billNo || id} from favorites. Please try again.`);
        }
      },

      isFavorite: (id: string) => {
        return get().favorites.some((f) => f.id === id);
      },
    }),
    {
      name: 'favorites-storage',
      partialize: (state) => ({ favorites: state.favorites }),
      version: 2,
    }
  )
);
