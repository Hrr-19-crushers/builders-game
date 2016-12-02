import * as io from 'socket.io-client';

import store, {getGameState} from '../store';
import { addChatAction, chatBotAction } from '../actions/chatActions';
import {
  voteAction,
  updateCharAction,
  updateBoardAction,
} from '../actions/gameActions';
import {updateClientsAction} from '../actions/statsActions';
import {botWelcome} from './chatBot';
import {runGame} from '../game/index';

const socket = io();

/*OUTGOING TO SERVER */
export const chat2Server = (message): void => {
  socket.emit('newMessage', message);
};

export const direction2Server = (direction: string): void => {
  socket.emit('direction', direction);
};

export const vote2Server = (choice: string): void => {
  socket.emit('vote', choice);
};

export const newPlayer2Server = (name: string, cb?: any): void => {
  socket.emit('newPlayer', name, (data) => {
    cb(data);
  });
};

export const authPlayer2Server = profile => {
  socket.emit('authPlayer', profile);
};

export const privateMessage2Server = (message: any) => {
  socket.emit('privateMessage', message);
};

/* INCOMING FROM SERVER */
socket.on('connection', () => {
  botWelcome();
});

// stats
socket.on('clients', num => {
  store.dispatch(updateClientsAction(num));
});

// messages
socket.on('newPlayer', name => {
  store.dispatch(chatBotAction(name + ' has just joined our party!'));
});

socket.on('userMessage', message => {
  store.dispatch(addChatAction(message));
});

socket.on('playerLeft', message => {
  store.dispatch(chatBotAction(message));
});

// game
socket.on('gameState', gameState => {
  const initialLoad = !!getGameState().gameBoard;
  store.dispatch(updateBoardAction(gameState.gameLayout));
  store.dispatch(updateCharAction(gameState.gameCharacter));
  if (!initialLoad) {
    runGame();
  }
});

socket.on('move', charState => {
  store.dispatch(updateCharAction(charState));
});

socket.on('vote', (choice: String) => {
  store.dispatch(voteAction(choice));
});
