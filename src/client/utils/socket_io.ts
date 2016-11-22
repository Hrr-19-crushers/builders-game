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
// TODO: broadcast message with user's name
socket.on('newPlayer', name => {
  console.log('new player', name);
  store.dispatch(chatBotAction(name + ' just joined the game!'));
});

/*MESSAGES */
// when client receives message from server update the store
socket.on('userMessage', message => {
  store.dispatch(addChatAction(message));
});

/*INCOMING FROM SERVER - GAME*/
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
