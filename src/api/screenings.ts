import axios from "axios";
import { ScreeningModel } from "../types/api";

const optionsDate: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
};

export const getAvailableTimes = async (date: string, currentMovie: number) => {
  const today = new Date().toLocaleString('en-GB', optionsDate);
  if (!date) {
    date = today
  }
  const isoDate = new Date(`${date} 2023`).toLocaleDateString('en-CA');
  const timeslots = await axios
    .get(
      `http://localhost:8000/screening/?movieId=${currentMovie}&date=${isoDate}`
    )
    .then(res =>
      res.data
        .map((obj: ScreeningModel) =>
          new Date(obj.datetime).toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
          })
        )
        .map((slot: string) => {
          if (date === today) {
            const currentHour = new Date().getHours();
            const hour = Number(slot.split(':')[0]);
            return {
              time: slot,
              isActive: false,
              isDisabled: hour > currentHour ? false : true,
            };
          } else {
            return {
              time: slot,
              isActive: false,
              isDisabled: Math.random() > 0.3 ? false : true,
            };
          }
        })
    );
  console.log(timeslots)
  return timeslots;
};
