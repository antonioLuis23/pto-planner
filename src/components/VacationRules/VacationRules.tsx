import { useTranslation } from "react-i18next";
import { Alert, AlertDescription } from "../Alert/Alert";
import { Info } from "lucide-react";
export const VacationRules = () => {
  const { t } = useTranslation();
  const vacationRules = [
    { id: crypto.randomUUID(), text: t("divided-three-period") },
    { id: crypto.randomUUID(), text: t("one-period-14-days") },
    { id: crypto.randomUUID(), text: t("two-periods-5-days-at-least") },
    {
      id: crypto.randomUUID(),
      text: t("cannot-start-two-days-prior-holidays"),
    },
    { id: crypto.randomUUID(), text: t("must-return-to-work-one-day") },
  ];
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">{t("vacation-rules")}</h2>
      <ul className="flex flex-col gap-2">
        {vacationRules.map((rule) => (
          <li key={rule.id}>
            <Alert className="flex gap-3 items-center">
              <div>
                <Info className="w-[1rem] h-[1rem]" />
              </div>
              <AlertDescription className="flex items-center">
                {rule.text}
              </AlertDescription>
            </Alert>
          </li>
        ))}
      </ul>
    </div>
  );
};
