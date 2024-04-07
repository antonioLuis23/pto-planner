import { differenceInDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { useTranslation } from "react-i18next";

export function useIsPeriodValid(dateRange: DateRange | undefined) {
  const { t } = useTranslation();
  if (dateRange && dateRange.from && dateRange.to) {
    const totalDays = differenceInDays(dateRange.to, dateRange.from) + 1;
    if (totalDays < 5) {
      return t("vacation-period-5-days");
    }
    return null;
  }
  return t("select-start-end-date");
}
