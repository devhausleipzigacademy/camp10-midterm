import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TicketType } from '../types/booking';

type TicketStore = TicketType & {
  setId: (value: number) => void;
  setMovieId: (value: number) => void;
  setDate: (value: string) => void;
  setTime: (value: string) => void;
  setPrice: (value: number) => void;
  setSeat: (value: string[]) => void;
};

export const useTicketStore = create<TicketStore>()(
  persist(
    set => ({
      id: 0,
      movieId: 2434650,
      date: '',
      time: '',
      price: 0,
      seat: [],
      setId: value => set({ id: value }),
      setMovieId: value => set({ movieId: value }),
      setDate: value => set({ date: value }),
      setTime: value => set({ time: value }),
      setPrice: value => set({ price: value }),
      setSeat: value => set({ seat: value }),
    }),
    {
      name: 'ticket-store',
    }
  )
);
