import * as io from 'socket.io-client';

// connect to server socket
const socket = io();

// this should be triggered in the function that sends the message 
export const onClick = (message) => {
    socket.emit('newMessage', message);
};

socket.on('new player joined', () => {
    console.log('a new player joined');
});

socket.on('userMessage', (data) => {
    console.log(data);
});

export default socket;