const express = require('express');
const app = express();
const port = 1337;
const cache = require('redis').createClient(process.env.REDIS_URL);

app.listen(port, () => {
  console.log('Web server listening on port', port);
});