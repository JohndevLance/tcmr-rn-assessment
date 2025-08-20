import { create } from 'zustand';

interface FavouriteEventsState {
  favourites: string[];
  addFavourite: (id: string) => void;
  removeFavourite: (id: string) => void;
  isFavourite: (id: string) => boolean;
}

export const useFavouritesStore = create<FavouriteEventsState>((set, get) => ({
  favourites: [],
  addFavourite: (id) => set((state) => ({ favourites: [...state.favourites, id] })),
  removeFavourite: (id) => set((state) => ({ favourites: state.favourites.filter(fav => fav !== id) })),
  isFavourite: (id) => get().favourites.includes(id),
}));
