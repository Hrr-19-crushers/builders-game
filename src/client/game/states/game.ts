import * as Phaser from 'phaser';
import {setResponsiveWidth} from '../utils.ts';

class Entity extends Phaser.Sprite {
  target: Phaser.Point;

  constructor({game, x, y, asset}) {
    super(game, x, y, asset);
  }
}

export class GameState extends Phaser.State {
  mario: Entity;
  mushrooms: Entity[];

  init() {
    this.mushrooms = [];
    this.game.input.onDown.add(this.addEntity.bind(this));
  }

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    const banner = this.add.text(
      this.game.world.centerX, 
      this.game.height - 30, 
      'Phaser + ES6 + Webpack', 
      {}
    );
    banner.font = 'Nunito';
    banner.fontSize = 40;
    banner.fill = '#77BFA3';
    banner.anchor.setTo(0.5);

    this.mario = new Entity({
      game: this.game,
      x: this.game.world.centerX,
      y: this.game.world.centerY,
      asset: 'mario'
    });
    this.mario.scale.setTo(0.05);
    this.game.physics.enable(this.mario, Phaser.Physics.ARCADE);


    this.game.add.existing(this.mario);
  }

  render() {
    if (window['__DEV__']) {
      this.game.debug.spriteInfo(this.mario, 32, 32);
    }
  }

  update() {
    if (this.mushrooms.length) {
      this.game.physics.arcade.moveToObject(
        this.mario, this.mushrooms[0],
        500, 500
      );
    }
  }

  addEntity() {
    this.mushrooms.push(new Entity({
      game: this.game,
      x: this.game.input.x,
      y: this.game.input.y,
      asset: 'mushroom'
    }));
    this.game.add.existing(
      this.mushrooms[this.mushrooms.length - 1]
    );
  }
}