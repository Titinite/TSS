import i18next from 'i18next';

import en from './locales/en.json';
import fr from './locales/fr.json';

export const SUPPORTED_LANGUAGES = ['fr', 'en'] as const;

/** Picks the browser language when supported, French otherwise. */
function detectLanguage(): string {
  const browser = navigator.language.slice(0, 2);
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(browser) ? browser : 'fr';
}

export async function initI18n(): Promise<void> {
  await i18next.init({
    lng: detectLanguage(),
    fallbackLng: 'fr',
    supportedLngs: SUPPORTED_LANGUAGES,
    resources: { fr: { translation: fr }, en: { translation: en } },
    interpolation: { escapeValue: false },
  });
  document.documentElement.lang = i18next.language;
}

export const t = i18next.t.bind(i18next);
