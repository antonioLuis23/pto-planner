import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialog,
  AlertDialogCancel,
  AlertDialogAction,
  Calendar,
} from "@components";
import { VacationPeriodsType } from "App";
import { CalendarPlus2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { DateRange, Matcher } from "react-day-picker";
import { useTranslation } from "react-i18next";
export interface ModalDatePickerProps {
  date: DateRange | undefined;
  setDate: Dispatch<SetStateAction<DateRange | undefined>>;
  addPeriod: () => void;
  maxSelection?: number;
  disabledDays: Matcher[];
  vacationPeriods: VacationPeriodsType[];
}
export const ModalDatePicker: React.FC<ModalDatePickerProps> = ({
  date,
  setDate,
  addPeriod,
  maxSelection = 30,
  disabledDays,
}) => {
  const { t } = useTranslation();

  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex gap-2 justify-center items-center w-full p-2">
        <div>
          <CalendarPlus2 className="w-[1.2rem] h-[1.2rem]]" />
        </div>
        Add period
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("select-period")}</AlertDialogTitle>
        </AlertDialogHeader>
        <Calendar
          max={maxSelection}
          initialFocus
          mode="range"
          disabled={disabledDays}
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
        <AlertDialogFooter>
          <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={addPeriod}>{t("add")}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
