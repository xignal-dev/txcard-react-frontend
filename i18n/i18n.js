import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ko from './ko.json';
import en from './en.json';
import ru from './ru.json'

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    debug: true,

    resources: {
      ko: {
        lang: ko
      },
      en: {
        lang: en
      },
      ru: {
        lang: ru
      }
    },

    defaultNS: 'lang',
    ns: ['lang'],
    transSupportBasicHtmlNodes: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });


export default i18n;

