/// <reference path="../../../../type-declarations/index.d.ts" />
import * as Phaser from 'phaser';

import { setResponsiveWidth } from '../utils';
import { getGameState } from '../../store';

const enum TILE {
  WIDTH = 16,
  HEIGHT = 16
}

interface Location {
  x: number; 
  y: number;
};

// interface Event {
//   type: EventType;
//   callback: Function;
// };

// class EventQueue {
//   private _queue: Event[];

//   constructor(
//     public game: Phaser.Game, 
//     public survivor: Survivor,
//     public entities?: any[]
//   ) {}

//   push(e: Event) { return this._queue.push(e); }
//   pop() { return this._queue.pop(); }

//   resolve() {
//     let results = [];
//     while (this._queue.length) { 
//       results.push(
//         this.pop().callback(
//           this.game, this.survivor, this.entities
//         )
//       ); 
//     }
//     return results;
//   }

//   // In case of emergency
//   flush() {
//     while (this._queue.length > 0) { this.pop(); }
//   }
// }

class Survivor extends Phaser.Sprite {
  gridPosition: Phaser.Point;
  moving: boolean;
  keys: Phaser.CursorKeys;

  constructor(game: Phaser.Game, {x, y}: Location) {
    super(
      game, 
      x * TILE.WIDTH, 
      y * TILE.HEIGHT,
      'link'
    );
    this.keys = this.game.input.keyboard.createCursorKeys();
    this.moving = true;
    this.gridPosition = new Phaser.Point(x, y);
  }

  create() {}

  update() {
    const {
      up, down, left, right
    } = this.keys;

    // if (up.justDown) { 
    //   this.move({x: 0, y: -TILE.HEIGHT});
    // } else if (left.justDown) {
    //   this.move({x: -TILE.WIDTH, y: 0});
    // } else if (right.justDown) {
    //   this.move({x: TILE.WIDTH, y: 0});
    // } else if (down.justDown) {
    //   this.move({x: 0, y: TILE.HEIGHT});
    // }  
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
  upstreamState: any; // Todo: get this a type

  survivor: Survivor;
  
  keys: Phaser.CursorKeys;
  tilemap: Phaser.Tilemap;
  layer: Phaser.TilemapLayer;

  pollForState() {
    this.upstreamState = getGameState();
  }

  init () {
    // Get initial upstream state
    
    // Init map
  }

  create () {
    this.pollForState();

    this.game.physics.startSystem(
      Phaser.Physics.ARCADE
    );

    const banner = this.add.text(
      this.game.world.centerX,
      this.game.height - 30,
      'Phaser + ES6 + Webpack', {}
    );
    banner.font = 'Nunito';
    banner.fontSize = 40;
    banner.fill = '#77BFA3';
    banner.anchor.setTo(0.5);

    this.tilemap = this.game.add.tilemap(
      'zeldamap', TILE.WIDTH, TILE.HEIGHT);
    this.tilemap.addTilesetImage('zeldatiles');
    this.layer = this.tilemap.createLayer(0); 
    // this.tilemap.setCollision();

    this.layer.resizeWorld();

    this.survivor = new Survivor(
      this.game,
      this.upstreamState.charState.charLocation
    );

    this.game.add.existing(this.survivor);
  }

  render () {

  }

  update () {
    this.pollForState();

    const charState = this.upstreamState.charState;

    this.survivor.move(charState.charLocation);
  };
}