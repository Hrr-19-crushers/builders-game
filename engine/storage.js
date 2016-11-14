const env = require('dotenv').config();
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const redis = require('redis');
const storage = redis.createClient(redisUrl); // TODO need to connect via dyno and not via http
storage.clearStoragePw = process.env.CHAT_DELETE;
storage.on('connect', err => {
  if (err) console.log(`Error connecting to cache`, err);
  else console.log(`Successfully connected to cache`);
});

module.exports = storage;