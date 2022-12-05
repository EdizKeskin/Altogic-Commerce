import { createContext, useState, useEffect, useContext } from "react";
import { IntlProvider } from "react-intl";
import Messages from "./messages";

const LangContext = createContext();

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "tr-TR");

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);
  const values = {
    lang,
    setLang,
  };

  return (
    <LangContext.Provider value={values}>
      <IntlProvider messages={Messages[lang]} locale={lang}>
        {children}
      </IntlProvider>
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);
