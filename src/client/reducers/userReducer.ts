/// <reference path="../../../type-declarations/Object.d.ts" />
import {
  CHANGE_USER
} from '../actions/actionTypes';

import { Action } from '../actions/actionInterface';

export interface UserState {
  name?: String;
}

const INITIAL_STATE: UserState = {
  name: ''
};

export const userState = (state: UserState = INITIAL_STATE, action: Action): UserState => {
  switch (action.type) {
    case CHANGE_USER:
      console.log(Object.assign({}, state, { user: action.payload }))
      return Object.assign({}, state, { name: action.payload });
    default:
      return state;
  }
};