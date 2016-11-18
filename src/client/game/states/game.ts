/// <reference path="../../../../type-declarations/index.d.ts" />
import * as Phaser from 'phaser';

import { setResponsiveWidth } from '../utils';
import { getGameState } from '../../store';

class Survivor extends Phaser.Sprite {
  constructor({game, x, y}) {
    super(game, x, y, 'mario');
  }

  processKeys(key: KeyboardEvent) {
    
  }

  update() {
    super.update();
  }
}

export class GameState extends Phaser.State {
  survivor: Survivor;
  upstreamState: any;
  keys: Phaser.CursorKeys;
  keyboard: Phaser.Keyboard;

  init() {
    this.upstreamState = getGameState();

    this.keyboard = this.game.input.keyboard;
    this.keyboard.addKey(Phaser.KeyCode.DOWN);
    this.keyboard.addKey(Phaser.KeyCode.UP);
    this.keyboard.addKey(Phaser.KeyCode.LEFT);
    this.keyboard.addKey(Phaser.KeyCode.RIGHT);
  }

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    const banner = this.add.text(
      this.game.world.centerX,
      this.game.height - 30,
      'Phaser + ES6 + Webpack', {}
    );
    banner.font = 'Nunito';
    banner.fontSize = 40;
    banner.fill = '#77BFA3';
    banner.anchor.setTo(0.5);

    this.survivor = new Survivor({
      game: this.game,
      x: this.game.world.centerX,
      y: this.game.world.centerY
    });
    this.game.add.existing(this.survivor);
    this.survivor.scale.setTo(0.05);

    this.game.input.keyboard.onDownCallback = 
      this.survivor.processKeys.bind(this);
  }

  render() {
    if (window['__DEV__']) {
      // this.game.debug.spriteInfo(this.mario, 32, 32);
    }
  }

  update() {
    this.upstreamState = getGameState();

    const outcome = this.upstreamState.outcome;
    if (outcome) {
      
    }
  }
}