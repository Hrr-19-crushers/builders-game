import * as io from 'socket.io';

// connect to server socket
const socket: any = io('http:localhost');
// an event handler for 'someEvent'
socket.on('serverResponse', (data) => {
  console.log(data);
  // emits an event,'response', along with a some data
  socket.emit('response', data);
});