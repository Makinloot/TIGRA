import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import kaTranslation from '../locales/ka/translation.json';
import enTranslation from '../locales/en/translation.json';

// TODO-FX: Replace with real backend translation service if needed.
// API Endpoint: GET /api/translations/{language}
// Expected Data: { translation: { [key]: string } }

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ka: { translation: kaTranslation },
      en: { translation: enTranslation }
    },
    fallbackLng: 'ka',
    supportedLngs: ['ka', 'en'],
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
