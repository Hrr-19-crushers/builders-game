// example

// const counter: number = 42;
// const isDone: boolean = false;
// const hello: string = 454; // should raise and error on compile

 import * as express from 'express';
 import * as http from 'http';
 import * as socket_io from 'socket.io';
// const express = require('express');
//const http = require('http');
// const sockt_io = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socket_io.listen(server);

app.use(express.static(__dirname + '../../build'));
server.listen(3000);
console.log('connected listening on port 3000');

app.get('/', (req, res) => res.sendFile('index'));
// when a client connects this fires
io.on('connection', (socket) => {
  socket.emit('serverResponse', 'hello new player');
});

