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
}

export interface GameState {
  charState: CharState;
  gameBoard?: BoardSquare[];
  collected: number;
  turn?: Turn;
  outcome?: String;
}

export const INITIAL_STATE : GameState = {
  charState: {
    charHealth: 100,
    charLocation: {
     x: 0,
     y: 4 
    },
    charName: 'Link'
  },
  collected: 0
};

export const gameState = (state : GameState = INITIAL_STATE, action : Action): GameState => {
  switch (action.type) {
    case NEXT_TURN:
      const votes = action
        .payload
        .choices
        .map(choice => ({name: choice, count: 0}));
      const turn = {
        prompt: action.payload.prompt,
        votes
      };
      return Object.assign({}, state, {turn});
    case VOTE:
      const voteChoice = [
        ...state
          .turn
          .votes
          .filter(choice => choice.name !== action.payload), {
            name: action.payload,
            count: state
              .turn
              .votes
              .filter(choice => choice.name === action.payload)[0]
            .count + 1
          }
        ]
        .sort(choice => choice.count)
        .reverse();
      const newTurn = Object.assign(state.turn, {votes: voteChoice});
      return Object.assign({}, state, newTurn);
    case OUTCOME:
      return Object.assign({}, state, {outcome: action.payload});
    case UPDATE_CHAR:
      return Object.assign({}, state, {charState: action.payload});
    case UPDATE_BOARD:
      return Object.assign({}, state, {gameBoard: action.payload});
    default:
      return state;
  }
};
