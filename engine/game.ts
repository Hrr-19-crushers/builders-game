const storage = require('./storage.js');
const phrases = require('./phrases.js');

import { Location } from './interfaces';
import { Character } from './character';
import { Player } from './player';
import { Turn } from './turn';

export class Game {
  // going to need to set up persistent storage for this one; or maybe modal?
  gameCharacter: Character;
  gamePlayers: Player[];
  gameTurnActive: boolean;
  gameTurnNum: number;
  gameTurnId: string;
  gameTurnTypes: string[];
  gameTurnInstance: Turn;
  
  constructor() {
    this.gameCharacter = new Character(null, null, {x:0, y:0} as Location, null); // init properly later on
    this.gameTurnActive = false;
    this.gameTurnNum = 0;
    this.gameTurnId = 'TURN0';
    this.gameTurnTypes = Object.keys(phrases);
    storage.lpush('messages', 'WELCOME TO BUILDER GAME. STARTING A NEW GAME, HOW EXCITING!');
  }

  gameAddNewPlayer(playerName: string) {
    const player = new Player()
    this.gamePlayers.push(player); // TODO push to data store, maybe
  }

  gameStoreVote(userId: string = '001', vote: string) {
    if (this.gameTurnActive) this.gameTurnInstance.turnStoreVotes(vote);
  }

  gameNewTurn() {
    // generate new turn number
    this.gameTurnNum++;
    this.gameTurnId = `TURN${this.gameTurnNum}`;
    this.gameTurnActive = true;
    // choose a random turn type from the available prompts; can manually control this later when we have an actual game flow designed
    const turnType = this.gameTurnTypes[Math.floor(Math.random() + this.gameTurnTypes.length)];
    // create a new turn instance and let the fun begin
    this.gameTurnInstance = new Turn(this.gameTurnId, turnType);
    // this.gameTurnActive = false;
  }
  
  gameTurnSpacing() {
    // at some interval, after the last turn completes or after the game starts, initiate a new turn
    setInterval(this.gameNewTurn, 45000);
  }
  
}