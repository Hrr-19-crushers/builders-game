"use strict";
const storage = require('./storage.js');
const phrases = require('./phrases.js');
class Message {
    constructor(userId, text) {
        this.msgId = Math.random() * 10000000000000000;
        this.userId = userId;
        this.timeStamp = new Date().getTime();
        this.text = text;
    }
}
exports.Message = Message;
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
    turnTallyVotes() {
    }
    turnSave() {
    }
}
class Game {
    constructor() {
        this.gameCharacter = new Character(null, null, { x: 0, y: 0 }, null);
        this.gameTurnActive = false;
        this.gameTurnNum = 0;
        this.gameTurnId = 'turn0';
        this.gameTurnTypes = Object.keys(phrases);
    }
    gameAddNewPlayer(playerName) {
        const player = new Player();
        this.gamePlayers.push(player);
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
