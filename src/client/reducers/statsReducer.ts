/// <reference path="../../../type-declarations/Object.d.ts" />
import {Action} from '../actions/actionInterface';
import {UPDATE_CLIENTS} from '../actions/actionTypes';

export interface Slice {
  date: number;
  clients: number;
}

export interface StatsState {
  clients: number;
  clientSlices: Slice[];
}

export const INITIAL_STATE: StatsState = {
  clients: 0,
  clientSlices: []
};

export const statsState = (state: StatsState = INITIAL_STATE, action: Action): StatsState => {
  switch (action.type) {
    case UPDATE_CLIENTS:
      return Object.assign({}, state, {
        clients: action.payload, 
        clientSlices: state.clientSlices.concat({date: Date.now(), clients: action.payload})
      });
    default:
      return state;
  }
};