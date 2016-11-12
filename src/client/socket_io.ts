import * as io from 'socket.io-client';

// connect to server socket
const socket = io();

// this should be triggered in the function that sends the message 
export const postMessage = (message) => {
    socket.emit('newMessage', message);
};

socket.on('new player joined', () => {
    console.log('a new player joined');
});

socket.on('userMessage', (data) => {
    // an event handler for 'someEvent'
    socket.on('serverResponse', (data) => {
        console.log(data);
        // emits an event,'response', along with a some data
        socket.emit('response', data);
    });
});
export default socket;