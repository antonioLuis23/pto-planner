import { useTranslation } from "react-i18next";
import { Alert, AlertDescription } from "../Alert/Alert";
import { ChevronsUpDown, Info } from "lucide-react";
import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@components";
import { useState } from "react";
export const VacationRules = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
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
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex justify-center">
          <h2 className="text-xl font-semibold mb-3">{t("vacation-rules")}</h2>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <ul className="flex flex-col gap-2">
          <li>
            <Alert className="flex gap-3 items-center">
              <div>
                <Info className="w-[1rem] h-[1rem]" />
              </div>
              <AlertDescription className="flex items-center">
                {`${1}. ${t("30-days-vacation")}`}
              </AlertDescription>
            </Alert>
          </li>
          <CollapsibleContent className="flex flex-col gap-2">
            {vacationRules.map((rule, index) => (
              <li key={rule.id}>
                <Alert className="flex gap-3 items-center">
                  <div>
                    <Info className="w-[1rem] h-[1rem]" />
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
