/// <reference path="../../../../type-declarations/index.d.ts" />
import * as Phaser from 'phaser';

import { setResponsiveWidth } from '../utils';
import { getGameState } from '../../store';

const enum TILE {
  WIDTH = 16,
  HEIGHT = 16
}

interface Coordinate {
  x: number; 
  y: number;
};

enum EventType { MOVE_TO, SCENE };

interface Event {
  type: EventType;
  callback: Function;
};

class EventQueue {
  private _queue: Event[];

  constructor(
    public game: Phaser.Game, 
    public survivor: Survivor,
    public entities?: any[]
  ) {}

  push(e: Event) { return this._queue.push(e); }
  pop() { return this._queue.pop(); }

  resolve() {
    let results = [];
    while (this._queue.length) { 
      results.push(
        this.pop().callback(
          this.game, this.survivor, this.entities
        )
      ); 
    }
    return results;
  }

  // In case of emergency
  flush() {
    while (this._queue.length > 0) { this.pop(); }
  }
 }

class Survivor extends Phaser.Sprite {
  gridPosition: Phaser.Point;
  moving: boolean;
  keys: Phaser.CursorKeys;

  constructor({game, x, y}) {
    super(game, x, y, 'link');
    this.keys = this.game.input.keyboard.createCursorKeys();
    this.moving = true;
    this.gridPosition = new Phaser.Point(this.x, this.y);
  }

  create() {
    this.animations.add('spin');
    this.animations.play('spin', 30, true);
  }

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

  move({x, y}: Coordinate) {
    this.gridPosition.x += x;
    this.gridPosition.y += y;
    this.game.add.tween(this).to({
        x: this.gridPosition.x, 
        y: this.gridPosition.y
      }, 
      250, 
      Phaser.Easing.Quadratic.Out, 
      true
    );
  }
}

export class GameState extends Phaser.State {
  upstreamState: any; // Todo: get this a type

  survivor: Survivor;
  
  keys: Phaser.CursorKeys;
  tilemap: Phaser.Tilemap;
  layer: Phaser.TilemapLayer;
  events: EventQueue;

  init () {
    // Get initial upstream state
    this.upstreamState = getGameState();
    // Init map
  }

  create () {
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

    this.survivor = new Survivor({
      game: this.game,
      x: this.game.world.centerX,
      y: this.game.world.centerY
    });
    this.game.add.existing(this.survivor);
    this.survivor.scale.setTo(0.05);    
  }

  render () {
    if (window['__DEV__']) {}
  }

  update () {
    this.upstreamState = getGameState();
    
    this.survivor.move(
      this.upstreamState.charLocation
    );
  };
}