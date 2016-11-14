import { chatReducer } from './chatReducer';

import { combineReducers } from 'redux';

export default combineReducers({
  chatState: chatReducer
});