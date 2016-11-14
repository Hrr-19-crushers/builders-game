const storage = require('./storage.js');
const phrases = require('./phrases.js');

// ------------------ Interfaces ---------------------
// ---------------------------------------------------

interface PromptInit {
  promptId: number;
  promptType: string;
}

// -------------------- Classes ----------------------
// ---------------------------------------------------

class Prompt {
  promptId: number;
  promptType: string;
  promptPhrases: any; // TODO learn how to do this correctly
  promptResponseStorageLocation: string;
  
  constructor(promptInit: PromptInit) {
    this.promptId = promptInit.promptId;
    this.promptType = promptInit.promptType;
    this.promptPhrases = phrases[this.promptType];
    this.promptResponseStorageLocation = `PROMPT${this.promptId}`;
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

// will need to conver this to a mongoose model most likely
class Player {
  playerId: string;
  playerName: string;

  constructor(playerId: string) {
    this.playerId = playerId;
    // this.playerName = 
  }

}

class Game {
  // going to need to set up persistent storage for this one; or maybe modal?
  players: Player[];
  promptTypes: string[];
  
  constructor() {
    // create state for current game in memory
    // create memory space for all moves that have taken place in the game
    // populate available prompt types
    this.promptTypes = Object.keys(phrases);
  }

  addNewPlayer(player: Player) {
    this.players.push(player);
  }
  
  startGame() {
    storage.lpush('messages', 'WELCOME TO BUILDER GAME. STARTING NEW GAME, WOO!');
  }
  
  // at some interval, initiate a new move
  
  // init a new prompt
  
  newPrompt() {
    // generate move number for this prompt
    const moveNumber = storage.exists('moves') === 1 ? storage.llen('moves') + 1 : 1;
    // choose a random prompt type from the available prompts
    const promptType = this.promptTypes[Math.floor(Math.random() + this.promptTypes.length)];
    // construct the prompt init object
    const promptInit: PromptInit = {
      promptId: moveNumber,
      promptType: promptType
    };
    // create a new prompt and let the fun begin
    let prompt = new Prompt(promptInit);
  }
}

module.exports = Game;