/// <reference path="../../../../type-declarations/index.d.ts" />
import * as Phaser from 'phaser';
import { centerGameObjects } from '../utils';
import { getGameState } from '../../store';

const boardToCSV = board =>
  board.map( row => row.map( tile => tile.t ).join(",") ).join("\n"); 

export class SplashState extends Phaser.State {
  loaderBg: Phaser.Sprite;
  loaderBar: Phaser.Sprite;

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
      /* 'assets/tilemaps/zeldamap.json', */
      null,
      boardToCSV(getGameState().gameBoard), 
      Phaser.Tilemap.CSV
    );

    this.load.image('heart', 'assets/sprites/heart.png');
    this.load.image('fairy', 'assets/sprites/fairy.png');
    this.load.image('triforce', 'assets/sprites/triforce.png');
    this.load.image('link', 'assets/sprites/link-single.png');
    // this.load.spritesheet('link',
    //   'assets/sprites/link.png',
    //   16, 16, 8, 0, 16);
    // this.load.spritesheet('octorock',
    //   'assets/sprites/octorock.png',
    //   16, 16, 8, 0, 16);

    this.load.image('zeldatiles', 'assets/tilemaps/zeldamap.png');
  }

  create () {
    // Next state
    this.game.state.start('Game');
  }
}
