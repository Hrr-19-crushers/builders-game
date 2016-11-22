import {
  CHANGE_USER,
} from './actionTypes';

import { UserState } from '../reducers/userReducer';

import { Action } from './actionInterface';

export const changeUserAction = name => ({type: CHANGE_USER, payload: name});