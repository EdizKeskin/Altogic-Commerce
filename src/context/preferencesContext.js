import { createContext, useState, useEffect, useContext } from "react";
import { IntlProvider } from "react-intl";
import Messages from "./messages";

const PreferencesContext = createContext();

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "tr-TR");
  const [animations, setAnimations] = useState(true);

  useEffect(() => {
    localStorage.setItem("lang", lang);
    localStorage.setItem("animations", animations);
  }, [lang, animations]);
  const values = {
    lang,
    setLang,
    animations,
    setAnimations,
  };

  return (
    <PreferencesContext.Provider value={values}>
      <IntlProvider messages={Messages[lang]} locale={lang}>
        {children}
      </IntlProvider>
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => useContext(PreferencesContext);
