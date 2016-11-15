const storage = require('./storage.js');
const phrases = require('./phrases.js');

export class Turn {
  turnId: number;
  turnType: string;
  turnPhrases: any; // TODO learn how to do this correctly
  
  constructor(turnId: number, turnType: string) {
    this.turnId = turnId;
    this.turnType = turnType;
    this.turnPhrases = phrases[this.turnType];
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