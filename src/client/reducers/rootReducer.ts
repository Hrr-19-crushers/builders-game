import { combineReducers } from 'redux';

import { chatReducer } from './chatReducer';
import { gameState } from './gameReducer';

export default combineReducers({
  chatReducer,
  gameState
});