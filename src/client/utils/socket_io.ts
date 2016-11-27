import * as io from 'socket.io-client';

import { Action } from '../actions/actionInterface';
import store from '../store';
import { addChatAction, chatBotAction } from '../actions/chatActions';
import {
  nextTurnAction,
  voteAction, 
  outcomeAction,
  updateCharAction,
  updateBoardAction
} from '../actions/gameActions';
import {botWelcome} from './chatBot';

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

export const authPlayer2Server = profile => {
  socket.emit('authPlayer', profile);
}

/* INCOMING FROM SERVER */
socket.on('connection', () => {
  botWelcome();
});
// stats
socket.on('clients', num => {
  console.log('stats', num); // TODO: update stats on server
});

// messages
socket.on('newPlayer', name => {
  store.dispatch(chatBotAction(name + ' has just joined our party!'));
});

socket.on('userMessage', message => {
  store.dispatch(addChatAction(message));
});

// game
socket.on('gameState', gameState => {
  console.log('gameState', gameState);
  store.dispatch(updateBoardAction(gameState.gameLayout));
});

socket.on('move', charState => {
  store.dispatch(updateCharAction(charState));
});

socket.on('vote', (choice: String) => {
  store.dispatch(voteAction(choice));
});

// socket.on('nextTurn', (turn) => {
//   store.dispatch(nextTurnAction(turn));
// });

// socket.on('outcome', (choice) => {
//   store.dispatch(outcomeAction(choice));
// });

