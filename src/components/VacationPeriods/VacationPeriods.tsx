import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components";
import { VacationPeriodsType } from "App";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

interface VacationPeriodsProps {
  vacationPeriods: VacationPeriodsType[];
}
export const VacationPeriods: React.FC<VacationPeriodsProps> = ({
  vacationPeriods,
}) => {
  const { t } = useTranslation();
  return (
    <div>
      <Table>
        <TableCaption>{t("vacation-periods")}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">{t("start-date")}</TableHead>
            <TableHead>{t("end-date")}</TableHead>
            <TableHead>{t("weekdays")}</TableHead>
            <TableHead>{t("weekend-holiday")}</TableHead>
            <TableHead>{t("total-days")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vacationPeriods.map((period, index) => (
            <TableRow key={index}>
              <TableCell>
                {format(period.dateRange.from!, "LLL dd, y")}
              </TableCell>
              <TableCell>{format(period.dateRange.to!, "LLL dd, y")}</TableCell>
              <TableCell>{period.weekdays}</TableCell>
              <TableCell>{period.weekendHolidays}</TableCell>
              <TableCell>{period.totalDays}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
