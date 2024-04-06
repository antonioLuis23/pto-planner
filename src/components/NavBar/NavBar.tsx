import { LanguageDropdown, ToggleTheme } from "@components";
import { CalendarHeart } from "lucide-react";
import { useTranslation } from "react-i18next";
export const NavBar = () => {
  const { t } = useTranslation();
  return (
    <nav className="flex justify-between py-3 px-6 border-b border-gray">
      <div className="flex items-center ">
        <div className="mr-1">
          <CalendarHeart className="w-[1.25rem] h-[1.25rem]" />
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
