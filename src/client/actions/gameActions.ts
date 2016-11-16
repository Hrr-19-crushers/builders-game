import Action from '.actionInterface';

import {
  Choice,
  Turn,
  GameState
} from '../reducers/gameReducer';

import {NEXT_TURN, VOTE} from './actionTypes';

export const nextTurnAction = (prompt: String, choices: String[]): Action => {
  return {
    type: NEXT_TURN,
    payload: {prompt, choices}
  };
};

export const voteAction = (choice: String): Action => {
 return {type: VOTE, payload: choice};
};