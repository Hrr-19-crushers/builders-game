/// <reference path="../../../type-declarations/Object.d.ts" />
import {Action} from '../actions/actionInterface';

import {NEXT_TURN, VOTE, OUTCOME, UPDATE_CHAR} from '../actions/actionTypes';

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

export interface CharState {
  charHealth: number;
  charId?: number;
  charLocation: number[];
  charName: string;
}

export interface GameState {
  charState: CharState;
  turnNumber : number;
  turn : Turn;
  outcome?: String;
  locations?: Array < any >;
}

export const INITIAL_STATE : GameState = {
  charState: {
    charHealth: 100,
    charLocation: [0,0],
    charName: 'Link'
  },
  turnNumber: 0,
  turn: {
    expiration: new Date(),
    prompt: 'Grab yerself a crab or a mushroom!?',
    votes: [
      {
        name: 'mushroom',
        count: 0
      }, {
        name: 'crab',
        count: 0
      }
    ]
  }
};

export const gameState = (state : GameState = INITIAL_STATE, action : Action) => {
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
      console.log('updated char state', Object.assign({}, state, {charState: action.payload}));
      return Object.assign({}, state, {charState: action.payload});
    default:
      return state;
  }
};
