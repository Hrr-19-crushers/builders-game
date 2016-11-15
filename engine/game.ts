const storage = require('./storage.js');
const phrases = require('./phrases.js');

// ------------------ Interfaces ---------------------
// ---------------------------------------------------

interface TurnInit {
  turnId: number;
  turnType: string;
}

interface Location {
  x: number;
  y: number;
}

// -------------------- Classes ----------------------
// ---------------------------------------------------

// a playable character in the game
class Character {
  name: string;
  health: number;
  location: Location;

  constructor(name: string = 'Jimmy', location: Location, health: number = 100) {
    this.name = name;
    this.health = health;
    this.location = location;
  }

  move(location: Location) {

  }
}

// a player entity in the game that exerts control over a character via voting
class Player {
  playerId: string;
  playerName: string;

  constructor(playerName: string = 'Anonymous') {
    // this.playerId = playerId;
    this.playerName = playerName;
  }

}

// a turn in the game
class Turn {
  turnId: number;
  turnType: string;
  turnPhrases: any; // TODO learn how to do this correctly
  turnResponseStorageLocation: string;
  
  constructor(turnInit: TurnInit) {
    this.turnId = turnInit.turnId;
    this.turnType = turnInit.turnType;
    this.turnPhrases = phrases[this.turnType];
    this.turnResponseStorageLocation = `TURN${this.turnId}`;
  }
  
  emitPromptToClients() {
    // send out prompt details to client
  }
  
  storeResponses() {
    // route a copy of all chats to temp storage
  }
  
  tallyVotes() {
    // after certain period of time has passed
    // count up responses using phrases
  }
  
  // formulate move / course of action
  saveMove() {
    // save move in state by prompt id
    storage.lpush('moves', {}, err => {
    });
  }
  
  // push move to headless board if necessary
  // broadcast outcome to clients
  // delete prompt storage
}

class Game {
  // going to need to set up persistent storage for this one; or maybe modal?
  character: Character;
  players: Player[];
  turn: number;
  turnTypes: string[];
  
  constructor() {
    // create state for current game in memory
    this.character = new Character(null, {x:0, y:0} as Location, 100);
    // populate available prompt types; TODO add prompt methods
    this.turnTypes = Object.keys(phrases);
  }

  addNewPlayer(playerName: string) {
    const player = new Player()
    this.players.push(player);
  }
  
  startGame() {
    storage.lpush('messages', 'WELCOME TO BUILDER GAME. STARTING A NEW GAME, EXCITING!');
  }
  
  // at some interval, after the last turn completes or after the game starts, initiate a new turn
  
  newTurn() {
    // generate move number for this prompt
    const turnId = storage.exists('moves') === 1 ? storage.llen('moves') + 1 : 1;
    // choose a random prompt type from the available prompts
    const turnType = this.turnTypes[Math.floor(Math.random() + this.turnTypes.length)];
    // construct the prompt init object
    const turnInit: TurnInit = {
      turnId: turnId,
      turnType: turnType
    };
    // create a new prompt and let the fun begin
    let turn = new Turn(turnInit);
  }
}

module.exports = Game;