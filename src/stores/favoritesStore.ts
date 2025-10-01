import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FavoriteBill } from '../types/bill';
import { mockFavoriteBill, mockUnfavoriteBill } from '../services/api';

interface FavoritesState {
  favorites: FavoriteBill[];
  pendingFavorites: Set<string>;
  addFavorite: (bill: FavoriteBill) => Promise<void>;
  removeFavorite: (billNo: string) => Promise<void>;
  isFavorite: (billNo: string) => boolean;
  isPending: (billNo: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      pendingFavorites: new Set(),

      addFavorite: async (bill: FavoriteBill) => {
        const { billNo } = bill;
        
        // Optimistic update
        set((state) => ({
          favorites: [...state.favorites, bill],
          pendingFavorites: new Set([...state.pendingFavorites, billNo]),
        }));

        try {
          await mockFavoriteBill(billNo);
        } catch (error) {
          // Rollback on error
          set((state) => ({
            favorites: state.favorites.filter((f) => f.billNo !== billNo),
          }));
          throw error;
        } finally {
          set((state) => {
            const newPending = new Set(state.pendingFavorites);
            newPending.delete(billNo);
            return { pendingFavorites: newPending };
          });
        }
      },

      removeFavorite: async (billNo: string) => {
        const previousFavorites = get().favorites;
        
        // Optimistic update
        set((state) => ({
          favorites: state.favorites.filter((f) => f.billNo !== billNo),
          pendingFavorites: new Set([...state.pendingFavorites, billNo]),
        }));

        try {
          await mockUnfavoriteBill(billNo);
        } catch (error) {
          // Rollback on error
          set({ favorites: previousFavorites });
          throw error;
        } finally {
          set((state) => {
            const newPending = new Set(state.pendingFavorites);
            newPending.delete(billNo);
            return { pendingFavorites: newPending };
          });
        }
      },

      isFavorite: (billNo: string) => {
        return get().favorites.some((f) => f.billNo === billNo);
      },

      isPending: (billNo: string) => {
        return get().pendingFavorites.has(billNo);
      },
    }),
    {
      name: 'favorites-storage',
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);
