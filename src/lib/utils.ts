import { type ClassValue, clsx } from "clsx";
import { addDays, differenceInDays, isWeekend } from "date-fns";
import { DateRange } from "react-day-picker";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateDays(dateRange: DateRange) {
  let weekendHolidays = 0;
  let weekdays = 0;
  let totalDays = 0;
  if (dateRange.from && dateRange.to) {
    totalDays = differenceInDays(dateRange.to, dateRange.from) + 1;
    let count = 0;

    let currentDate = dateRange.from;
    while (count < totalDays) {
      if (isWeekend(currentDate)) {
        weekendHolidays++;
      } else {
        weekdays++;
      }
      currentDate = addDays(currentDate, 1);
      count++;
    }
  }
  return { weekdays, weekendHolidays, totalDays };
}
