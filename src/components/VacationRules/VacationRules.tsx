import { useTranslation } from "react-i18next";
import { Alert, AlertDescription } from "../Alert/Alert";
import { ChevronsUpDown, CircleCheck, CircleX, Info } from "lucide-react";
import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@components";
import { useEffect, useState } from "react";
import { VacationPeriodsType } from "App";
import { useDefineVacationRules } from "@hooks";
import { sumDays } from "@lib";

interface VacationRulesProps {
  vacationPeriods: VacationPeriodsType[];
}
export const VacationRules: React.FC<VacationRulesProps> = ({
  vacationPeriods,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const { sumTotalDays } = sumDays(vacationPeriods);
    if (!(vacationPeriods.length < 3 && sumTotalDays < 30)) {
      setIsOpen(true);
    }
  }, [vacationPeriods]);
  const vacationRules = useDefineVacationRules(vacationPeriods);
  return (
    <div className="rounded-sm border p-3">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex  gap-1">
          <h2 className="text-lg font-semibold mb-3">{t("vacation-rules")}</h2>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <ul className="flex flex-col gap-2">
          <li>
            <Alert
              className="flex gap-3 items-center"
              variant={vacationRules[0].type}
            >
              <div>
                {vacationRules[0].type === "default" && (
                  <Info className="w-[1rem] h-[1rem]" />
                )}
                {vacationRules[0].type === "destructive" && (
                  <CircleX className="w-[1rem] h-[1rem]" />
                )}
                {vacationRules[0].type === "success" && (
                  <CircleCheck className="w-[1rem] h-[1rem]" />
                )}
              </div>
              <AlertDescription className="flex items-center">
                {`${1}. ${vacationRules[0].text}`}
              </AlertDescription>
            </Alert>
          </li>
          <CollapsibleContent className="flex flex-col gap-2">
            {vacationRules.slice(1).map((rule, index) => (
              <li key={rule.id}>
                <Alert className="flex gap-3 items-center" variant={rule.type}>
                  <div>
                    {rule.type === "default" && (
                      <Info className="w-[1rem] h-[1rem]" />
                    )}
                    {rule.type === "destructive" && (
                      <CircleX className="w-[1rem] h-[1rem]" />
                    )}
                    {rule.type === "success" && (
                      <CircleCheck className="w-[1rem] h-[1rem]" />
                    )}
                  </div>
                  <AlertDescription className="flex items-center">
                    {`${index + 2}. ${rule.text}`}
                  </AlertDescription>
                </Alert>
              </li>
            ))}
          </CollapsibleContent>
        </ul>
      </Collapsible>
    </div>
  );
};
