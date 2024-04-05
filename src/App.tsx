import {
  VacationRules,
  RangeDatePicker,
  Button,
  VacationPeriods,
  NavBar,
} from "@components";
import { useState } from "react";
import { useTranslation } from "react-i18next";
// import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { FaCalendarPlus } from "react-icons/fa";
import { calculateDays } from "@lib";

export interface VacationPeriodsType {
  dateRange: DateRange;
  weekdays: number;
  weekendHolidays: number;
  totalDays: number;
}
function App() {
  const { t } = useTranslation();
  const [vacationPeriods, setVacationPeriods] = useState<VacationPeriodsType[]>(
    []
  );
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const addPeriod = () => {
    if (dateRange) {
      const { weekdays, weekendHolidays, totalDays } = calculateDays(dateRange);
      setVacationPeriods((oldVacationPeriods) => [
        ...oldVacationPeriods,
        { dateRange, weekdays, weekendHolidays, totalDays },
      ]);
    }
  };
  console.log("vacation periods:", vacationPeriods);
  return (
    <div>
      <NavBar />
      <div className="max-w-screen-lg px-5 mx-auto mt-3">
        <VacationRules />
        <div className="flex justify-between mt-5">
          <RangeDatePicker date={dateRange} setDate={setDateRange} />
          <Button onClick={addPeriod} disabled={vacationPeriods.length >= 3}>
            <div className="mr-2 h-4 w-4">
              <FaCalendarPlus />
            </div>
            <span>{t("add")}</span>
          </Button>
        </div>
        <VacationPeriods vacationPeriods={vacationPeriods} />
      </div>
    </div>
  );
}

export default App;
