/// <reference path="../../../type-declarations/index.d.ts" />

import * as Phaser from 'phaser';

import { BootState } from './states/boot';
import { SplashState } from './states/splash';
import { GameState } from './states/game';

class Game extends Phaser.Game {
  constructor() {
    let width = document.documentElement.clientWidth > 768 * 1.4 // make room for chat
      ? 768
      : document.documentElement.clientWidth * 0.7;
    let height = document.documentElement.clientHeight > 1024 * 1.1 // give navbar some room
      ? 1024
      : document.documentElement.clientHeight * .8;

    super(width, height, Phaser.AUTO, 'game', null);

    this.state.add('Boot', BootState, false);
    this.state.add('Splash', SplashState, false);
    this.state.add('Game', GameState, false);

    this.state.start('Boot');
    console.log('Game starting!');
  }
}

export const runGame = () => {
  new Game();
}