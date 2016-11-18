import * as io from 'socket.io-client';

import { Action } from '../actions/actionInterface';
import store from '../store';
import { addChatAction } from '../actions/chatActions';
import {
  nextTurnAction,
  voteAction,
  outcomeAction
} from '../actions/gameActions';

// connect to server socket
const socket = io();

// TODO: broadcast message with user's name
socket.on('newPlayer', () => {
  console.log('a new player joined');
});

/*MESSAGES */
// when client receives message from server update the store
socket.on('userMessage', message => {
  store.dispatch(addChatAction(message));
});

socket.on('prompt', (data) => {
  console.log(data);
  if (data.question) {
    alert(data.question);
  };
});

export const chat2Server = message => {
  socket.emit('newMessage', message);
}

export const direction2Server = direction => {
  console.log(direction);
  socket.emit('direction', direction);
}

/*GAME*/
socket.on('move', location => {
  console.log('move', location);
  //TODO: do some action to get the location in the game
});

socket.on('vote', (choice: String) => {
  store.dispatch(voteAction(choice));
});

socket.on('nextTurn', ({prompt, choices}) => {
  store.dispatch(nextTurnAction(prompt, choices));
});

socket.on('outcome', (choice) => {
  store.dispatch(outcomeAction(choice));
});
