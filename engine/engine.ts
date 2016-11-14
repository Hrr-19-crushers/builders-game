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
  // phrases: object;
  constructor(promptInit: PromptInit) {
    this.promptId = promptInit.promptId;
    this.promptType = promptInit.promptType;
    this.loadPhrases();
  }
  loadPhrases() {
    // load the phrases for this type of prompt from phrases.js
  }
  storeResponses() {
    // create new memory space in storage to collect responses
  }
  // send out prompt via socket to all players
  // route a copy of all chats to temp storage
  // count down time during vote, broadcast to players
  // once voting closes, count up responses using phrases and formulate outcome
  saveMove() {
    // save move in state by prompt id
    storage.lpush('moves', {}, err => {
    });
  }
  // push move to headless board if necessary
  // broadcast outcome to clients
}

class Game {
  promptTypes: string[];
  constructor() {
    // create state for current game in memory
    // create memory space for all moves that have taken place in the game
    // populate available prompt types
    this.promptTypes = Object.keys(phrases);
    // at some interval, create a new prompt
      // crate move number for this prompt
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