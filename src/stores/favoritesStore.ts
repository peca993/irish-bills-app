import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import type { FavoriteBill } from '../types/bill';
import { mockFavoriteBill, mockUnfavoriteBill } from '../services/api';

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
          await mockFavoriteBill(billNo);
          // Silent success - user already sees the result
        } catch (error) {
          // Rollback on error with toast notification
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
          await mockUnfavoriteBill(bill?.billNo || id);
          // Silent success - user already sees the result
        } catch (error) {
          // Rollback on error with toast notification
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
      version: 1,
      migrate: (persistedState: any) => {
        // Migrate old favorites without ID to include UUID
        if (persistedState?.favorites) {
          persistedState.favorites = persistedState.favorites.map((fav: any) => ({
            ...fav,
            id: fav.id || uuidv4(), // Add UUID if missing
          }));
        }
        return persistedState;
      },
    }
  )
);
