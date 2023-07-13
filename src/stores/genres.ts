import { create } from 'zustand';

export type GenreIconType = {
  icon: string;
  id: number;
  isSelected: boolean;
};

type Store = {
  genres: Record<string, GenreIconType>;
  homePageGenres: string[];
  selectGenre: (genre: string, onHomePage?: boolean) => void;
  reset: () => void
};

const defaultHomePageGenres = ['Action', 'Adventure', 'Animation', 'Comedy']
const initalGenreStates = {
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
}

export const useGenreStore = create<Store>(set => ({
  genres: initalGenreStates,
  homePageGenres: defaultHomePageGenres, // initial home page genres
  selectGenre: (genre, onHomePage) =>
    set(state => {
      const isSelected = !state.genres[genre].isSelected;
      let homePageGenres = state.homePageGenres;
      if (isSelected && !onHomePage) {
        homePageGenres = [
          genre,
          ...homePageGenres.filter(g => g !== genre),
        ].slice(0, 4);
      }
      return {
        homePageGenres,
        genres: {
          ...state.genres,
          [genre]: {
            ...state.genres[genre],
            isSelected,
          },
        },
      };
    }),
  reset: () => {
    set({genres: initalGenreStates, homePageGenres: defaultHomePageGenres})
  }
}));
