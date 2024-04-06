import { VacationRules, VacationPeriods, NavBar } from "@components";
import { useState } from "react";
// import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { calculateDays, feriadosNacionais } from "@lib";

export interface VacationPeriodsType {
  dateRange: DateRange;
  weekdays: number;
  weekendHolidays: number;
  totalDays: number;
}
function App() {
  const [vacationPeriods, setVacationPeriods] = useState<VacationPeriodsType[]>(
    []
  );
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  console.log("feriados nacionais:", feriadosNacionais(2024));
  const addPeriod = () => {
    if (dateRange) {
      const { weekdays, weekendHolidays, totalDays } = calculateDays(dateRange);
      setVacationPeriods((oldVacationPeriods) => [
        ...oldVacationPeriods,
        { dateRange, weekdays, weekendHolidays, totalDays },
      ]);
      setDateRange(undefined);
    }
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
        />
      </div>
    </div>
  );
}

export default App;
