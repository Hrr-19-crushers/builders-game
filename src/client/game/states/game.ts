import * as Phaser from 'phaser';

import { setResponsiveWidth } from '../utils';
import { getGameState } from '../../store';

const newNodeID = (() => {
  let id = 0;

  return () => id++;
})();

enum SurvivorActions {
  MOVE_TO,
  GRAB,
  ATTACK,
  RETREAT,
  CONSUME,
  HIDE
};

enum AIStates {
  PATROL,
  PACE,
  CHASE
};

enum EntityTypes {
  SURVIVOR,
  INANIMATE,
  WILDLIFE 
};


interface NodeParams {
  x: number;
  y: number;
}

class GraphNode extends Phaser.Point {
  id: number;
  neighbors: [GraphNode];
  
  constructor({x, y}: NodeParams) { 
    super(x, y); 
    this.id = newNodeID();
  }

  addNeighbor(node: GraphNode) {
    return this.neighbors.push(node);
  }

  removeNeighborAtIndex(index: number) {
    return this.neighbors.splice(index, 1);
  }

  isNeighbor(foreignNode: GraphNode) {}
};


export class GameState extends Phaser.State {
  mario: Phaser.Sprite;
  targets: Phaser.Group;
  storeState: any;

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
      (mario, target) => target.kill(),
      null, this
    );

    const outcome = this.storeState.outcome;
    if (outcome) {
      if (outcome === 'mushroom'){
        this.game.physics.arcade.moveToObject(
          this.mario, this.targets.getAt(0)
        );
      } else {
        this.game.physics.arcade.moveToObject(
          this.mario, this.targets.getAt(1)
        );
      }
    }

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
    // this.targets.create(
    //   this.game.input.x,
    //   this.game.input.y,
    //   'mushroom'
    // );
  }
}