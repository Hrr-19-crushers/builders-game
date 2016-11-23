const env = require('dotenv').config();
const redis = require('redis');
const redisConnect = process.env.REDIS_URL || 'redis://localhost:6379';

const storage = redis.createClient(redisConnect); // TODO need to connect via dyno and not via http
storage.clearStoragePw = process.env.CHAT_DELETE;
storage.on('connect', (err : any) => {
  if (err) console.log(`Error connecting to storage`, err);
  else console.log(`Successfully connected to storage`);
});

import { Turn } from '../client/reducers/gameReducer';
import { Location, Tile, CharacterState, GameState } from './interfaces';
// import { testLayout } from './layouts';
import { Board } from './board';

// -------------------- Message ----------------------
// ---------------------------------------------------

class Message {
  private msgId : number;
  private userId : number;
  private userName : string;
  private timeStamp : number;
  private text : string;

  constructor(text : string, userId? : number, userName? : string) {
    this.msgId = Math.random() * 10000000000000000;
    this.userId = userId || 10000000000000000;
    this.userName = userName || 'Guest';
    this.timeStamp = new Date().getTime();
    this.text = text;
  }

  messageSaveToStorage() {
    storage.lpush('messages', JSON.stringify(this.text), (err : any) => {
      if (err) console.log(`Error saving message to storage`, err);
    });
  }

}

// ------------------- Character --------------------
// --------------------------------------------------

class Character {
  private charId : number;
  private charName : string;
  private charLocation : Location;
  private charHealth : number;

  constructor(charId : number, charName : string, charLocation : Location, charHealth?: number) {
    this.charId = charId || 1;
    this.charName = charName || 'Dan';
    this.charLocation = charLocation;
    this.charHealth = charHealth || 100;
  }

  charGetCharState() : CharacterState {
    return {
      charId: this.charId,
      charName: this.charName,
      charLocation: this.charLocation,
      charHealth: this.charHealth
    };
  }

  charSetCharLocation(newLocation : Location) {
    this.charLocation = newLocation;
  }

  charSetHealth(healthChange : number) {
    this.charHealth += healthChange;
  }
}

// --------------------- Player ---------------------
// --------------------------------------------------

class Player {
  // private playerId: string;
  private playerName : string;

  constructor(playerName? : string) {
    // this.playerId = this.msgId = Math.random() * 10000000000000000;
    this.playerName = playerName || 'Guest';
  }

  playerGetName() : string {
    return this.playerName;
  }

}

// --------------------- Game -----------------------
// --------------------------------------------------

export class Game {
  private gameLayout : Tile[][];
  private gameBoard : Board;
  private gameCharacter : Character;
  private gameTurnActive : boolean;
  private gameCurrentTurn : Turn;
  private gameTurns : Turn[]; // not included in interface currently

  constructor(layout? : Tile[][]) {
    // this.gameLayout = layout || testLayout;
    this.gameLayout = layout;
    this.gameBoard = new Board(this.gameLayout);
    const randomNewCharId = Math.random() * 10000000000000000;
    const defaultCharName = 'Guest';
    // TODO init new character properly later if there are more than 1
    this.gameCharacter = new Character(randomNewCharId, defaultCharName, {x: 8, y: 4} as Location);
    this.gameTurnActive = false;
  }

  //========= Game Methods =========

  gameGetGameState() : GameState {
    const characterState = this.gameCharacter.charGetCharState();
    return {
      gameLayout: this.gameLayout,
      gameBoard: this.gameBoard,
      gameCharacter: characterState,
      gameTurnActive: this.gameTurnActive,
      gameCurrentTurn: this.gameCurrentTurn
    };
  }

  gameAddNewPlayer(playerName? : string) : string {
    playerName = playerName || 'Guest';
    const player = new Player(playerName);
    storage.lpush('players', JSON.stringify(player), (err : any) => {
      if (err) {
        console.log(`Error adding new player to storage`, err);
      } else {
        console.log('${player.playerName} has entered the game!');
      }
    });
    return player.playerGetName();
  }

  //====== Character Methods ========

  gameGetCharState(cb : any) {
    const charState : CharacterState = this.gameCharacter.charGetCharState();
    if (cb) cb(charState);
  }
  
  gameMoveChar(direction : string, cb? : any) : void {
    // get the current state of the character
    let charState : CharacterState = this.gameCharacter.charGetCharState();
    // check to see if the character is allowed to move this direction
    const canMove : boolean = this.gameBoard.boardCharCanMoveDirection(direction, charState.charLocation);
    if (canMove) {
      // if they are allowed: set character location to new location
      const newLocation : Location = this.gameBoard.boardGetNewCharLocation(direction, charState.charLocation);
      this.gameCharacter.charSetCharLocation(newLocation);
      // check to see if enemy exists in new location and remove health if so
      charState = this.gameCharacter.charGetCharState();
      const isEnemyInTile : boolean = this.gameBoard.boardIsEnemyInTile(charState.charLocation);
      if (isEnemyInTile) this.gameCharacter.charSetHealth(-10);
      // call the sever cb with the new char/game states
      let gameState : GameState = this.gameGetGameState();
      if (cb) cb(gameState);
    }
  }

  //======== Player Methods =========

  gameDeletePlayer() {
    // TODO eventually
  }

  gameNewMessage(userName : string, messageText : string, cb? : any) : void {
    const message = new Message(messageText.toLowerCase(), null, userName);
    // save message in main chat storage; not sure if we need this at the moment, if ever
    // message.messageSaveToStorage();
    if (cb) cb();
  }
  
  // ======== Turn Methods =========
  
  // gameNewTurn(newLocation : Location, cb? : any) : void {
  //   // determine if new location has a turn
  //   const isNewTurn : boolean = this.gameBoard.boardCheckForTurnInTile(newLocation);
  //   // if there is a new turn, retrieve the new turn and update the game state
  //   if (isNewTurn) {
  //     // get turn properties for this tile and set game state
  //     const newTurn : Turn = this.gameBoard.boardGetTurnInformation(newLocation);
  //     this.gameCurrentTurn = newTurn;
  //     // add this turn to turn storage property
  //     this.gameTurns.push(newTurn);
  //     // set turn state on
  //     this.gameTurnActive = true;
  //   }
  //   // call the emitter cb when done to broadcast change in game state
  //   const gameState : GameState = this.gameGetGameState();
  //   if (cb) cb(gameState);
  // }

}