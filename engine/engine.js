"use strict";
const env = require('dotenv').config();
const redis = require('redis');
const redisConnect = process.env.REDIS_URL || 'redis://localhost:6379';
const storage = redis.createClient(redisConnect);
storage.clearStoragePw = process.env.CHAT_DELETE;
storage.on('connect', (err) => {
    if (err)
        console.log(`Error connecting to storage`, err);
    else
        console.log(`Successfully connected to storage`);
});
class Message {
    constructor(userId = 10000000000000000, userName = 'Guest', text) {
        this.msgId = Math.random() * 10000000000000000;
        this.userId = userId;
        this.timeStamp = new Date().getTime();
        this.text = text;
    }
}
exports.Message = Message;
class Chat {
}
exports.Chat = Chat;
class Character {
    constructor(charId = 1, charName = 'Jimmy', charLocation, charHealth = 100) {
        this.charId = charId;
        this.charName = charName;
        this.charLocation = charLocation;
        this.charHealth = charHealth;
    }
    charMove(location) {
    }
}
class Player {
    constructor(playerName = 'Anonymous') {
        this.playerName = playerName;
    }
}
exports.Player = Player;
class Turn {
    constructor(turnId, turnType) {
        this.turnId = turnId;
        this.turnType = turnType;
        this.turnPhrases = phrases[this.turnType];
    }
    turnEmitPromptToClients() {
    }
    turnStoreVotes(vote) {
        storage.lpush(this.turnId, vote);
    }
    turnFetchResponses() {
        storage.lrange(this.turnId, 0, -1, (err, data) => {
            if (err)
                console.log(`Error retrieving ${this.turnId} responses from storage`, err);
            else
                this.turnResponses = data;
        });
    }
    turnTallyVotes() {
    }
    turnSave() {
    }
    turnDelResponses() {
        storage.del(this.turnId, (err) => {
            if (err)
                console.log(`Error deleting responses for ${this.turnId}`);
        });
    }
}
const phrases = require('./phrases.js');
class Game {
    constructor() {
        this.gameCharacter = new Character(null, null, { x: 0, y: 0 }, null);
        this.gameTurnActive = false;
        this.gameTurnNum = 0;
        this.gameTurnId = 'turn0';
        this.gameTurnTypes = Object.keys(phrases);
    }
    gameAddNewPlayer(playerName = 'Anonymous') {
        const player = new Player();
        storage.lpush('players', JSON.stringify(player), (err) => {
            if (err)
                console.log(`Error adding new player to storage`, err);
            else {
                console.log('${player.playerName} has entered the game!');
                return player.playerName;
            }
        });
    }
    gameDeletePlayer() {
    }
    gameStoreVote(userId = '001', vote) {
        if (this.gameTurnActive)
            this.gameTurnInstance.turnStoreVotes(vote);
    }
    gameNewTurn() {
        this.gameTurnNum++;
        this.gameTurnId = `turn${this.gameTurnNum}`;
        this.gameTurnActive = true;
        const turnType = this.gameTurnTypes[Math.floor(Math.random() + this.gameTurnTypes.length)];
        this.gameTurnInstance = new Turn(this.gameTurnId, turnType);
    }
    gameTurnSpacing() {
        setInterval(this.gameNewTurn, 45000);
    }
}
exports.Game = Game;
