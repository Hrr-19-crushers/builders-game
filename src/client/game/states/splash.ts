/// <reference path="../../../../type-declarations/index.d.ts" />
import * as Phaser from 'phaser';
import { centerGameObjects } from '../utils';
import { getGameState } from '../../store';

// Extracts the types of the game board and adjoins them as a CSV
const processGameBoard = board =>
  board.map(row => 
    row.map(cell => cell.t - 1).join(",")
  ).join("\n"); 

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
      processGameBoard(getGameState().gameBoard), 
      Phaser.Tilemap.CSV
    );

    this.load.image('mushroom', 'assets/sprites/mushroom2.png');
    this.load.image('mario', 'assets/sprites/mario.png');
    this.load.image('crab', 'assets/sprites/crab.png');

    this.load.spritesheet('link',
      'assets/sprites/link.png',
      16, 16, 8, 0, 16);


    this.load.image('zeldatiles', 'assets/tilemaps/zeldamap.png');
  }

  create () {
    // Next state
    this.game.state.start('Game');
  }

}
