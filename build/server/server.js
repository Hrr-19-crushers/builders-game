"use strict";
const env = require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 1337;
const bodyParser = require('body-parser');
const path = require('path');
const layouts_1 = require('./layouts');
const game_1 = require('./game');
// --------------- New Game Instance -----------------
// ---------------------------------------------------
const game = new game_1.Game(layouts_1.overworld);
// ------------------ Middlewares --------------------
// ---------------------------------------------------
app.use(express.static(path.join(__dirname, '../../')));
app.use(bodyParser.json());
// ------------- Static Asset Routes -----------------
// ---------------------------------------------------
app.get('/', (req, res) => {
    res
        .status(200)
        .sendFile(path.join(__dirname + '/index.html'));
});
app.get('/gamestate', (req, res) => {
    const gameState = game.gameGetGameState();
    res
        .status(200)
        .json(JSON.stringify(gameState.gameLayout));
});
app.get('/maptester', (req, res) => {
    res
        .status(200)
        .sendFile(path.join(__dirname + '/../../maptester.html'));
});
// ----------------- Socket Stuff --------------------
// ---------------------------------------------------
io.on('connection', socket => {
    socket.emit('connection');
    socket.emit('clients', io.engine.clientsCount);
    socket.emit('gameState', game.gameGetGameState());
    // PLAYERS
    socket.on('newPlayer', (playerName, fn) => {
        game.gameCheckForExistingPlayer(playerName, (existance) => {
            if (existance) {
                fn(true);
            }
            else {
                fn(false);
                game.gameAddNewPlayer(socket.id, playerName);
                socket.broadcast.emit('newPlayer', playerName);
            }
        });
    });
    // MESSAGES
    socket.on('newMessage', data => {
        game.gameNewMessage(data.user, data.text, () => {
            socket.broadcast.emit('userMessage', data);
        });
    });
    socket.on('privateMessage', pm => {
        game.gameGetPlayerSocket(pm.target, socketid => {
            if (socketid) {
                io.to(socketid).emit('userMessage', pm.message);
            }
        });
    });
    // GAME
    socket.on('gameState', () => {
        const gameState = game.gameGetGameState();
        socket.emit('gameState', gameState);
    });
    socket.on('charState', () => {
        game.gameGetCharState((data) => {
            socket.emit('charState', data);
        });
    });
    socket.on('direction', direction => {
        // ok not to check for location value, cb won't get called if char can't move
        game.gameMoveChar(direction, (data) => {
            io.sockets.emit('move', data);
            // if there is a new turn, emit it as well
            // if (data.gameTurnActive) socket.emit('nextTurn', data.gameCurrentTurn);
        });
    });
    // STATS
    socket.on('authPlayer', profile => {
    });
    socket.on('disconnect', () => {
        //game.gameDeleteAllPlayers()
        game.gameDeletePlayer(socket.id, name => {
            console.log(`${name} has left the game`);
            socket.broadcast.emit('playerLeft', `${name} has left the game`);
        });
    });
});
// ---------------------------------------------------
http.listen(port, () => {
    console.log('This updated Web server listening on port', port);
});
//# sourceMappingURL=server.js.map