import { Location } from './interfaces';

export class Character {
  charId: number;
  charName: string;
  charLocation: Location;
  charHealth: number;

  constructor(charId: number = 1, charName: string = 'Jimmy', charLocation: Location, charHealth: number = 100) {
    this.charId = charId;
    this.charName = charName;
    this.charLocation = charLocation;
    this.charHealth = charHealth;
  }

  charMove(location: Location) {
  }
}