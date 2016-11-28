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
import { testLayout } from './layouts';
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
  private charTriForce : Boolean[];

  constructor(charId? : number, charName? : string, charLocation? : Location, charHealth? : number, charTriForce? : Boolean[]) {
    this.charId = charId || Math.random() * 10000000000000000;
    this.charName = charName || 'Link';
    this.charLocation = charLocation || {x: 0, y: 0};
    this.charHealth = charHealth || 100;
    this.charTriForce = charTriForce || [false, false, false];
  }

  charSetCharLocation(newLocation : Location) : Location {
    this.charLocation = newLocation;
    return this.charLocation;
  }

  charSetHealth(health : number) : number {
    this.charHealth = health;
    return this.charHealth;
  }

  charChangeHealth(healthChange : number) : number {
    this.charHealth += healthChange;
    return this.charHealth;
  }

  charGetNumTriForceCollected() : number {
    let count = 0;
    this.charTriForce.forEach(piece => {
      if (piece) {
        count++;
      }
    });
    return count;
  }

  charCollectTriForce(piece : number) : number {
    this.charTriForce[piece] = true;
    return this.charGetNumTriForceCollected();
  }

  charGetHasWon() : boolean {
    return this.charTriForce.length === this.charGetNumTriForceCollected();
  }

  charResetTriForce() : number {
    this.charTriForce.forEach(piece => {
      piece = false;
    });
    return this.charGetNumTriForceCollected();
  }

  charGetCharState() : CharacterState {
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
  // private playerId: string;
  private playerName : string;
  private playerSocketId: string;

  constructor(playerName? : string, playerSocketId?: any ) {
    // this.playerId = this.msgId = Math.random() * 10000000000000000;
    this.playerName = playerName || 'Guest';
    this.playerSocketId = playerSocketId || undefined;
  }

  playerGetName() : string {
    return this.playerName;
  }

  playerGetSocketId() : any {
    return this.playerSocketId
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

  private gameMoveVotes : any = {
    top: 0,
    right: 0,
    down: 0,
    left: 0
  };

  constructor(layout? : Tile[][]) {
    this.gameLayout = layout || testLayout;
    this.gameBoard = new Board(this.gameLayout);
    // TODO init new character properly later if there are more than 1
    const triforce : Boolean[] = this.gameBoard.boardNewTriForceCollection();
    this.gameCharacter = new Character(null, null, {x: 0, y: 0}, 100, triforce);
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

  gameAddNewPlayer(playerSocketId? : string, playerName? : string) : string {
    playerName = playerName || 'Guest';
    playerSocketId = playerSocketId;
    const player = new Player(playerName, playerSocketId);
    storage.hset('players', playerName, JSON.stringify(player), (err : any) => {
      if (err) {
        console.log(`Error adding new player to storage`, err);
      } else {
        console.log(`${player.playerGetName()} has entered the game!`);
      }
    });
    return player.playerGetName();
  }

  gameCountMoveVote(direction : string) {

  }

  gameReset() {
    // reset health
    this.gameCharacter.charSetHealth(100);
    // reset tri-force
    this.gameCharacter.charResetTriForce();
    // reset location
    this.gameCharacter.charSetCharLocation({x: 0, y: 0})
  }

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

  //====== Character Methods ========

  gameGetCharState(cb? : any) : CharacterState {
    const charState : CharacterState = this.gameCharacter.charGetCharState();
    if (cb) cb(charState);
    return charState;
  }

  gameSetCharInitialPosition(location : Location) : void {
    this.gameCharacter.charSetCharLocation(location);
  }
  
  gameMoveChar(direction : string, cb? : any) : GameState {
    const board = this.gameBoard;
    const char = this.gameCharacter;
    // get the current state of the character
    let charState : CharacterState = char.charGetCharState();
    let loc = charState.charLocation;
    // check to see if the character is allowed to move this direction
    const canMove : boolean = board.boardCharCanMoveDirection(direction, loc);
    if (canMove) {
      // // // if direction is allowed: // // //
      // set character location to new location
      const newLocation : Location = board.boardGetNewCharLocation(direction, loc);
      char.charSetCharLocation(newLocation);
      // update charState varaible with new location
      charState = char.charGetCharState();
      // update variable with new location
      loc = charState.charLocation;
      // check to see if enemy exists in new location and remove health if so
      const isEnemyInTile : boolean = board.boardIsEnemyInTile(loc);
      if (isEnemyInTile) char.charChangeHealth(-10);
      // check to see if heart exists in new location and add health if so
      const isHeartInTile : boolean = board.boardIsHeartInTile(loc);
      if (isHeartInTile) char.charChangeHealth(50);
      // check to see if fairy exists in new location and add health if so
      const isFairyInTile : boolean = board.boardIsFairyInTile(loc);
      if (isFairyInTile) char.charChangeHealth(100);
      // check to see if tri-force exists in new location and add to collection if new
      const isTriForceInTile : boolean = board.boardIsTriForceInTile(loc);
      if (isTriForceInTile) {
        const triForcePiece : number = board.boardGetTriForceNumberFromTile(loc);
        this.gameCharacter.charCollectTriForce(triForcePiece);
      }
      // call the sever cb with the new char/game states
      let gameState : GameState = this.gameGetGameState();
      if (cb) cb(gameState);
      
      // check to see if player is dead and invoke game over if so
      charState = char.charGetCharState();
      if (charState.charHealth <= 0 || char.charGetHasWon()) {
        this.gameReset();
      }
      
      return gameState;
    }
  }

  //======== Player Methods =========
  gameCheckForExistingPlayer(playerName : string, cb? : any) : void {
    storage.HEXISTS('players', playerName, (err, existance) => { 
      if (err) {
        console.error(err);
        return;
      }
      if (cb) {
        cb(existance)
      }
    }); 
  }
  gameGetPlayerSocket(playerName: string, cb?: any): void {
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
  gameUpdatePlayerName(playerName : string, socketId : string, cb? : any) : void {
    let player = JSON.parse(storage.hget('players', playerName))
    // if the socketId === to the object socket id
    if (socketId === player.playerSocketId ) {
      // delete the feild in storage
      storage.hdel('players',)
      //call gameaddplayer with new name and socketid.
    }
  }
  
  gameDeleteHashKey() {
    storage.del('players')
  }

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