import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";
import { Button } from "../Button/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components";

export const LanguageDropdown = () => {
  const { i18n, t } = useTranslation();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages className="h-[1rem] w-[1rem]" />
          <span className="sr-only">choose language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-50 rounded-md shadow-md" align="end">
        <DropdownMenuItem onClick={() => i18n.changeLanguage("en")}>
          {t("english")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => i18n.changeLanguage("pt")}>
          {t("portuguese")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
