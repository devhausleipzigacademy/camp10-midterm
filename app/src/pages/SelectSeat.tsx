import Seat from '../components/Seat';
import { BookingSummary } from '../components/BookingSummary';
import { SummaryRow } from '../types/booking';
import { useState } from 'react';
import { SeatType } from '../types/booking';
import { useRouteLoaderData } from 'react-router-dom';
import { Movie } from '../types/api';
import { useTicketStore } from '../stores/ticket';
import { useEffect } from 'react';

// This will come from backend eventually
const mockAllSeats: SeatType[] = [
  {
    id: 1,
    code: 'A-3',
    isSelected: false,
    isReserved: false,
  },
  {
    id: 2,
    code: 'A-4',
    isSelected: false,
    isReserved: false,
  },
  {
    id: 3,
    code: 'C-3',
    isSelected: false,
    isReserved: false,
  },
  {
    id: 4,
    code: 'C-4',
    isSelected: false,
    isReserved: false,
  },
  {
    id: 5,
    code: 'H-8',
    isSelected: false,
    isReserved: false,
  },
  {
    id: 6,
    code: 'D-10',
    isSelected: false,
    isReserved: false,
  },
  {
    id: 7,
    code: 'D-11',
    isSelected: false,
    isReserved: false,
  },
];

// This is purely made up for now
const seatPrices = {
  Front: 12.99,
  Middle: 14.75,
  Back: 16.99,
};

// This logic is purely made up for now
function returnSeatType(seatCode: string) {
  const row = seatCode.split('-')[0];
  switch (row) {
    case 'A':
      return 'Front';
    // assume H is the last row
    case 'H':
      return 'Back';
    default:
      return 'Middle';
  }
}

// Transform selected seats into summaries
function createBookingSummary(selectedSeats: SeatType[]) {
  const summaries: SummaryRow[] = [];
  selectedSeats.forEach(seat => {
    const type = returnSeatType(seat.code);
    if (!summaries.some(row => row.type === type)) {
      summaries.push({ type: type, amount: 1, price: seatPrices[type] });
    } else {
      summaries.forEach(row => {
        if (row.type === type) {
          row.amount += 1;
        }
      });
    }
  });
  return summaries;
}

export function SelectSeat() {
  const [selectedSeats, setSelectedSeats] = useState([] as SeatType[]);
  const { seat, setSeat, setPrice } = useTicketStore();
  const { movie: currentMovie } = useRouteLoaderData('currentMovie') as {
    movie: Movie;
  };
  let updatedSelectedSeats: SeatType[] = [];
  useEffect(() => {
    setSeat([])
  }, []);
  return (
    <>
      <div className="flex gap-x-2 mx-auto">
        {mockAllSeats.map(item => (
          <Seat
            key={item.id}
            seatid={item.id}
            seatCode={item.code}
            isReserved={item.isReserved}
            isSelected={item.isSelected}
            onClick={() => {
              if (!item.isSelected) {
                item.isSelected = true;
                updatedSelectedSeats = [...selectedSeats, item];
                setSelectedSeats(updatedSelectedSeats);
              } else {
                item.isSelected = false;
                updatedSelectedSeats = selectedSeats.filter(
                  seat => seat.id !== item.id
                );
                setSelectedSeats(updatedSelectedSeats);
              }
              // update ticket store
              setSeat(updatedSelectedSeats.map(seat => seat.code));
              setPrice(
                Number(
                  createBookingSummary(updatedSelectedSeats)
                    .reduce((acc, seat) => acc + seat.amount * seat.price, 0)
                    .toFixed(2)
                )
              );
            }}
          />
        ))}
      </div>
      <BookingSummary
        summaries={createBookingSummary(selectedSeats)}
        buttonLink={`/movies/${currentMovie.id}/ticket`}
        buttonDisabled={seat.length === 0 ? true : false}
      />
    </>
  );
}
