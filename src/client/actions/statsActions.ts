import {Action} from './actionInterface';
import {UPDATE_CLIENTS} from './actionTypes';

export const updateClientsAction = (num: number): Action => ({
  type: UPDATE_CLIENTS,
  payload: num
});