import * as io from 'socket.io-client';

import { Action } from '../actions/actionInterface';
import store, {getGameState} from '../store';
import { addChatAction, chatBotAction } from '../actions/chatActions';
import {
  nextTurnAction,
  voteAction, 
  outcomeAction,
  updateCharAction,
  updateBoardAction
} from '../actions/gameActions';
import {updateClientsAction} from '../actions/statsActions';
import {botWelcome} from './chatBot';
import {runGame} from '../game/index';

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

export const newPlayer2Server = (name:string, cb?: any) => {
  socket.emit('newPlayer', name, (data) => {
    cb(data);
  });
}

export const authPlayer2Server = profile => {
  socket.emit('authPlayer', profile);
}

export const privateMessage2Server = (message: any) => {
  socket.emit('privateMessage', message)
}

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

// game
socket.on('gameState', gameState => {
  const initialLoad = !!getGameState().gameBoard;
  store.dispatch(updateBoardAction(gameState.gameLayout));
  if (!initialLoad) {
    runGame();
  }
});

socket.on('move', charState => {
  console.log(charState.charLocation);
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

