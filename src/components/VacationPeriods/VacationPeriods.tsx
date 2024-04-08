import {
  Button,
  ModalDatePicker,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@components";
import { VacationPeriodsType } from "App";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { Dispatch, SetStateAction } from "react";
import { DateRange } from "react-day-picker";
import { extractDayBuffers, sumDays } from "@lib";
import { Trash2 } from "lucide-react";

interface VacationPeriodsProps {
  vacationPeriods: VacationPeriodsType[];
  date: DateRange | undefined;
  setDate: Dispatch<SetStateAction<DateRange | undefined>>;
  addPeriod: () => void;
  deletePeriod: (id: string) => void;
}

export const VacationPeriods: React.FC<VacationPeriodsProps> = ({
  vacationPeriods,
  date,
  setDate,
  addPeriod,
  deletePeriod,
}) => {
  const { t } = useTranslation();
  const { sumWeekendHolidays, sumTotalDays } = sumDays(vacationPeriods);
  const selectedDays = vacationPeriods.map((period) => {
    return { from: period.dateRange.from, to: period.dateRange.to };
  });
  const dayBuffers = extractDayBuffers(vacationPeriods);

  return (
    <div className="rounded-sm border p-3">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">{t("vacation-periods")}</h2>
        <ModalDatePicker
          maxSelection={30 - sumTotalDays}
          date={date}
          selectedDays={selectedDays}
          setDate={setDate}
          vacationPeriods={vacationPeriods}
          addPeriod={addPeriod}
          dayBuffers={dayBuffers}
        />
      </div>
      {vacationPeriods.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("start-date")}</TableHead>
              <TableHead>{t("end-date")}</TableHead>
              <TableHead>{t("weekend-holiday")}</TableHead>
              <TableHead>{t("total-days")}</TableHead>
              <TableHead>{t("delete")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vacationPeriods.map((period, index) => (
              <TableRow key={index}>
                <TableCell>
                  {format(period.dateRange.from!, "LLL dd, y")}
                </TableCell>
                <TableCell>
                  {format(period.dateRange.to!, "LLL dd, y")}
                </TableCell>
                <TableCell>{period.weekendHolidays}</TableCell>
                <TableCell>{period.totalDays}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    onClick={() => deletePeriod(period.id)}
                  >
                    <Trash2 className="w-[1.25rem] h-[1.25rem]" />
                    <span className="sr-only">t("delete")</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {/* {vacationPeriods.length < 3 && sumTotalDays < 30 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center cursor-pointer p-0">
                <div className="flex gap-2 justify-center items-center">
                  <ModalDatePicker
                    maxSelection={30 - sumTotalDays}
                    date={date}
                    selectedDays={selectedDays}
                    setDate={setDate}
                    vacationPeriods={vacationPeriods}
                    addPeriod={addPeriod}
                    dayBuffers={dayBuffers}
                  />
                </div>
              </TableCell>
            </TableRow>
          )} */}
          </TableBody>
          {vacationPeriods.length > 0 && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell>{sumWeekendHolidays}</TableCell>
                <TableCell>{sumTotalDays}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      )}
    </div>
  );
};
