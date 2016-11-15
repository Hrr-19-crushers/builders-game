const env = require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 1337;
const bodyParser = require('body-parser');
const path = require('path');
const storage = require('./engine/storage.js');
const engine = require('./engine/game.js'); // TODO resolve wonky namespacing

// ------------------ Middlewares --------------------
// ---------------------------------------------------

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.json());

// ------------- Static Asset Routes -----------------
// ---------------------------------------------------

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname + '/public/index.html'));
});

// ------------------ API Routes ---------------------
// ---------------------------------------------------

app.get('/api/chat', (req, res) => {
  storage.lrange('messages', 0, -1, (err, data) => {
    err ? res.status(500).send(`Error fetching from storage`, err) : res.status(200).send(data);
  });
});

app.post('/api/chat', (req, res) => {
  const message = {
    msgId: Math.random() * 10000000000000000,
    userId: req.body.userId,
    timeStamp: new Date().getTime(),
    text: req.body.text
  };
  storage.lpush('messages', JSON.stringify(message), err => {
    err ? res.status(500).send(`Error saving message to storage`, err) : res.status(201).send(message);
  });
});

app.delete('/api/chat', (req, res) => {
  if (req.body.password === storage.clearStoragePw) {
    storage.del('messages', err => {
      err ? res.status(500).send(`Error clearning message storage`, err) : res.status(200).send('Chat storage su1cessfully cleared');
    });
  } else {
    res.status(401).send('Clear chat storage failed, incorrect password given');
  }
});

// ---------------------------------------------------

app.listen(port, () => {
  console.log('Web server listening on port', port);
});

const game = new engine.Game();