import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import ko from './ko.json';
  
i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: en,
    ko: ko,
  },
  interpolation: {
    escapeValue: false // react already safes from xss
  }
});
  
export default i18n;