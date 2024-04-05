import { useTranslation } from "react-i18next";
import { Alert, AlertDescription } from "../Alert/Alert";
import { IoInformationCircleOutline } from "react-icons/io5";
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
      <h2 className="text-xl font-bold">{t("vacation-rules")}</h2>
      <ul className="flex flex-col gap-2">
        {vacationRules.map((rule) => (
          <Alert className="flex gap-3 items-center">
            <div>
              <IoInformationCircleOutline />
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
