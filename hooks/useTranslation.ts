import { getLocales } from 'expo-localization';
import { I18n, TranslateOptions } from 'i18n-js';
import errors from '../i18n/errors.json';
import { SupportedLocale } from '../types';

export const useTranslation = () => {
  const i18n = new I18n(errors, {
    defaultLocale: 'pt_br',
  });

  const getLocale = (): SupportedLocale => {
    let locale: SupportedLocale = 'en_us';
    const { languageCode } = getLocales()[0] || 'en';

    switch (languageCode) {
      case 'pt':
        locale = 'pt_br';
        break;
      default:
        locale = 'en_us';
        break;
    }

    return locale;
  };

  const t = (
    key: keyof typeof errors.en_us | keyof typeof errors.pt_br,
    params?: TranslateOptions,
  ) => {
    if (key) {
      i18n.locale = getLocale();
      return i18n.t(key, params);
    }

    return '';
  };

  return {
    t,
    getLocale,
  };
};
