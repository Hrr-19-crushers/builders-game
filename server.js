const env = require('dotenv').config();
const express = require('express');
const app = express();
const port = 1337;
const bodyParser = require('body-parser');
const path = require('path');

// ------------------ Chat System --------------------
// ---------------------------------------------------

const redis = require('redis'); // TODO set up dev and prod env's
const cache = redis.createClient(process.env.REDIS_URL); // TODO need to connect via dyno and not via http
// const engine = require('./engine/engine.js'); // TODO this path needs to be replaced with the final dest of TS compiled assets
// const store = redis.createClient();   
// const pub = redis.createClient();
// const sub = redis.createClient();
cache.on('connect', err => {
  if (err) console.log(`Error connecting to cache, ${err}`);
  else console.log(`Successfully connected to cache`);
  cache.del('messages', err => { // clear out any existing data; TODO remove this once prod
    if (!err) cache.rpush('messages', 'jimmy'); // initialize chat
  }); 
});

// ------------------ Middlewares --------------------
// ---------------------------------------------------

app.use(express.static('web'));

app.use(bodyParser.json());

// ------------- Static Asset Routes -----------------
// ---------------------------------------------------

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname + '/public/index.html'));
});

// app.get('/about', (req, res) => {
//   res.status(200).sendFile(path.join(__dirname + '/web/public/about.html'));
// });

// app.get('/css/styles', (req, res) => {
//   res.sendFile(path.join(__dirname + '/web/public/css/styles.css'));
// });

// app.get('/js/vendor', (req, res) => {
//   res.sendFile(path.join(__dirname + '/web/public/js/vendor.min.js'));
// });

// app.get('/js/scripts', (req, res) => {
//   res.sendFile(path.join(__dirname + '/web/public/js/scripts.min.js'));
// });

// ------------------ API Routes ---------------------
// ---------------------------------------------------

app.get('/api/chat', (req, res) => {
  cache.get('messages', (err, data) => {
    err ? res.status(500).send(`Error fetching from cache, ${err}`) : res.status(200).send(data);
  });
});

app.post('/api/chat', (req, res) => {
  const message = JSON.stringify(req.body);
  cache.rpush('messages', message, err => {
    err ? res.status(500).send(`Error saving message to cache, ${err}`) : res.status(201).send(message);
  });
});

// ---------------------------------------------------

app.listen(port, () => {
  console.log('Web server listening on port', port);
});