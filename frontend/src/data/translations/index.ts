import { csTranslations } from './cs';
import { enTranslations } from './en';

export type Language = 'cs' | 'en';

export type TranslationData = {
  [key in Language]: {
    [key: string]: string;
  };
};

export const translations: TranslationData = {
  cs: csTranslations,
  en: enTranslations
};
