import * as io from 'socket.io-client';

import store from '../store';
import { addChatAction } from '../actions/chatActions';

// connect to server socket
const socket = io();

socket.on('new player joined', () => {
    console.log('a new player joined');
});

socket.on('userMessage', (message) => {
    store.dispatch(addChatAction(message));
});

export const updateMessages = message => {
    socket.emit('newMessage', message);
};
