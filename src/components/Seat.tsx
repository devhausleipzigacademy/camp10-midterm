import { cn } from '../lib/utils';
import React from 'react';

//http://localhost:5173/movies/1/select-seat

type SeatProps = {
  seatCode: string;
  isSelected: boolean;
  isReserved: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Seat({
  seatCode,
  isSelected,
  isReserved = false,
  ...props
}: SeatProps) {
  // just to make the toggle work for now, but later
  // we should handle all the seat states on the select seat page
  // const [isSelected, setIsSelected] = useState(false)
  // console.log(seatCode);
  return (
    <button
      className={cn(
        'w-7 h-7 rounded',
        isReserved ? 'bg-white' : isSelected ? 'bg-yellow' : 'bg-dark-light'
      )}
      disabled={isReserved}
      {...props}
    />
  );
}

export default Seat;
