import { useEffect, useState } from 'react';
import BookingDetails from '../components/BookingDetails';
import { useTicketStore } from '../stores/ticket';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { useRouteLoaderData } from 'react-router-dom';
import { Movie } from '../types/api';
import { generateTicketId } from '../lib/utils';

type DateType = {
  isActive: boolean;
  isDisabled: boolean;
  date: string;
};

type TimeType = {
  isActive: boolean;
  isDisabled: boolean;
  time: string;
};

const fixedTimes = [
  '10:30',
  '12:55',
  '14:30',
  '15:45',
  '17:50',
  '19:30',
  '20:45',
  '22:30',
];

function generateAvailableDates(numberOfDays: number) {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
  };
  const nextDays: DateType[] = [];
  for (let i = 0; i <= numberOfDays - 1; i++) {
    const nextDay = new Date();
    nextDay.setDate(today.getDate() + i);
    nextDays.push({
      isActive: false,
      // randomly disable certain dates as soldout if it's not today
      isDisabled:
        today.getDate() === nextDay.getDate()
          ? false
          : Math.random() > 0.3
          ? false
          : true,
      date: nextDay.toLocaleString('en-GB', options),
    });
  }
  return nextDays;
}

function generateAvailableTimes(date?: string) {
  const timeslots: TimeType[] = [];
  const optionsDate: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
  };
  const today = new Date().toLocaleString('en-GB', optionsDate);
  if (today === date) {
    const currentHour = new Date().getHours();
    for (let i = 0; i <= 7; i++) {
      const hour = Number(fixedTimes[i].split(':')[0]);
      timeslots.push({
        isActive: false,
        isDisabled: hour > currentHour ? false : true,
        time: fixedTimes[i],
      });
    }
  } else {
    for (let i = 0; i <= 7; i++) {
      timeslots.push({
        isActive: false,
        isDisabled: Math.random() > 0.3 ? false : true,
        time: fixedTimes[i],
      });
    }
  }
  return timeslots;
}

export function SelectTime() {
  const [availableDates, setAvailableDates] = useState(
    generateAvailableDates(12)
  );
  const [availableTimes, setAvailableTimes] = useState(
    generateAvailableTimes()
  );

  const { movie: currentMovie } = useRouteLoaderData('currentMovie') as {
    movie: Movie;
  };

  // use ticket-store and set id, movieId  for once only
  const ticketStore = useTicketStore();
  const { setMovieId, setId, setTime, setDate, setPrice, setSeat } =
    ticketStore;
  useEffect(() => {
    setId(generateTicketId());
    setTime(''),
      setDate(''),
      setPrice(0),
      setSeat([]),
      setMovieId(currentMovie.id);
  }, []);

  const handleDateClick = (clickedDate: string) => {
    const updatedDates = availableDates.map(date => {
      if (date.date === clickedDate && !date.isDisabled) {
        // Toggle the isActive property if the date is not disabled
        setDate(date.date);
        setTime('');
        setAvailableTimes(generateAvailableTimes(date.date));
        return {
          ...date,
          isActive: true,
        };
      } else if (date.isActive) {
        // Set rest of the dates inactive
        return {
          ...date,
          isActive: false,
        };
      }
      return date;
    });
    setAvailableDates(updatedDates);
  };

  const handleTimeClick = (clickedTime: string) => {
    const updatedTimes = availableTimes.map(time => {
      if (time.time === clickedTime && !time.isDisabled) {
        // Toggle the isActive property if the time is not disabled
        setTime(time.time);
        return {
          ...time,
          isActive: true,
        };
      } else {
        // Set rest of the times inactive
        if (time.isActive)
          return {
            ...time,
            isActive: false,
          };
      }
      return time;
    });
    setAvailableTimes(updatedTimes);
  };

  return (
    <div className="h-full w-full px-5 py-8 flex flex-col">
      <div className="flex relative items-center justify-center">
        <Link to="/" className="text-white text-xl absolute left-0">
          <MdOutlineKeyboardArrowLeft />
        </Link>
        <h2 className="text-white text-l font-700">Select Date & Time</h2>
      </div>
      <h3 className="uppercase text-m text-white-dimmed font-700 my-6">Date</h3>
      <div className="grid grid-cols-4 gap-y-4">
        {availableDates.map(date => (
          <BookingDetails
            key={date.date}
            isActive={date.isActive}
            isDisabled={date.isDisabled}
            onClick={() => {
              if (!date.isActive) {
                return handleDateClick(date.date);
              }
            }}
          >
            {date.date}
          </BookingDetails>
        ))}
      </div>
      <div className="border border-t-[1px] border-white-dimmed-heavy border-b-0 my-6"></div>
      <h3 className="uppercase text-m text-white-dimmed font-700 my-6">Time</h3>
      <div className="grid grid-cols-4 gap-y-4">
        {availableTimes.map((time, idx) => (
          <BookingDetails
            key={idx}
            isActive={time.isActive}
            isDisabled={time.isDisabled}
            onClick={() => handleTimeClick(time.time)}
          >
            {time.time}
          </BookingDetails>
        ))}
      </div>
      <Link
        to={`/movies/${currentMovie.id}/select-seat`}
        className="w-full mt-auto"
      >
        <Button
          className="w-full"
          disabled={!ticketStore.date || !ticketStore.time ? true : false}
        >
          Select Seat
        </Button>
      </Link>
    </div>
  );
}
