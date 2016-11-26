import {ADD_CHAT} from '../actions/actionTypes';
import {changeUserAction} from '../actions/userActions';
import {moveAction, voteAction} from '../actions/gameActions';
import {direction2Server, vote2Server, newPlayer2Server} from './socket_io';
import store, {getGameState} from '../store';

// TODO: move this middleware out of redux store into only the parseChat
export default (action, next) => {
  if (action.type === ADD_CHAT && action.payload.text[0] === '\\') {
    const verb = action
      .payload
      .text
      .match(/\\\S+/gi)[0]
      .slice(1);
    //FIXME: make parsing target less brittle
    const target = action
      .payload
      .text
      .split(' ')[1]

    // If there is a current turn, get choice values from store
    const choices = getGameState().turn 
      ? getGameState().turn.votes
        .map(vote => vote.name)
      : [];
      
    // POSSIBLE USER ACTIONS FROM COMMAND LINE
    //actions only accessable to logged in users
    
    if (verb === 'name' && store.getState()['authReducer'].isAuth) {
      store.dispatch(changeUserAction(target));
      newPlayer2Server(target);
    }
    if (['up', 'down', 'left', 'right'].indexOf(verb) > -1) {
      direction2Server(verb);
    }
    if (choices.indexOf(verb) > -1) {
      // send to server
      vote2Server(verb);
      store.dispatch(voteAction(verb));
    }
  }
  return next(action);
}