import { VacationPeriodsType } from "App";
import { type ClassValue, clsx } from "clsx";
import { addDays, differenceInDays, isWeekend, subDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateTwoDaysPriorHoliday() {
  const holidays = twoYearHolidayAsArray();
  const twoDaysPriorHoliday: Date[] = [];
  holidays.forEach((holiday) => {
    twoDaysPriorHoliday.push(subDays(holiday, 1));
    twoDaysPriorHoliday.push(subDays(holiday, 2));
  });
  return twoDaysPriorHoliday;
}

export function isOutsideTwoDaysPrioHoliday(startDate: Date) {
  const twoDaysPriorHoliday = calculateTwoDaysPriorHoliday();
  return !twoDaysPriorHoliday.some((priorHoliday) => {
    return (
      startDate.getFullYear() === priorHoliday.getFullYear() &&
      startDate.getMonth() === priorHoliday.getMonth() &&
      startDate.getDate() === priorHoliday.getDate()
    );
  });
}

export function isPeriodValid(dateRange: DateRange | undefined) {
  if (dateRange && dateRange.from && dateRange.to) {
    if (!isOutsideTwoDaysPrioHoliday(dateRange.from)) {
      return "cant-select-two-days-prior";
    }
    const totalDays = differenceInDays(dateRange.to, dateRange.from) + 1;
    if (totalDays < 5) {
      return "vacation-period-5-days";
    }
    return null;
  }
  return "select-start-end-date";
}

export function isHoliday(date: Date) {
  const holidays = twoYearHolidayAsArray();
  return holidays.some((holiday) => {
    // Compare only year, month, and day for accurate matching
    return (
      date.getFullYear() === holiday.getFullYear() &&
      date.getMonth() === holiday.getMonth() &&
      date.getDate() === holiday.getDate()
    );
  });
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
      if (isWeekend(currentDate) || isHoliday(currentDate)) {
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

export function sumDays(vacationPeriods: VacationPeriodsType[]) {
  // Initialize the accumulator for each property
  let totalWeekdays = 0;
  let totalWeekendHolidays = 0;
  let totalDays = 0;

  // Loop through each vacation period
  vacationPeriods.forEach((period) => {
    totalWeekdays += period.weekdays;
    totalWeekendHolidays += period.weekendHolidays;
    totalDays += period.totalDays;
  });

  // Return the accumulated totals
  return {
    sumWeekdays: totalWeekdays,
    sumWeekendHolidays: totalWeekendHolidays,
    sumTotalDays: totalDays,
  };
}

export function calculateEaster(year: number) {
  const a = year % 19;
  const b = Math.floor(year / 100); // Use Math.floor for integer division
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = 1 + ((h + l - 7 * m + 114) % 31);

  return new Date(year, month - 1, day); // Adjust month index for Date constructor
}

export function nationalHolidays(year: number) {
  const fixedHolidays = {
    "1º de Janeiro": new Date(year, 0, 1),

    Tiradentes: new Date(year, 3, 21),
    "Aniversário de Florianópolis": new Date(year, 2, 23),
    "Dia do Trabalho": new Date(year, 4, 1),
    "Independência do Brasil": new Date(year, 8, 7),
    "Nossa Senhora Aparecida": new Date(year, 9, 12),
    Finados: new Date(year, 10, 2),
    "Proclamação da República": new Date(year, 10, 15),
    Natal: new Date(year, 11, 25),
  };

  const easter = calculateEaster(year);
  const goodFriday = subDays(easter, 2);
  const carnivalDay1 = subDays(easter, 47);
  const carnivalDay2 = subDays(easter, 48);
  const corpusChristi = addDays(easter, 60);
  const variableHolidays = {
    "Sexta-feira Santa": goodFriday,
    "Carnaval dia 1": carnivalDay1,
    "Carnaval dia 2": carnivalDay2,
    "Corpus Christi": corpusChristi,
  };
  return {
    ...fixedHolidays,
    ...variableHolidays,
  };
}

export function getCurrentYear() {
  return new Date().getFullYear();
}

export function extractDayBuffers(periods: VacationPeriodsType[]) {
  const dayBuffers = [];
  for (const period of periods) {
    dayBuffers.push(period.dayBefore);
    dayBuffers.push(period.dayAfter);
  }
  return dayBuffers;
}

export function twoYearHolidayAsArray() {
  const holidayThisYear = nationalHolidays(getCurrentYear());
  const holidaysNextYear = nationalHolidays(getCurrentYear() + 1);

  return [
    ...Object.values(holidayThisYear),
    ...Object.values(holidaysNextYear),
  ];
}
