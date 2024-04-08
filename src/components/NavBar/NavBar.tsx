import { LanguageDropdown, ToggleTheme } from "@components";
import { CalendarHeart } from "lucide-react";
import { useTranslation } from "react-i18next";
export const NavBar = () => {
  const { t } = useTranslation();
  return (
    <nav className="flex justify-between py-3 px-5 bg-background sm:px-9 border-b border-gray">
      <div className="flex items-center ">
        <div className="mr-2">
          <CalendarHeart className="w-[1.5rem] h-[1.5rem]" />
        </div>
        <h1 className="text-xl font-bold">{t("pto-planner")}</h1>
      </div>
      <div className="flex gap-2">
        <LanguageDropdown />
        <ToggleTheme />
      </div>
    </nav>
  );
};
