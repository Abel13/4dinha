import { getLocales } from 'expo-localization';
import { I18n, type TranslateOptions } from 'i18n-js';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import translation from '../i18n/translation.json';
import { SupportedLocale } from '../types';

const DEFAULT_LOCALE = 'en';

interface ITranslationState {
  customLanguage: SupportedLocale;
  changeLanguage: (language: SupportedLocale) => void;
}

const translationStore = create<ITranslationState>()(
  persist(
    (set) => ({
      customLanguage: 'pt',
      changeLanguage: (language) => {
        set({
          customLanguage: language,
        });
      },
    }),
    {
      name: 'language-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const useTranslation = (filter: keyof typeof translation.pt) => {
  const i18n = new I18n(translation);
  const { changeLanguage, customLanguage } = translationStore((s) => s);

  const getLocale = (): SupportedLocale => {
    const { languageCode } = getLocales()[0];
    const locale =
      customLanguage ||
      ((languageCode || DEFAULT_LOCALE).toLowerCase() as SupportedLocale);

    if (!Object.keys(translation).includes(locale)) {
      return DEFAULT_LOCALE as SupportedLocale;
    }

    return locale;
  };

  const t = (key: string, params?: TranslateOptions) => {
    if (key) {
      const currentLocale = getLocale();
      i18n.locale = currentLocale;

      return i18n.t([filter, key], params);
    }

    return '';
  };

  return {
    t,
    locales: Object.keys(translation) as SupportedLocale[],
    customLanguage,
    changeLanguage,
  };
};
