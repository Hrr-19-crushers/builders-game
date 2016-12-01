/// <reference path="../../../type-declarations/Object.d.ts" />
import {Action} from '../actions/actionInterface';
import {NEXT_TURN, VOTE, OUTCOME, UPDATE_CHAR, UPDATE_BOARD} from '../actions/actionTypes';

export interface Choice {
  name : string;
  count : number;
}

export interface Turn {
  prompt : string;
  votes?: Choice[];
  choices?: string[];
  expiration?: Date;
}

export interface Location {
  x: number;
  y: number;
}

export interface BoardSquare {
  p: boolean;
  t: number;
}

export interface CharState {
  charHealth: number;
  charId?: number;
  charLocation: Location;
  charName: string;
  charTriForce: Boolean[];
}

export interface GameState {
  charState: CharState;
  gameBoard?: BoardSquare[];
}

export const INITIAL_STATE : GameState = {
  charState: {
    charHealth: 100,
    charLocation: {
     x: 39,
     y: 52 
    },
    charName: 'Link',
    charTriForce: []
  }
};

export const gameState = (state : GameState = INITIAL_STATE, action : Action): GameState => {
  switch (action.type) {
    case UPDATE_CHAR:
      return Object.assign({}, state, {charState: action.payload});
    case UPDATE_BOARD:
      return Object.assign({}, state, {gameBoard: action.payload});
    default:
      return state;
  }
};
