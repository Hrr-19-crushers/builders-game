/// <reference path="../../../type-declarations/Object.d.ts" />
import { Action } from '../actions/actionInterface';

import { NEXT_TURN, VOTE, OUTCOME } from '../actions/actionTypes';

export interface Choice {
  name: String;
  count: number;
}

export interface Turn {
  expiration: Date;
  prompt: String;
  votes: Choice[];
}

export interface GameState {
  turnNumber: Number;
  outcome?: String;
  turn: Turn;
  locations?: Array<any>;
}

export const INITIAL_STATE: GameState = {
  turnNumber: 0,
  turn: {
    expiration: new Date(),
    prompt: 'Grab yerself a crab or a mushroom!?',
    votes: [
      {
        name: 'mushroom',
        count: 0
      },
      {
        name: 'crab',
        count: 0
      }
    ]
  }
};

export const gameState = (state: GameState = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case NEXT_TURN:
      const votes = action
        .payload
        .choices
        .map(choice => ({ name: choice, count: 0 }));
      const turn = {
        prompt: action.payload.prompt,
        votes
      };
      return Object.assign({}, state, { turn });
    case VOTE:
      const voteChoice = [
        ...state.turn.votes
          .filter(choice => choice.name !== action.payload),
        {
          name: action.payload,
          count: state.turn.votes
            .filter(choice => choice.name === action.payload)[0].count + 1
        }
      ]
        .sort(choice => choice.count)
        .reverse();
      const newTurn = Object.assign(state.turn, { votes: voteChoice });
      return Object.assign({}, state, newTurn);
    case OUTCOME:
      return Object.assign({}, state, { outcome: action.payload });
    default:
      return state;
  }
};
