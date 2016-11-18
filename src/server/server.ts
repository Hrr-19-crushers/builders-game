const env = require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 1337;
const bodyParser = require('body-parser');
const path = require('path');

import { Game } from './game';

// --------------- New Game Instance -----------------
// ---------------------------------------------------

const game = new Game();

// ------------------ Middlewares --------------------
// ---------------------------------------------------

app.use(express.static(path.join(__dirname, '../../')));

app.use(bodyParser.json());

// ------------- Static Asset Routes -----------------
// ---------------------------------------------------

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname + '/index.html'));
});

// ----------------- Socket Stuff --------------------
// ---------------------------------------------------

io.on('connection', socket => { // TODO try to move this to engine

  socket.on('newPlayer', playerName => {
    const player = game.gameAddNewPlayer(); // TODO add back in playerName once it's passed u p
    // socket['playerName'] = player.playerName;
  });

  socket.on('newMessage', data => {
    game.gameNewMessage(data.user, data.text, () => {
      socket.broadcast.emit('userMessage', data);
    });
  });

  socket.on('direction', data => {
    console.log('direction', data);
    game.gameCharacter.charMove(data, (location: Location) => {
      socket.emit('move', location);
    });
  });

  socket.on('disconnect', () => {
    // const playerName = socket['playerName'] || 'anonymous player';
    // game.gameDeletePlayer(); // TODO nothing behind this yet
    socket.broadcast.emit('playerLeft', `Guest has left the game`);
  });
});

// ---------------------------------------------------

http.listen(port, () => {
  console.log('Web server listening on port', port);
});