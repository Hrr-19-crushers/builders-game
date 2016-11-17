const env = require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 1337;
const bodyParser = require('body-parser');
const path = require('path');
const storage = require('./engine/storage.js');
const engine = require('./engine/engine.js'); // TODO resolve wonky namespacing

// --------------- New Game Instance -----------------
// ---------------------------------------------------

const game = new engine.Game();

// ------------------ Middlewares --------------------
// ---------------------------------------------------

// app.use(express.static(`${__dirname}/public`));

app.use(express.static(path.join(__dirname, '/')));

app.use(bodyParser.json());

// ------------- Static Asset Routes -----------------
// ---------------------------------------------------

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname + '/index.html'));
});

// ------------------ Chat Routes --------------------
// ---------------------------------------------------

// app.get('/api/chat', (req, res) => {
//   storage.lrange('messages', 0, -1, (err, data) => {
//     err ? res.status(500).send(`Error fetching from storage`, err) : res.status(200).send(data);
//   });
// });

// app.post('/api/chat', (req, res) => {
//   const message = new engine.Message(null, req.body.userId, req.body.text);
//   game.gameStoreVote(message.userId, message.text);
//   storage.lpush('messages', JSON.stringify(message), err => {
//     err ? res.status(500).send(`Error saving message to storage`, err) : res.status(201).send(message);
//   });
// });

// app.delete('/api/chat', (req, res) => {
//   if (req.body.password === storage.clearStoragePw) {
//     storage.del('messages', err => {
//       err ? res.status(500).send(`Error clearning message storage`, err) : res.status(200).send('Chat storage successfully cleared');
//     });
//   } else {
//     res.status(401).send('Clear chat storage failed, incorrect password given');
//   }
// });

// ----------------- Socket Stuff --------------------
// ---------------------------------------------------

io.on('connection', socket => { // TODO try to move this to engine

  socket.on('newPlayer', playerName => {
    const player = game.gameAddNewPlayer(); // TODO add back in playerName once it's passed up
    // socket['playerName'] = player.playerName;
  });

  socket.on('newMessage', data => {
    console.log(data);
    game.gameNewMessage(data.user, data.text);
    socket.broadcast.emit('userMessage', data);
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