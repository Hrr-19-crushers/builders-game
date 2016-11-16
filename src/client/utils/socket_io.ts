import * as io from 'socket.io-client';

import store from '../store';
import { addChatAction } from '../actions/chatActions';

// connect to server socket
const socket = io();

// TODO: broadcast message with user's name
socket.on('new player joined', () => {
    console.log('a new player joined');
});

// when client receives message from server update the store
socket.on('userMessage', (message) => {
    store.dispatch(addChatAction(message));
});

// when player types in new message send to server
export const updateMessages = message => {
    socket.emit('newMessage', message);
};
