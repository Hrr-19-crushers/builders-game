const env = require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 1337;
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const bodyParser = require('body-parser');
const path = require('path');

// ------------------ Chat System --------------------
// ---------------------------------------------------

const redis = require('redis');
const cache = redis.createClient(redisUrl); // TODO need to connect via dyno and not via http
cache.on('connect', err => {
  if (err) console.log(`Error connecting to cache, ${err}`);
  else console.log(`Successfully connected to cache`);
});

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
  cache.lrange('messages', 0, -1, (err, data) => {
    err ? res.status(500).send(`Error fetching from cache, ${err}`) : res.status(200).send(data);
  });
});

app.post('/api/chat', (req, res) => {
  const message = {
    msgId: Math.random() * 10000000000000000,
    userId: req.body.userId,
    text: req.body.text
  };
  cache.lpush('messages', JSON.stringify(message), err => {
    err ? res.status(500).send(`Error saving message to cache, ${err}`) : res.status(201).send(message);
  });
});

app.delete('/api/chat', (req, res) => {
  cache.del('messages', err => {
    err ? res.status(500).send(`Error clearning message cache, ${err}`) : res.status(200).send('message cache successfully cleared');
  });
});

// ---------------------------------------------------

app.listen(port, () => {
  console.log('Web server listening on port', port);
});