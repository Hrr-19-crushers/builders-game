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
// import { phrases } from './phrases';
// -------------------- Message ---------------------
// --------------------------------------------------
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
            charHealth: this.charHealth,
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
// --------------------- Turn -----------------------
// --------------------------------------------------
// class Turn {
//   turnId: string;
//   turnType: string;
//   turnPhrases: any; // TODO learn how to do this correctly
//   turnResponses: string[];
//   constructor(turnId: string, turnType: string) {
//     this.turnId = turnId;
//     this.turnType = turnType;
//     // this.turnPhrases = phrases[this.turnType] as any;
//   }
//   turnEmitPromptToClients() {
//     // send out prompt details to client
//   }
//   turnFetchResponses() {
//     storage.lrange(this.turnId, 0, -1, (err: any, data: any) => { // TODO this needs interface/typing
//       if (err) console.log(`Error retrieving ${this.turnId} responses from storage`, err);
//       else this.turnResponses = data;
//     });
//   }
//   turnTallyVotes() {
//     // count up responses using phrases?
//   }
//   // formulate move / course of action
//   turnSave() {
//     // save move in state by prompt id
//     // storage.lpush('moves', {}, (err: any) => {
//     // });
//   }
//   // push move to headless board if necessary
//   // broadcast outcome to clients
//   turnDelResponses() {
//     storage.del(this.turnId, (err: any) => {
//       if (err) console.log(`Error deleting responses for ${this.turnId}`)
//     });
//   }
// }
// --------------------- Game -----------------------
// --------------------------------------------------
class Game {
    // gameTurnActive: boolean;
    // gameTurnNum: number;
    // gameTurnId: string;
    // gameTurnTypes: string[];
    // gameTurnInstance: Turn;
    constructor(layout) {
        this.gameLayout = layout || layouts_1.testLayout;
        this.gameBoard = new board_1.Board(this.gameLayout);
        const randomNewCharId = Math.random() * 10000000000000000;
        const defaultCharName = 'Guest';
        // TODO init new character properly later if there are more than 1
        this.gameCharacter = new Character(randomNewCharId, defaultCharName, { x: 0, y: 4 });
        // this.gameTurnActive = false;
        // this.gameTurnNum = 0;
        // this.gameTurnId = 'turn0';
        // this.gameTurnTypes = Object.keys(phrases);
    }
    //========= Game Methods =========
    gameGetGameState(cb) {
        return {
            gameLayout: this.gameLayout,
            gameBoard: this.gameBoard,
            gameCharacter: this.gameCharacter
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
        if (cb)
            cb(this.gameCharacter.charGetCharState());
    }
    gameMoveChar(direction, cb) {
        const character = this.gameCharacter.charGetCharState();
        if (this.gameBoard.boardCharCanMoveDirection(direction, character.charLocation)) {
            character.charSetCharLocation = this.gameBoard.boardGetNewCharLocation(direction, character.charLocation);
            if (cb)
                cb(this.gameCharacter.charGetCharState());
        }
    }
    //======== Player Methods =========
    gameDeletePlayer() {
        // TODO eventually
    }
    gameParseBasicActions(text) {
        // maybe todo for MVP if necessary
    }
    gameNewMessage(userName, messageText, cb) {
        const message = new Message(messageText.toLowerCase(), null, userName);
        message.messageSaveToStorage(); // save message in main chat storage
        // if a turn is currently active, also store text in turn response storage
        // if (this.gameTurnActive) storage.lpush(this.gameTurnId, message.text);
        if (cb)
            cb();
    }
}
exports.Game = Game;
//# sourceMappingURL=game.js.map