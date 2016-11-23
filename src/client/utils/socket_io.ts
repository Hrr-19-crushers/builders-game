import * as io from 'socket.io-client';

import { Action } from '../actions/actionInterface';
import store from '../store';
import { addChatAction, chatBotAction } from '../actions/chatActions';
import {
  nextTurnAction,
  voteAction, 
  outcomeAction,
  updateCharAction
} from '../actions/gameActions';

// connect to server socket
const socket = io();

/*OUTGOING TO SERVER */
export const chat2Server = message => {
  socket.emit('newMessage', message);
}

export const direction2Server = direction => {
  socket.emit('direction', direction);
}

export const vote2Server = (choice: string) => {
  socket.emit('vote', choice);
} 

export const newPlayer2Server = (name:string) => {
  socket.emit('newPlayer', name);
}

/* INCOMING FROM SERVER */
socket.on('newPlayer', name => {
  store.dispatch(chatBotAction(name + ' just joined the game!'));
});

/*MESSAGES */
socket.on('userMessage', message => {
  store.dispatch(addChatAction(message));
});

/*GAME*/
socket.on('move', charState => {
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

//______________ auth0 helpers _____________________________________

