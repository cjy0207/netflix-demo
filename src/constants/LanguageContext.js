import React, { createContext, useContext, useState } from 'react';


export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en-US"); // Default to English

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en-US" ? "ko-KR" : "en-US"));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};


export const useLanguage = () => useContext(LanguageContext);
