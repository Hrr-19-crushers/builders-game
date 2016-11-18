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
const map_1 = require('./map');
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
}
// ------------------- Character --------------------
// --------------------------------------------------
class Character {
    constructor(charLocation, charId, charName, charHealth) {
        this.charId = charId || 1;
        this.charName = charName || 'Dan';
        this.charLocation = charLocation;
        this.charHealth = charHealth || 100;
    }
    charMove(direction, cb) {
        const { x, y } = this.charLocation;
        switch (direction) {
            case 'up':
                if (map_1.Layout[x][y - 1] !== undefined && map_1.Layout[x][y - 1].passable) {
                    this.charLocation.y = y - 1;
                    if (cb)
                        cb(this.charLocation);
                }
                break;
            case 'right':
                //FIXME:  suggest changing the 'off the board check' to x+1 <= Layout[0].length to not cause an error
                if (map_1.Layout[x + 1][y] !== undefined && map_1.Layout[x + 1][y].passable) {
                    this.charLocation.x = x + 1;
                    if (cb)
                        cb(this.charLocation);
                }
                break;
            case 'down':
                if (map_1.Layout[x][y + 1] !== undefined && map_1.Layout[x][y + 1].passable) {
                    this.charLocation.y = y + 1;
                    if (cb)
                        cb(this.charLocation);
                }
                break;
            case 'left':
                if (map_1.Layout[x - 1][y] !== undefined && map_1.Layout[x - 1][y].passable) {
                    this.charLocation.x = x - 1;
                    if (cb)
                        cb(this.charLocation);
                }
                break;
        }
    }
}
// --------------------- Player ---------------------
// --------------------------------------------------
class Player {
    constructor(playerName) {
        // this.playerId = this.msgId = Math.random() * 10000000000000000;
        this.playerName = playerName || 'Guest';
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
    constructor() {
        this.gameCharacter = new Character({ x: 0, y: 4 }, null, null, null); // init properly later on
        // this.gameTurnActive = false;
        // this.gameTurnNum = 0;
        // this.gameTurnId = 'turn0';
        // this.gameTurnTypes = Object.keys(phrases);
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
        return player.playerName;
    }
    gameDeletePlayer() {
        // TODO eventually
    }
    gameParseBasicActions(text) {
        // maybe todo for MVP if necessary
    }
    gameNewMessage(userName, messageText, cb) {
        const message = new Message(messageText.toLowerCase(), null, userName);
        // save message in main chat storage
        storage.lpush('messages', JSON.stringify(message), (err) => {
            if (err)
                console.log(`Error saving message to storage`, err);
        });
        // if a turn is currently active, also store text in turn response storage
        // if (this.gameTurnActive) storage.lpush(this.gameTurnId, message.text);
        if (cb)
            cb();
    }
    // gameNewTurn() {
    //   // generate new turn number
    //   this.gameTurnNum++;
    //   // generate new turn id based on number
    //   this.gameTurnId = `turn${this.gameTurnNum}`;
    //   // set turn state on
    //   this.gameTurnActive = true;
    //   // choose a random turn type from the available prompts; can manually control this later when we have an actual game flow designed
    //   const turnType = this.gameTurnTypes[Math.floor(Math.random() + this.gameTurnTypes.length)];
    //   // create a new turn instance and let the fun begin
    //   this.gameTurnInstance = new Turn(this.gameTurnId, turnType);
    //   // after some period of time:
    //     // this.gameTurnActive = false;
    //     // this.gameTurnInstance.turnTallyVotes();
    //     // storage.lpush('actions', ???);
    // }
    gameTurnSpacing() {
        // at some interval, after the last turn completes or after the game starts, initiate a new turn
        // setInterval(this.gameNewTurn, 45000);
    }
}
exports.Game = Game;
//# sourceMappingURL=game.js.map