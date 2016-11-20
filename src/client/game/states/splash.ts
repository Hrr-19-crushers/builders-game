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
    );

    centerGameObjects([this.loaderBg, this.loaderBar]);

    this.load.setPreloadSprite(this.loaderBar);

    // Load assets
    this.game.load.tilemap(
      'zeldamap', 
      'assets/tilemaps/zeldamap.json',
      null, Phaser.Tilemap.TILED_JSON
    );

    this.load.image('mushroom', 
      'assets/sprites/mushroom2.png');
    this.load.image('mario', 
      'assets/sprites/mario.png');
    this.load.image('crab', 
      'assets/sprites/crab.png');

    this.load.spritesheet('link',
      'assets/sprites/link.png',
      16, 16, 8, 0, 16);


    this.load.image('zeldatiles', 
      'assets/tilemaps/zeldamap.png');
  }

  create () {
    // Next state
    this.game.state.start('Game');
  }

}
