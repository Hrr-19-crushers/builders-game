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
    constructor(charId, charName, charLocation, charHealth, charTriForce) {
        this.charId = charId || Math.random() * 10000000000000000;
        this.charName = charName || 'Link';
        this.charLocation = charLocation || { x: 0, y: 0 };
        this.charHealth = charHealth || 100;
        // warning: set at least one tri-force piece in the layout to avoid issues with game resetting after each move
        this.charTriForce = charTriForce || [false, false, false];
    }
    charSetLocation(newLocation) {
        this.charLocation = newLocation;
        return this.charLocation;
    }
    charSetHealth(health) {
        this.charHealth = health;
        return this.charHealth;
    }
    charChangeHealth(healthChange) {
        this.charHealth += healthChange;
        return this.charHealth;
    }
    charGetNumTriForceCollected() {
        let count = 0;
        this.charTriForce.forEach(piece => {
            if (piece) {
                count++;
            }
        });
        return count;
    }
    charCollectTriForce(piece) {
        this.charTriForce[piece] = true;
        return this.charGetNumTriForceCollected();
    }
    charGetHasWon() {
        return this.charTriForce.length === this.charGetNumTriForceCollected();
    }
    charResetTriForce() {
        this.charTriForce.forEach(piece => {
            piece = false;
        });
        return this.charGetNumTriForceCollected();
    }
    charGetCharState() {
        return {
            charId: this.charId,
            charName: this.charName,
            charLocation: this.charLocation,
            charHealth: this.charHealth,
            charTriForce: this.charTriForce
        };
    }
}
// --------------------- Player ---------------------
// --------------------------------------------------
class Player {
    constructor(playerName, playerSocketId) {
        // this.playerId = this.msgId = Math.random() * 10000000000000000;
        this.playerName = playerName || 'Guest';
        this.playerSocketId = playerSocketId || undefined;
    }
    playerGetName() {
        return this.playerName;
    }
    playerGetSocketId() {
        return this.playerSocketId;
    }
}
// --------------------- Game -----------------------
// --------------------------------------------------
class Game {
    constructor(layout) {
        this.gameMoveVotes = {
            top: 0,
            right: 0,
            down: 0,
            left: 0
        };
        this.gameLayout = layout || layouts_1.testLayout;
        this.gameBoard = new board_1.Board(this.gameLayout);
        // TODO init new character properly later if there are more than 1
        const triforce = this.gameBoard.boardGetTriForceCollection();
        this.gameCharacter = new Character(null, null, { x: 39, y: 52 }, 100, triforce);
        this.gameTurnActive = false;
        // // every 0.75 seconds determine which direction got the most 'votes' and move that direction
        // setInterval(() => {
        //   let most : number = 0, winner : string;
        //   for (let direction in this.gameMoveVotes) {
        //     if (this.gameMoveVotes[direction] > most) {
        //       most = this.gameMoveVotes[direction];
        //       winner = direction;
        //     }
        //   }
        //   if (winner !== undefined) {
        //     // TODO have to figure out a way to emit to clients with 'move' after each cycle
        //     // TODO reroute current move emitters to only work through this control flow
        //     this.gameMoveChar(winner);
        //   }
        // }, 750);
    }
    //========= Game Methods =========
    gameAddNewPlayer(playerSocketId, playerName) {
        playerName = playerName || 'Guest';
        playerSocketId = playerSocketId;
        const player = new Player(playerName, playerSocketId);
        storage.hset('players', playerName, JSON.stringify(player), (err) => {
            if (err) {
                console.log(`Error adding new player to storage`, err);
            }
            else {
                console.log(`${player.playerGetName()} has entered the game!`);
            }
        });
        return player.playerGetName();
    }
    gameCountMoveVote(direction) {
        // TODO
    }
    gameReset() {
        // reset health
        this.gameCharacter.charSetHealth(100);
        // reset tri-force
        this.gameCharacter.charResetTriForce();
        // reset location
        this.gameCharacter.charSetLocation({ x: 39, y: 52 });
    }
    gameGetGameState() {
        const characterState = this.gameCharacter.charGetCharState();
        return {
            gameLayout: this.gameLayout,
            gameBoard: this.gameBoard,
            gameCharacter: characterState,
            gameTurnActive: this.gameTurnActive,
            gameCurrentTurn: this.gameCurrentTurn
        };
    }
    //====== Character Methods ========
    gameGetCharState(cb) {
        const charState = this.gameCharacter.charGetCharState();
        if (cb)
            cb(charState);
        return charState;
    }
    gameSetCharInitialPosition(location) {
        this.gameCharacter.charSetLocation(location);
    }
    gameMoveChar(direction, cb) {
        const board = this.gameBoard;
        const char = this.gameCharacter;
        // get the current state of the character
        let charState = char.charGetCharState();
        let loc = charState.charLocation;
        // check to see if the character is allowed to move this direction
        const canMove = board.boardCharCanMoveDirection(direction, loc);
        if (canMove) {
            // // // if direction is allowed: // // //
            // set character location to new location
            const newLocation = board.boardGetNewCharLocation(direction, loc);
            char.charSetLocation(newLocation);
            // update charState varaible with new location
            charState = char.charGetCharState();
            // update variable with new location
            loc = charState.charLocation;
            // check to see if enemy exists in new location and remove health if so
            const isEnemyInTile = board.boardIsEnemyInTile(loc);
            if (isEnemyInTile)
                char.charChangeHealth(-10);
            // check to see if heart exists in new location and add health if so
            const isHeartInTile = board.boardIsHeartInTile(loc);
            if (isHeartInTile)
                char.charChangeHealth(50);
            // check to see if fairy exists in new location and add health if so
            const isFairyInTile = board.boardIsFairyInTile(loc);
            if (isFairyInTile)
                char.charSetHealth(100);
            // check to see if tri-force exists in new location and add to collection if new
            const isTriForceInTile = board.boardIsTriForceInTile(loc);
            if (isTriForceInTile) {
                const triForcePiece = board.boardGetTriForceNumberFromTile(loc);
                this.gameCharacter.charCollectTriForce(triForcePiece);
            }
            // call the sever cb with the new char/game states
            let gameState = this.gameGetGameState();
            if (cb)
                cb(gameState);
            // check to see if player is dead and invoke game over if so
            charState = char.charGetCharState();
            if (charState.charHealth <= 0 || char.charGetHasWon()) {
                this.gameReset();
            }
            return gameState;
        }
    }
    //======== Player Methods =========
    gameCheckForExistingPlayer(playerName, cb) {
        storage.HEXISTS('players', playerName, (err, existance) => {
            if (err) {
                console.error(err);
                return;
            }
            if (cb) {
                cb(existance);
            }
        });
    }
    gameGetPlayerSocket(playerName, cb) {
        storage.hget('players', playerName, (err, player) => {
            if (err) {
                console.error(err);
            }
            const playerObj = JSON.parse(player);
            if (playerObj) {
                cb(playerObj.playerSocketId);
            }
        });
    }
    // TODO allow players to update their name instead of just adding a new name 
    gameUpdatePlayerName(playerName, socketId, cb) {
        let player = JSON.parse(storage.hget('players', playerName));
        // if the socketId === to the object socket id
        if (socketId === player.playerSocketId) {
            // delete the feild in storage
            storage.hdel('players');
        }
    }
    gameDeleteHashKey() {
        storage.del('players');
    }
    gameDeletePlayer() {
        // TODO eventually
    }
    gameNewMessage(userName, messageText, cb) {
        const message = new Message(messageText.toLowerCase(), null, userName);
        // save message in main chat storage; not sure if we need this at the moment, if ever
        // message.messageSaveToStorage();
        if (cb)
            cb();
    }
}
exports.Game = Game;
//# sourceMappingURL=game.js.map