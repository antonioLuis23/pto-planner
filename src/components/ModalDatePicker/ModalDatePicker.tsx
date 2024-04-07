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
import { getCurrentYear, nationalHolidays } from "@lib";
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
  selectedDays: Matcher[];
  vacationPeriods: VacationPeriodsType[];
}
export const ModalDatePicker: React.FC<ModalDatePickerProps> = ({
  date,
  setDate,
  addPeriod,
  maxSelection = 30,
  selectedDays,
}) => {
  const { t } = useTranslation();
  const selectedStyles = {
    backgroundColor: "#65D79A",
    color: "black",
    opacity: 1,
  };
  const holidaysStyle = {
    backgroundColor: "#623CEA",
    opacity: 1,
    color: "white",
  };
  const holidayThisYear = nationalHolidays(getCurrentYear());
  const holidaysNextYear = nationalHolidays(getCurrentYear() + 1);
  console.log(
    "(Object.values(holidayThisYear):",
    Object.values(holidayThisYear),
  );
  const holidays = [
    ...Object.values(holidayThisYear),
    ...Object.values(holidaysNextYear),
  ];
  const disabledDays = [...selectedDays, ...Object.values(holidayThisYear)];
  console.log("disabledDays:", disabledDays);
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
          modifiers={{ picked: selectedDays, holidays }}
          modifiersStyles={{
            picked: selectedStyles,
            holidays: holidaysStyle,
          }}
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
          fromYear={getCurrentYear()}
          toYear={getCurrentYear() + 1}
        />
        <div className="flex gap-4">
          <div className="flex gap-1 justify-center items-center">
            <div className="bg-[#65D79A] w-4 h-4 rounded-sm"></div>
            <span>{t("selected")}</span>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <div className="bg-[#623CEA] w-4 h-4 rounded-sm"></div>
            <span>{t("holiday")}</span>
          </div>
        </div>
        <AlertDialogFooter className="px-4">
          <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={addPeriod}>{t("add")}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
