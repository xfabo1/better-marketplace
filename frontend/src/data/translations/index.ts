import { csTranslations } from './cs';
import { skTranslations } from './sk';
import { enTranslations } from './en';

// Define available languages
export type Language = 'cs' | 'sk' | 'en';

// Translation data structure
export type TranslationData = {
  [key in Language]: {
    [key: string]: string;
  };
};

// Combined translations for the site
export const translations: TranslationData = {
  cs: csTranslations,
  sk: skTranslations,
  en: enTranslations
};
