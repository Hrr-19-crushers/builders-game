import { combineReducers } from 'redux';

import { chatReducer } from './chatReducer';
import { gameState } from './gameReducer';
import {statsState} from './statsReducer';
import {userState} from './userReducer';
import { authReducer} from './authReducer';

export default combineReducers({
  chatReducer,
  gameState,
  userState,
  authReducer,
  statsState
});