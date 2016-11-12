import * as io from 'socket.io-client';

// connect to server socket
const socket: any = io.connect('http:localhost:3000');

// this should be triggered in the function that sends the message 
export const onClick = (message) => {
    socket.emit('newMessage', message);
};

socket.on('userMessage', (data) => {
    // display data onto the dom 

    // an event handler for 'someEvent'
    socket.on('serverResponse', (data) => {
        console.log(data);
        // emits an event,'response', along with a some data
        socket.emit('response', data);
    });
});
export default socket;