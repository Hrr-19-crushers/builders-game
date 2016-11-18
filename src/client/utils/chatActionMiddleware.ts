import { ADD_CHAT } from '../actions/actionTypes';
import {
  changeUserAction
} from '../actions/userActions';
import {
  moveAction
} from '../actions/gameActions';

export default store => next => action => {
    console.log('middleware', store, action.payload.text)
    if (action.type === ADD_CHAT && action.payload.text[0] === '\\') {
    const verb = action.payload.text
      .match(/\\\S+/gi)[0].slice(1);
    //FIXME: make parsing target less brittle
   const target = action.payload.text.split(' ')[1]

    // POSSIBLE USER ACTIONS FROM COMMAND LINE
    if (verb === 'name') {
      store.dispatch(changeUserAction(target));
    }
    if (['up', 'down', 'left', 'right'].indexOf(action) > -1) {
      store.dispatch(moveAction(verb));
    }
  }
  return next(action);
}