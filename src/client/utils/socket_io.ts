import * as io from 'socket.io-client';

import store from '../store';
import { addChatAction } from '../actions/chatActions';

// connect to server socket
const socket = io();


// TODO: broadcast message with user's name
socket.on('newPlayer', () => {
    console.log('a new player joined');
});

// when client receives message from server update the store
socket.on('userMessage', (message) => {
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
