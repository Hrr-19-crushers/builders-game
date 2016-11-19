import { should, expect, assert } from 'chai';
import { Location, Tile } from '../../src/server/interfaces';
import { testLayout } from '../../src/server/layouts';
import { Board } from '../../src/server/board';

describe('a game board', () => {

  const board = new Board(testLayout);
  let layout;

  it('should have a boardGetLayout method', () => {
    board.should.have.property('boardGetLayout');
  });

  it('should have a default layout of dimensions 5 x 5', () => {
    layout = board.boardGetLayout();
    layout.should.have.length(5);
    layout[0].should.have.length(5);
  });
  
  it('should initialize with a default layout', () => {
    board.boardGetLayout().should.be.a('array');
  });

  it('should have a boardCharCanMoveDirection method', () => {
    board.should.have.property('boardCharCanMoveDirection');
  });

  it('should not allow movement outside the board', () => {
    board.boardCharCanMoveDirection('up', {x:4, y:0}).should.equal(false);
    board.boardCharCanMoveDirection('right', {x:4, y:4}).should.equal(false);
    board.boardCharCanMoveDirection('down', {x:0, y:4}).should.equal(false);
    board.boardCharCanMoveDirection('left', {x:0, y:0}).should.equal(false);
  });

  it('should not allow movement into impassible tiles', () => {
    board.boardCharCanMoveDirection('up', {x:1, y:4}).should.equal(false);
    board.boardCharCanMoveDirection('right', {x:2, y:4}).should.equal(false);
    board.boardCharCanMoveDirection('down', {x:3, y:0}).should.equal(false);
    board.boardCharCanMoveDirection('left', {x:1, y:1}).should.equal(false);
  });

  it('should have a boardGetNewCharLocation method', () => {
    board.should.have.property('boardGetNewCharLocation');
  });

  it('should allow movement into passable tiles', () => {
    board.boardGetNewCharLocation('up', {x:0, y: 4}).should.have.property('x').equal(0);
    board.boardGetNewCharLocation('up', {x:0, y: 4}).should.have.property('y').equal(3);
    board.boardGetNewCharLocation('right', {x:2, y: 3}).should.have.property('x').equal(3);
    board.boardGetNewCharLocation('right', {x:2, y: 3}).should.have.property('y').equal(3);
    board.boardGetNewCharLocation('down', {x:4, y: 0}).should.have.property('x').equal(4);
    board.boardGetNewCharLocation('down', {x:4, y: 0}).should.have.property('y').equal(1);
    board.boardGetNewCharLocation('left', {x:3, y: 2}).should.have.property('x').equal(2);
    board.boardGetNewCharLocation('left', {x:3, y: 2}).should.have.property('y').equal(2);
  });

});
