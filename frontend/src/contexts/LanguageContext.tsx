"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations } from '@/data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const defaultLanguage: Language = 'cs';

const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {},
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always initialize with default language to avoid hydration mismatch
  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  const [isClient, setIsClient] = useState(false);

  // Use useEffect to safely access localStorage only on the client
  useEffect(() => {
    setIsClient(true);
    
    // Now that we're on the client, we can safely access localStorage
    const storedLanguage = localStorage.getItem('language') as Language | null;
    if (storedLanguage && ['cs', 'sk', 'en'].includes(storedLanguage)) {
      setLanguageState(storedLanguage);
    }
  }, []);

  // Make sure localStorage is updated when language changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (isClient) {
      localStorage.setItem('language', lang);
    }
  };

  // Translation function
  const t = (key: string): string => {
    if (!key) return '';
    
    const translation = translations[language][key];
    // Return the key itself if translation not found
    return translation || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
} 