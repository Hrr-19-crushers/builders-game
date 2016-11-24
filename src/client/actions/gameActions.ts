import {Action} from './actionInterface';

import {Choice, Turn, GameState, BoardSquare} from '../reducers/gameReducer';

import {NEXT_TURN, VOTE, OUTCOME, MOVE, UPDATE_CHAR, UPDATE_BOARD} from './actionTypes';

export const nextTurnAction = (turn) : Action => {
  return {
    type: NEXT_TURN,
    payload: turn
  };
};

export const voteAction = (choice : String) : Action => {
  return {type: VOTE, payload: choice};
};

export const outcomeAction = (choice : String) : Action => {
  return {type: OUTCOME, payload: choice};
}

export const moveAction = (direction : String) : Action => {
  return {type: MOVE, payload: direction};
}

export const updateCharAction = (charState) : Action => ({
  type: UPDATE_CHAR,
  payload: charState
});

export const updateBoardAction = (gameBoard: BoardSquare[]): Action => ({
  type: UPDATE_BOARD,
  payload: gameBoard
});

