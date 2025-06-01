"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/data/translations';

interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}

const languages: LanguageOption[] = [
  {
    code: 'cs',
    name: 'Čeština',
    flag: 'CS'
  },
  {
    code: 'sk',
    name: 'Slovenčina',
    flag: 'SK'
  },
  {
    code: 'en',
    name: 'English',
    flag: 'EN'
  }
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Set mounted to true when component mounts on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Default to first language for server rendering
  const defaultLanguage = languages[0];
  
  // Only use the actual language state on the client to avoid hydration errors
  const currentLanguage = mounted 
    ? (languages.find(lang => lang.code === language) || defaultLanguage)
    : defaultLanguage;

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <span className="mr-1 text-sm font-medium">{currentLanguage.flag}</span>
        </div>
        <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`flex items-center w-full text-left px-4 py-2 text-sm ${
                  language === lang.code ? 'text-primary bg-gray-50' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => handleLanguageChange(lang.code)}
              >
                <span className="mr-2 text-sm font-medium">{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 