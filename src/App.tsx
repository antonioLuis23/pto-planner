import { VacationRules, VacationPeriods, NavBar } from "@components";
import { useState } from "react";
// import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { calculateDays } from "@lib";
import { add, sub } from "date-fns";

export interface VacationPeriodsType {
  dateRange: DateRange;
  weekdays: number;
  weekendHolidays: number;
  totalDays: number;
  id: string;
  dayBefore: Date;
  dayAfter: Date;
}
function App() {
  const [vacationPeriods, setVacationPeriods] = useState<VacationPeriodsType[]>(
    []
  );
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const addPeriod = () => {
    if (dateRange) {
      const dayBefore = sub(dateRange.from!, { days: 1 });
      const dayAfter = add(dateRange.to!, { days: 1 });

      const { weekdays, weekendHolidays, totalDays } = calculateDays(dateRange);
      setVacationPeriods((oldVacationPeriods) => [
        ...oldVacationPeriods,
        {
          dateRange,
          weekdays,
          dayBefore,
          dayAfter,
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
