import {ADD_CHAT} from '../actions/actionTypes';
import {changeUserAction} from '../actions/userActions';
import {moveAction, voteAction} from '../actions/gameActions';
import {chatBotAction, addChatAction} from '../actions/chatActions';
import {
  direction2Server, 
  vote2Server, 
  newPlayer2Server, 
  privateMessage2Server,
  chat2Server
} from './socket_io';
import store, {getGameState} from '../store';
import {botSup, botStats, botNotFound, botAdvise, botMessage} from './chatBot';

export default (action, next) => {

  if (action.type === ADD_CHAT && action.payload.text[0] === '\\') {
    const verb = action
      .payload
      .text
      .match(/\\\S+/gi)[0]
      .slice(1);
    const target = action
      .payload
      .text
      .split(' ')[1]
    const text = action
    .payload
    .text
    .split(' ')
    .slice(2)
    .join(' ')

    // POSSIBLE USER ACTIONS FROM COMMAND LINE
    if (verb === 'name') {
      newPlayer2Server(target, (isExists) => {
        if (isExists) {
          store.dispatch(chatBotAction('Sorry, that name is currently in use'))
        } else {
          store.dispatch(changeUserAction(target));
          botSup(target);
        }
      });
      return;
    }
    if (verb === 'w') {
      const pm = {
        message: {
          text: text,
          user: store.getState()['userState'].name || 'Guest' ,
          date: JSON.stringify(new Date())
         },
        target: target
      }
      privateMessage2Server(pm);
      return next(addChatAction(pm.message));
    }
    if (['up', 'down', 'left', 'right'].indexOf(verb) > -1) {
      chat2Server(action.payload);
      direction2Server(verb);
      return next(action);
    }
    if (verb === 'stats') {
      return botStats();
    }
    if (verb === 'help') {
      return botAdvise();
    }
    return botNotFound(verb);
  }
  chat2Server(action.payload);
  return next(action);
}