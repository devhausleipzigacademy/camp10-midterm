import { useEffect, useState } from 'react';
import BookingDetails from '../components/BookingDetails';
import { useTicketStore } from '../stores/ticket';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { useRouteLoaderData } from 'react-router-dom';
import { Movie, ScreeningModel } from '../types/api';
import { generateTicketId } from '../lib/utils';
import { getAvailableTimes } from '../api/screenings';

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

const optionsDate: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
};

export function SelectTime() {
  const TODAY = new Date().toLocaleString('en-GB', optionsDate);
  const { movie: currentMovie, screenings: currentScreenings } =
    useRouteLoaderData('currentMovie') as {
      movie: Movie;
      screenings: ScreeningModel[];
    };

  const screeningDates = [
    ...new Set(
      currentScreenings.map(show => {
        const today = new Date().toLocaleString('en-GB', optionsDate);
        const showDate = new Date(show.datetime).toLocaleString(
          'en-GB',
          optionsDate
        );
        if (new Date(`${today} ${2023}`) <= new Date(`${showDate} ${2023}`)) {
          return showDate;
        }
      })
    ),
  ];

  const initAvailableDates = screeningDates
    .map((date, idx) => {
      return {
        date: date,
        isActive: idx === 0 ? true : false,
        isDisabled: false,
      };
    })
    .filter(x => x.date !== undefined) as DateType[];

  const [availableDates, setAvailableDates] = useState(
    initAvailableDates.slice(0, 12)
  );
  const [availableTimes, setAvailableTimes] = useState([] as TimeType[]);

  // use ticket-store and set id, movieId  for once only
  const ticketStore = useTicketStore();
  const { setMovieId, setId, setTime, setDate, setPrice, setSeat } =
    ticketStore;
  useEffect(() => {
    handleDateClick(initAvailableDates[0].date);
    setId(generateTicketId());
    setTime(''),
      setDate(TODAY),
      setPrice(0),
      setSeat([]),
      setMovieId(currentMovie.id);
  }, []);

  const handleDateClick = async (clickedDate: string) => {
    const timeslots = await getAvailableTimes(clickedDate, currentMovie.id);
    const updatedDates = availableDates.map(date => {
      if (date.date === clickedDate && !date.isDisabled) {
        // Toggle the isActive property if the date is not disabled
        setDate(date.date);
        setTime('');
        setAvailableTimes(timeslots);
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
