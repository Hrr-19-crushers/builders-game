/// <reference path="../../../type-declarations/Object.d.ts" />
import {Action} from '../actions/actionInterface';
import {UPDATE_CLIENTS} from '../actions/actionTypes';

export interface StatsState {
  clients: number;
}

export const INITIAL_STATE: StatsState = {
  clients: 0
};

export const statsState = (state: StatsState = INITIAL_STATE, action: Action): StatsState => {
  switch (action.type) {
    case UPDATE_CLIENTS:
      return Object.assign({}, state, {clients: action.payload}) ;
    default:
      return state;
  }
};