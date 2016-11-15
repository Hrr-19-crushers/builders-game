const storage = require('./storage.js');
const phrases = require('./phrases.js');

export class Turn {
  turnId: string;
  turnType: string;
  turnPhrases: any; // TODO learn how to do this correctly
  
  constructor(turnId: string, turnType: string) {
    this.turnId = turnId;
    this.turnType = turnType;
    this.turnPhrases = phrases[this.turnType];
  }
  
  turnEmitPromptToClients() {
    // send out prompt details to client
  }
  
  turnStoreVotes(vote: string) {
    storage.lpush(this.turnId, vote);
  }
  
  turnTallyVotes() {
    // after certain period of time has passed
    // count up responses using phrases
  }
  
  // formulate move / course of action
  turnSave() {
    // save move in state by prompt id
    storage.lpush('moves', {}, err => {
    });
  }
  
  // push move to headless board if necessary
  // broadcast outcome to clients
  // delete prompt storage
}