import { LanguageDropdown, ToggleTheme } from "@components";
import { useTranslation } from "react-i18next";
import { FaCalendarDays } from "react-icons/fa6";
export const NavBar = () => {
  const { t } = useTranslation();
  return (
    <nav className="flex justify-between py-3 px-6 border-b border-gray">
      <div className="flex items-center ">
        <div className="mr-1">
          <FaCalendarDays />
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
