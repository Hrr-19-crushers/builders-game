import * as io from 'socket.io';

// connect to server socket
const socket: any = io('http:localhost');

// this should be triggered in the function that sends the message 
export const onClick = (message) =>{
  socket.emit('newMessage', message);
};


//
socket.on('userMessage', (data) => {
  // display data onto the dom 
});