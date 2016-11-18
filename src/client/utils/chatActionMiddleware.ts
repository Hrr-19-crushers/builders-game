import {ADD_CHAT} from '../actions/actionTypes';

import {
  changeUserAction
} from '../actions/userActions';

export default store => next => action => {
  if (action.type === ADD_CHAT) {
  console.log(action);
  const actions = action
    .payload
    .text
    .match(/\\\S+/gi);
  const target = action
    .payload
    .text
    .split(actions[0])[1]
    .split(' ')[1];
  console.log('target', target)
  console.log(changeUserAction(target));
  store.dispatch(changeUserAction(target));
  }
  return next(action);
};