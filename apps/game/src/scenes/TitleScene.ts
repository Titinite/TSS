import { GAME_TITLE } from '@tss/shared';
import * as Phaser from 'phaser';

import { t } from '../i18n';

export class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create(): void {
    const { width, height } = this.scale;

    this.add
      .text(width / 2, height / 2 - 40, GAME_TITLE, {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '72px',
        fontStyle: 'bold',
        color: '#F5E6B8',
      })
      .setOrigin(0.5);

    const start = this.add
      .text(width / 2, height / 2 + 60, t('title.start'), {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '28px',
        color: '#EDEFF5',
      })
      .setOrigin(0.5);

    this.tweens.add({ targets: start, alpha: 0.3, duration: 900, yoyo: true, repeat: -1 });
  }
}
