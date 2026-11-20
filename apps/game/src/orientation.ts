import type * as Phaser from 'phaser';

import { t } from './i18n';

const PORTRAIT_MOBILE = '(orientation: portrait) and (pointer: coarse)';

/**
 * E-07: the overlay itself is shown by CSS; here we fill its text
 * and pause the game while a phone is held in portrait.
 */
export function watchOrientation(game: Phaser.Game): void {
  const text = document.getElementById('rotate-text');
  if (text) text.textContent = t('rotate');

  const query = window.matchMedia(PORTRAIT_MOBILE);
  const apply = (): void => {
    if (query.matches) game.pause();
    else game.resume();
  };
  query.addEventListener('change', apply);
  apply();
}
