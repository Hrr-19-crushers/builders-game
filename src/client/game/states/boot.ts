/// <reference path="../../../../type-declarations/index.d.ts" />
import * as Phaser from 'phaser';

export class BootState extends Phaser.State {
  stage: Phaser.Stage;
  fontsReady: boolean;

  init () {
    this.stage.backgroundColor = '#111111';
  }

  preload () {
    this.game.load.image('loaderBg', './assets/images/loader-bg.png');
    this.game.load.image('loaderBar', './assets/images/loader-bar.png');
  }

  render () {
    this.game.state.start('Splash');
  }
}
