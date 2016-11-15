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
  gameTurn: number;
  gameTurnTypes: string[];
  
  constructor() {
    this.gameCharacter = new Character(null, null, {x:0, y:0} as Location, null);
    this.gameTurn = 0;
    this.gameTurnTypes = Object.keys(phrases);
  }

  addNewPlayer(playerName: string) {
    const player = new Player()
    this.gamePlayers.push(player); // TODO push to data store, maybe
  }
  
  startGame() {
    storage.lpush('messages', 'WELCOME TO BUILDER GAME. STARTING A NEW GAME, HOW EXCITING!');
  }
  
  turnSpacing() {
    // at some interval, after the last turn completes or after the game starts, initiate a new turn
    setInterval(this.newTurn, 45000);
  }
  
  newTurn() {
    // generate new turn number
    this.gameTurn++;
    // choose a random turn type from the available prompts
    const turnType = this.gameTurnTypes[Math.floor(Math.random() + this.gameTurnTypes.length)];
    // create a new turn instance and let the fun begin
    let turn = new Turn(this.gameTurn, turnType);
  }
}