import { VacationRules, VacationPeriods, NavBar } from "@components";
import { useState } from "react";
// import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { calculateDays, nationalHolidays } from "@lib";

export interface VacationPeriodsType {
  dateRange: DateRange;
  weekdays: number;
  weekendHolidays: number;
  totalDays: number;
  id: string;
}
function App() {
  const [vacationPeriods, setVacationPeriods] = useState<VacationPeriodsType[]>(
    [],
  );
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const addPeriod = () => {
    if (dateRange) {
      const { weekdays, weekendHolidays, totalDays } = calculateDays(dateRange);
      setVacationPeriods((oldVacationPeriods) => [
        ...oldVacationPeriods,
        {
          dateRange,
          weekdays,
          weekendHolidays,
          totalDays,
          id: crypto.randomUUID(),
        },
      ]);
      setDateRange(undefined);
    }
  };
  const deletePeriod = (id: string) => {
    setVacationPeriods((oldVacationPeriods) => [
      ...oldVacationPeriods.filter((period) => period.id !== id),
    ]);
  };
  console.log("national holidays 2025", nationalHolidays(2025));
  console.log("national holidays 2026", nationalHolidays(2026));
  return (
    <div>
      <NavBar />
      <div className="max-w-screen-lg px-6 mx-auto mt-3">
        <VacationRules />
        <div className="flex justify-between mt-5"></div>
        <VacationPeriods
          date={dateRange}
          setDate={setDateRange}
          vacationPeriods={vacationPeriods}
          addPeriod={addPeriod}
          deletePeriod={deletePeriod}
        />
      </div>
    </div>
  );
}

export default App;
