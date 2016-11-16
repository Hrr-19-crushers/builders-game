/// <reference path="../../../../type-declarations/index.d.ts" />
import * as Phaser from 'phaser'
import {centerGameObjects} from '../utils'

export class SplashState extends Phaser.State {
  loaderBg: Phaser.Sprite
  loaderBar: Phaser.Sprite

  init () {}

  preload () {
    this.loaderBg = this.add.sprite(
      this.game.world.centerX, 
      this.game.world.centerY, 
      'loaderBg'
    );

    this.loaderBar = this.add.sprite(
      this.game.world.centerX,
      this.game.world.centerY, 
      'loaderBar'
    )
    ;
    centerGameObjects([this.loaderBg, this.loaderBar]);

    this.load.setPreloadSprite(this.loaderBar);

    // Load assets
    this.load.image('mushroom', 'assets/images/mushroom2.png');
    this.load.image('mario', 'assets/images/mario.png');
  }

  create () {
    // Next state
    this.game.state.start('Game');
  }

}
