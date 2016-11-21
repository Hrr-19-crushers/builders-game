import * as io from 'socket.io-client';

import { Action } from '../actions/actionInterface';
import store from '../store';
import { addChatAction } from '../actions/chatActions';
import {
  nextTurnAction,
  voteAction,
  outcomeAction,
  updateCharAction
} from '../actions/gameActions';

const socket = io();

/*OUTGOING TO SERVER */
export const chat2Server = message => {
  socket.emit('newMessage', message);
}

export const direction2Server = direction => {
  socket.emit('direction', direction);
}

export const vote2Server = (choice: string) => {
  socket.emit('vote', string);
} 

/* INCOMING FROM SERVER */
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

/*INCOMING FROM SERVER - GAME*/
socket.on('move', charState => {
  console.log('move', charState);
  store.dispatch(updateCharAction(charState));
});

socket.on('vote', (choice: String) => {
  store.dispatch(voteAction(choice));
});

socket.on('nextTurn', (turn) => {
  store.dispatch(nextTurnAction(turn));
});

socket.on('outcome', (choice) => {
  store.dispatch(outcomeAction(choice));
});
