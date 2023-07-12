export type SeatTypeOptions = 'Front' | 'Middle' | 'Back';

export type SeatType = {
  id: number;
  code: string;
  isSelected: boolean
  isReserved: boolean
}

export type SummaryRow = {
  type: SeatTypeOptions;
  amount: number;
  price: number;
};

export type TicketType = {
  id: number;
  movieId: number;
  date: string;
  time: string;
  price: number;
  seat: string[];
};