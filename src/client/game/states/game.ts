import * as Phaser from 'phaser';
import { setResponsiveWidth } from '../utils';
import { getGameState } from '../../store';

class Entity extends Phaser.Sprite {
  constructor({game, x, y, asset}) {
    super(game, x, y, asset);
  }
}

export class GameState extends Phaser.State {
  mario: Phaser.Sprite;
  targets: Phaser.Group;
  storeState: Object;

  init() {
    this.targets = this.game.add.group();
    this.targets.enableBody = true;
    this.game.input.onDown.add(this.addEntity.bind(this));
    this.storeState = getGameState();
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

    this.mario = this.game.add.sprite(
      this.game.world.centerX,
      this.game.world.centerY,
      'mario'
    );
    this.mario.scale.setTo(0.05);
    this.game.physics.arcade.enable(this.mario);
    
    this.targets.create(
      this.game.world.centerX + 80,
      this.game.world.centerY - 80,
      'mushroom'
    );

    this.targets.create(
      this.game.world.centerX + 80,
      this.game.world.centerY + 80,
      'crab'
    );
  }

  render() {
    if (window['__DEV__']) {
      // this.game.debug.spriteInfo(this.mario, 32, 32);
    }
  }

  update() {

    this.storeState = getGameState();

    this.game.physics.arcade.collide(
      this.mario, 
      this.targets,
      (mario, mush) => mush.kill(),
      null, this
    );

    /*
    if (this.targets.countLiving() > 0) {
      this.game.physics.arcade.moveToObject(
        this.mario,
        this.targets.getFirstAlive(false),
        500, 0
      );
    }
    */
  }

  addEntity() {
    /*
    const game = this.game;
    this.targets.push(new Entity({
      game: this.game,
      x: this.game.input.x,
      y: this.game.input.y,
      asset: 'mushroom'
    }));
    const shroom = this.targets[this.targets.length - 1];
    game.add.existing(shroom);
    game.physics.enable(shroom, Phaser.Physics.ARCADE);
    game.physics.arcade.collide(shroom);
    */
    // this.targets.create(
    //   this.game.input.x,
    //   this.game.input.y,
    //   'mushroom'
    // );
  }
}