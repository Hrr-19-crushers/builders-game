// import { f } from 'fs';
import { should, expect, assert } from 'chai';
import { Location, Tile, CharacterState } from '../../src/server/interfaces';
import { testLayout } from '../../src/server/layouts';
import { Board } from '../../src/server/board';
import { Game } from '../../src/server/game';

describe('a game class instance', () => {

  // let game = new Game(testLayout);
  // game.gameSetCharInitialPosition({x: 0, y:4});

  // // //====== Character Methods ========
  
  // it('should change the character\'s location after valid move commands are entered', () => {
  //   game.gameMoveChar('up');
  //   game.gameMoveChar('up');
  //   game.gameMoveChar('right');
  //   let charState : CharacterState = game.gameGetCharState();
  //   charState.charLocation.should.have.property('x').equal(2);
  //   charState.charLocation.should.have.property('y').equal(1);
  // });

});
