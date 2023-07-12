import { create } from 'zustand';

type Genre = {
  icon: string;
  id: number;
  isSelected: boolean;
};

type Store = {
  genres: Record<string, Genre>;
  homePageGenres: string[];
  selectGenre: (genre: string, fromOverview?: boolean) => void;
};

export const useGenreStore = create<Store>(set => ({
  genres: {
    Action: { icon: '🧨', id: 28, isSelected: false },
    Adventure: { icon: '🥾', id: 12, isSelected: false },
    Animation: { icon: '🦁', id: 16, isSelected: false },
    Comedy: { icon: '🚔', id: 35, isSelected: false },
    Crime: { icon: '🕵️', id: 80, isSelected: false },
    Documentary: { icon: '🎥', id: 99, isSelected: false },
    Drama: { icon: '🎭', id: 18, isSelected: false },
    Family: { icon: '👪', id: 10751, isSelected: false },
    Fantasy: { icon: '🦄', id: 14, isSelected: false },
    History: { icon: '⌛', id: 36, isSelected: false },
    Horror: { icon: '🪚', id: 27, isSelected: false },
    Music: { icon: '🎧', id: 10402, isSelected: false },
    Mystery: { icon: '🪄', id: 9648, isSelected: false },
    Romance: { icon: '💌', id: 10749, isSelected: false },
    'Science Fiction': { icon: '🛸', id: 878, isSelected: false },
    Thriller: { icon: '😨', id: 53, isSelected: false },
  },
  homePageGenres: ['Action', 'Adventure', 'Animation', 'Comedy'], // initial home page genres
  selectGenre: (genre, fromOverview) =>
    set(state => {
      const isSelected = !state.genres[genre].isSelected;
      let homePageGenres = state.homePageGenres;
      if (fromOverview && isSelected) {
        homePageGenres = [
          genre,
          ...homePageGenres.filter(g => g !== genre),
        ].slice(0, 4);
      }
      return {
        genres: {
          ...state.genres,
          [genre]: {
            ...state.genres[genre],
            isSelected,
          },
        },
        homePageGenres,
      };
    }),
}));
