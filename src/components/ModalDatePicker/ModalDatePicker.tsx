import {
  Button,
  Calendar,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  ErrorDialog,
} from "@components";
import { getCurrentYear, isPeriodValid, twoYearHolidayAsArray } from "@lib";
import { VacationPeriodsType } from "App";
import { CalendarPlus2 } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { DateRange, Matcher } from "react-day-picker";
import { useTranslation } from "react-i18next";
export interface ModalDatePickerProps {
  date: DateRange | undefined;
  setDate: Dispatch<SetStateAction<DateRange | undefined>>;
  addPeriod: () => void;
  maxSelection?: number;
  selectedDays: Matcher[];
  vacationPeriods: VacationPeriodsType[];
  dayBuffers: Date[];
}
export const ModalDatePicker: React.FC<ModalDatePickerProps> = ({
  date,
  setDate,
  addPeriod,
  maxSelection = 30,
  selectedDays,
  dayBuffers,
}) => {
  const [open, setOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { t } = useTranslation();
  const selectedStyle = {
    backgroundColor: "#65D79A",
    color: "black",
  };
  const dayBuffersStyle = {
    backgroundColor: "#D64045",
    color: "black",
  };
  const holidaysStyle = {
    backgroundColor: "#623CEA",
    color: "white",
  };
  const holidays = twoYearHolidayAsArray();
  const disabledDays = [...selectedDays, ...holidays, ...dayBuffers];
  console.log("date:", date);
  const addHandler = () => {
    const errorMessageKey = isPeriodValid(date);
    if (errorMessageKey === null) {
      addPeriod();
      setOpen(false);
      setDate(undefined);
    } else {
      setErrorMessage(t(errorMessageKey));
      setIsErrorOpen(true);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <ErrorDialog
        open={isErrorOpen}
        setOpen={setIsErrorOpen}
        message={errorMessage}
      />
      <DialogTrigger className="flex gap-2 justify-center items-center w-full p-2">
        <div>
          <CalendarPlus2 className="w-[1.2rem] h-[1.2rem]]" />
        </div>
        Add period
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("select-period")}</DialogTitle>
        </DialogHeader>
        <Calendar
          max={maxSelection}
          initialFocus
          mode="range"
          disabled={disabledDays}
          modifiers={{ picked: selectedDays, holidays, dayBuffers }}
          modifiersStyles={{
            picked: selectedStyle,
            holidays: holidaysStyle,
            dayBuffers: dayBuffersStyle,
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
          <div className="flex gap-2 justify-center items-center">
            <div className="bg-[#D64045] w-4 h-4 rounded-sm"></div>
            <span>{t("blocked")}</span>
          </div>
        </div>
        <DialogFooter className="px-4">
          <Button onClick={addHandler}>{t("add")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
