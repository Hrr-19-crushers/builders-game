"use strict";
const env = require('dotenv').config();
const redis = require('redis');
const redisConnect = process.env.REDIS_URL || 'redis://localhost:6379';
const storage = redis.createClient(redisConnect); // TODO need to connect via dyno and not via http
storage.clearStoragePw = process.env.CHAT_DELETE;
storage.on('connect', (err) => {
    if (err)
        console.log(`Error connecting to storage`, err);
    else
        console.log(`Successfully connected to storage`);
});
const layouts_1 = require('./layouts');
const board_1 = require('./board');
// -------------------- Message ----------------------
// ---------------------------------------------------
class Message {
    constructor(text, userId, userName) {
        this.msgId = Math.random() * 10000000000000000;
        this.userId = userId || 10000000000000000;
        this.userName = userName || 'Guest';
        this.timeStamp = new Date().getTime();
        this.text = text;
    }
    messageSaveToStorage() {
        storage.lpush('messages', JSON.stringify(this.text), (err) => {
            if (err)
                console.log(`Error saving message to storage`, err);
        });
    }
}
// ------------------- Character --------------------
// --------------------------------------------------
class Character {
    constructor(charId, charName, charLocation, charHealth) {
        this.charId = charId || 1;
        this.charName = charName || 'Dan';
        this.charLocation = charLocation;
        this.charHealth = charHealth || 100;
    }
    charGetCharState() {
        return {
            charId: this.charId,
            charName: this.charName,
            charLocation: this.charLocation,
            charHealth: this.charHealth
        };
    }
    charSetCharLocation(newLocation) {
        this.charLocation = newLocation;
    }
}
// --------------------- Player ---------------------
// --------------------------------------------------
class Player {
    constructor(playerName) {
        // this.playerId = this.msgId = Math.random() * 10000000000000000;
        this.playerName = playerName || 'Guest';
    }
    playerGetName() {
        return this.playerName;
    }
}
// --------------------- Game -----------------------
// --------------------------------------------------
class Game {
    constructor(layout) {
        this.gameLayout = layout || layouts_1.testLayout;
        this.gameBoard = new board_1.Board(this.gameLayout);
        const randomNewCharId = Math.random() * 10000000000000000;
        const defaultCharName = 'Guest';
        // TODO init new character properly later if there are more than 1
        this.gameCharacter = new Character(randomNewCharId, defaultCharName, { x: 0, y: 4 });
        this.gameTurnActive = false;
    }
    //========= Game Methods =========
    gameGetGameState(cb) {
        return {
            gameLayout: this.gameLayout,
            gameBoard: this.gameBoard,
            gameCharacter: this.gameCharacter,
            gameTurnActive: this.gameTurnActive,
            gameCurrentTurn: this.gameCurrentTurn
        };
    }
    gameAddNewPlayer(playerName) {
        playerName = playerName || 'Guest';
        const player = new Player(playerName);
        storage.lpush('players', JSON.stringify(player), (err) => {
            if (err)
                console.log(`Error adding new player to storage`, err);
            else {
                console.log('${player.playerName} has entered the game!');
            }
        });
        return player.playerGetName();
    }
    //====== Character Methods ========
    gameGetCharState(cb) {
        const charState = this.gameCharacter.charGetCharState();
        if (cb)
            cb(charState);
    }
    gameMoveChar(direction, cb) {
        // get the current state of the character
        const charState = this.gameCharacter.charGetCharState();
        console.log('charState', charState);
        // check to see if the character is allowed to move this direction
        if (this.gameBoard.boardCharCanMoveDirection(direction, charState.charLocation)) {
            // if they are allowed, set character location to new location
            const newLocation = this.gameBoard.boardGetNewCharLocation(direction, charState.charLocation);
            console.log(newLocation);
            this.gameCharacter.charSetCharLocation(newLocation);
            // check to see if the new location contains a turn
            this.gameNewTurn(newLocation, cb);
        }
    }
    //======== Player Methods =========
    gameDeletePlayer() {
        // TODO eventually
    }
    gameNewMessage(userName, messageText, cb) {
        const message = new Message(messageText.toLowerCase(), null, userName);
        message.messageSaveToStorage(); // save message in main chat storage
        if (cb)
            cb();
    }
    // ======== Turn Methods =========
    gameNewTurn(newLocation, cb) {
        // determine if new location has a turn
        const isNewTurn = this.gameBoard.boardCheckForTurnInTile(newLocation);
        // if there is a new turn, retrieve the new turn and update the game state
        if (isNewTurn) {
            // get turn properties for this tile and set game state
            const newTurn = this.gameBoard.boardGetTurnInformation(newLocation);
            this.gameCurrentTurn = newTurn;
            // add this turn to turn storage property
            this.gameTurns.push(newTurn);
            // set turn state on
            this.gameTurnActive = true;
        }
        // call the emitter cb when done to broadcast change in game state
        const gameState = this.gameGetGameState();
        if (cb)
            cb(gameState);
    }
}
exports.Game = Game;
//# sourceMappingURL=game.js.map