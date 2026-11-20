import * as Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  create(): void {
    // Assets will be loaded here (loading screen E-01).
    this.scene.start('Title');
  }
}
