import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import ko from './ko.json';
var userLang = navigator.language || navigator.userLanguage;
if(userLang=='en-US' || userLang=='en' ){
  var lang = 'en';
}else{
  var lang = 'ko';
} 
//alert ("The language is: " + userLang);
i18n.use(initReactI18next).init({
  
  lng: lang,
  fallbackLng: lang,
  resources: {
    en: en,
    ko: ko,
  },
  interpolation: {
    escapeValue: false // react already safes from xss
  }
});
  
export default i18n;