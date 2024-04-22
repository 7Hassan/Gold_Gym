import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector'
import translationAR from './translation/ar.json'
// import HttpApi from 'i18next-http-backend';

const resources = {
  ar: {
    translation: translationAR
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    detection: {
      order: ['cookie', 'htmlTag', 'localStorage', 'subdomain'],
      caches: ['cookie']
    },
    interpolation: { escapeValue: false },
    react: { useSuspense: false }
  });

export default i18n;