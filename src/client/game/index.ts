/// <reference path="../../../node_modules/phaser-shim/phaser-shim.comments.d.ts" />
 
import {Game, State} from 'phaser-shim';

class Boot extends State {
  constructor() {
    super();
  }

  init() {
    this.stage.backgroundColor = '#EDEEC9'
  }
}

class BuilderGame extends Game {
  constructor() {
    super(800, 600, Phaser.AUTO, 'game');
    this.state.add('Boot', Boot, false);

    this.state.start('Boot');
  }
}

window.onload = () => {
  const game = new BuilderGame();
}