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
  const changeLanguageHandler = (language: "en" | "pt") => {
    void i18n.changeLanguage(language, (err) => {
      if (err) return console.log("something went wrong");
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages className="h-[1rem] w-[1rem]" />
          <span className="sr-only">choose language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-50 rounded-md shadow-md" align="end">
        <DropdownMenuItem onClick={() => changeLanguageHandler("en")}>
          {t("english")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguageHandler("pt")}>
          {t("portuguese")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
