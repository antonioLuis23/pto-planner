import { LanguageDropdown, VacationRules, RangeDatePicker } from "@components";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();

  return (
    <div className=" flex justify-center font-poppins">
      <div className="max-w-screen-lg w-3/5">
        <nav className="flex justify-between my-3">
          <h1 className="text-3xl font-bold">{t("pto-planner")}</h1>
          <LanguageDropdown />
        </nav>
        <VacationRules />

        <RangeDatePicker />
      </div>
    </div>
  );
}

export default App;
