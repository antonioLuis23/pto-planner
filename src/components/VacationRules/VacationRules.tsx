import { useTranslation } from "react-i18next";
import { Alert, AlertDescription } from "../Alert/Alert";
import { Info } from "lucide-react";
export const VacationRules = () => {
  const { t } = useTranslation();
  const vacationRules = [
    t("divided-three-period"),
    t("one-period-14-days"),
    t("two-periods-5-days-at-least"),
    t("cannot-start-two-days-prior-holidays"),
    t("must-return-to-work-one-day"),
  ];
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">{t("vacation-rules")}</h2>
      <ul className="flex flex-col gap-2">
        {vacationRules.map((rule) => (
          <Alert className="flex gap-3 items-center">
            <div>
              <Info className="w-[1rem] h-[1rem]" />
            </div>
            <AlertDescription className="flex items-center">
              {rule}
            </AlertDescription>
          </Alert>
        ))}
      </ul>
    </div>
  );
};
