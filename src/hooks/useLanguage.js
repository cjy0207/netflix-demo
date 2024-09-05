import React, { createContext, useContext, useState } from 'react';

// Create a context for managing language
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

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);
