/// <reference path="../../../../type-declarations/index.d.ts" />
import * as Phaser from 'phaser';

import { setResponsiveWidth } from '../utils';
import { getGameState } from '../../store';

const enum TILE {
  WIDTH = 16,
  HEIGHT = 16
};

interface Location {
  x: number; 
  y: number;
};

class Link extends Phaser.Sprite {
  gridPosition: Phaser.Point;

  constructor(game: Phaser.Game, {x, y}: Location) {
    super(
      game, 
      x * TILE.WIDTH, 
      y * TILE.HEIGHT,
      'link'
    );
    this.gridPosition = new Phaser.Point(x, y);
  }

  moveWithoutTween({x, y}: Location) {
    this.gridPosition.x = x * TILE.WIDTH;
    this.gridPosition.y = y * TILE.HEIGHT;
    this.x = x * TILE.WIDTH;
    this.y = y * TILE.WIDTH;
  }

  move({x, y}: Location) {
    this.gridPosition.x = x * TILE.WIDTH;
    this.gridPosition.y = y * TILE.HEIGHT;
    this.game.add.tween(this).to({
        x: this.gridPosition.x, 
        y: this.gridPosition.y
      }, 
      250, 
      Phaser.Easing.Quadratic.Out, 
      true
    );
  }

  getLocation(): Location {
    return {
      x: this.gridPosition.x,
      y: this.gridPosition.y,
    };
  }
}

export class GameState extends Phaser.State {
  link: Link;

  tilemap: Phaser.Tilemap;
  layer: Phaser.TilemapLayer;

  create () {
    const {charState} = getGameState();

    this.game.physics.startSystem(
      Phaser.Physics.ARCADE
    );

    this.tilemap = this.game.add.tilemap('zeldamap', TILE.WIDTH, TILE.HEIGHT);
    this.tilemap.addTilesetImage(
      'zeldatiles', 'zeldatiles',
      TILE.WIDTH, TILE.HEIGHT,
      1, 1
    );
    this.layer = this.tilemap.createLayer(0); 
    // this.tilemap.setCollision();

    this.layer.resizeWorld();

    this.link = new Link(
      this.game,
      charState.charLocation
    );

    this.game.add.existing(this.link);

    // Start polling for character events
    this.game.time.events.loop(
      Phaser.Timer.SECOND,
      () => {
        let {charState} = getGameState();
        this.link.move(charState.charLocation);
      }
    );
  }
}