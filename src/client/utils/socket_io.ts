import * as io from 'socket.io-client';

import {Action} from '../actions/actionInterface';
import store from '../store';
import { addChatAction } from '../actions/chatActions';
import {
    nextTurnAction,
    voteAction
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

export const updateMessages = message => {
    socket.emit('newMessage', message);
};

/*GAME*/
socket.on('vote', (choice: String) => {
    store.dispatch(voteAction(choice));
});

socket.on('nextTurn', (prompt: String, choices: String[]) => {
    store.dispatch(nextTurnAction(prompt, choices));
});
