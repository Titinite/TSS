import * as Phaser from 'phaser';

import { initI18n } from './i18n';
import { watchOrientation } from './orientation';
import { BootScene } from './scenes/BootScene';
import { TitleScene } from './scenes/TitleScene';
import './style.css';

/** Reference resolution: 16:9 landscape, scaled to fit mobile and PC screens. */
export const GAME_WIDTH = 1920;
export const GAME_HEIGHT = 1080;

async function bootstrap(): Promise<void> {
  await initI18n();

  const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    backgroundColor: '#0F1220',
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: GAME_WIDTH,
      height: GAME_HEIGHT,
    },
    scene: [BootScene, TitleScene],
  });

  watchOrientation(game);
}

void bootstrap();
