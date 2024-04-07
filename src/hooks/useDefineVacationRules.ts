import { sumDays } from "@lib";
import { VacationPeriodsType } from "App";
import { useTranslation } from "react-i18next";

interface VacationRuleType {
  type: "default" | "destructive" | "success" | null | undefined;
  id: string;
  text: string;
}
export function useDefineVacationRules(vacationPeriods: VacationPeriodsType[]) {
  const { t } = useTranslation();
  const { sumTotalDays } = sumDays(vacationPeriods);

  const vacationRules: VacationRuleType[] = [
    { type: "default", id: crypto.randomUUID(), text: t("30-days-vacation") },
    {
      type: "default",
      id: crypto.randomUUID(),
      text: t("divided-three-period"),
    },
    {
      type: "default",
      id: crypto.randomUUID(),
      text: t("one-period-14-days"),
    },
    {
      type: "default",
      id: crypto.randomUUID(),
      text: t("two-periods-5-days-at-least"),
    },
    {
      type: "default",
      id: crypto.randomUUID(),

      text: t("cannot-start-two-days-prior-holidays"),
    },
    {
      type: "default",
      id: crypto.randomUUID(),
      text: t("must-return-to-work-one-day"),
    },
  ];
  if (vacationPeriods.length < 3 && sumTotalDays < 30) {
    return vacationRules;
  }
  vacationRules[1].type = "success";
  vacationRules[3].type = "success";
  vacationRules[4].type = "success";
  vacationRules[5].type = "success";
  if (sumTotalDays === 30) {
    vacationRules[0].type = "success";
  } else {
    vacationRules[0].type = "destructive";
  }

  if (vacationPeriods.some((period) => period.totalDays >= 14)) {
    vacationRules[2].type = "success";
  } else {
    vacationRules[2].type = "destructive";
  }
  console.log("vacationRules:", vacationRules);
  return vacationRules;
}
