import { combineReducers } from 'redux';

import { chatReducer } from './chatReducer';
import { gameState } from './gameReducer';
import { authReducer} from './authReducer'
export default combineReducers({
  chatReducer,
  gameState,
  authReducer
});