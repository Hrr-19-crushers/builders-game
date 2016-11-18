import { combineReducers } from 'redux';

import { chatReducer } from './chatReducer';
import { gameState } from './gameReducer';
import {userState} from './userReducer';

export default combineReducers({
  chatReducer,
  gameState,
  userState
});