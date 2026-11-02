import { csTranslations } from './cs';
import { skTranslations } from './sk';
import { enTranslations } from './en';

export type Language = 'cs' | 'sk' | 'en';

export type TranslationData = {
  [key in Language]: {
    [key: string]: string;
  };
};

export const translations: TranslationData = {
  cs: csTranslations,
  sk: skTranslations,
  en: enTranslations
};
