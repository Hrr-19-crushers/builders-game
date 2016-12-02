import { Location, Tile, BoardState } from './interfaces';
// import { Turn } from '../client/reducers/gameReducer';
// import { turns } from './gameTurns';
import { testLayout } from './layouts';

export class Board {
  private boardLayout : Tile[][];

  constructor(layout : Tile[][]) {
    this.boardLayout = layout;
  }

  // // MOVEMENT METHODS // // //
  
  public boardCharCanMoveDirection(direction : string, currentLocation : Location) : boolean {
    // heroku appears to not like destructuring yet
    // const {x, y} = currentLocation;
    const x = currentLocation.x;
    const y = currentLocation.y;
    const layout = this.boardLayout;
    let can = false;
    // don't let Nick S see this, he hates switch statements
    switch (direction) {
      case 'up':
        if ((y - 1 in layout) && (layout[y - 1][x].p)) {
          can = true;
        }
        break;
      case 'right':
        if ((x + 1 in layout[y]) && (layout[y][x + 1].p)) {
          can = true;
        }
        break;
      case 'down':
        if ((y + 1 in layout) && (layout[y + 1][x].p)) {
          can = true;
        }
        break;
      case 'left':
        if ((x - 1 in layout[y]) && (layout[y][x - 1].p)) {
          can = true;
        }
        break;
    }
    return can;
  }

  // some duplication of code here and prob not necessary, but fine sep of concerns for now
  public boardGetNewCharLocation(direction : string, currentLocation : Location) : Location {
    // there's probably a better way to destructure currentLocation here
    // don't call this with a location unless you've already checked it's valid with boardCharCanMoveDirection
    let newLocation: Location;
    switch (direction) {
      case 'up':
        newLocation = { x: currentLocation.x, y: currentLocation.y - 1 };
        break;
      case 'right':
        newLocation = { x: currentLocation.x + 1, y: currentLocation.y };
        break;
      case 'down':
        newLocation = { x: currentLocation.x, y: currentLocation.y + 1 };
        break;
      case 'left':
        newLocation = { x: currentLocation.x - 1, y: currentLocation.y };
        break;
    }
    return newLocation;
  }

  // // // ENEMY METHODS // // //
  
  public boardIsEnemyInTile(location : Location) : boolean {
    const tile = this.boardLayout[location.y][location.x];
    return ('e' in tile && tile.e);
  }

  // TOD create tests
  public boardGetEnemyLocations() : Location[] {
    let locations : Location[] = [];
    this.boardLayout.forEach((row, yIdx) => {
      row.forEach((tile, xIdx) => {
        if ('e' in tile && tile.e) {
          locations.push({x: xIdx, y: yIdx});
        }
      });
    });
    return locations;
  }

  // // // HEART & FAIRY METHODS // // //
  
  // TODO create tests
  public boardIsHeartInTile(location : Location) : boolean {
    const tile = this.boardLayout[location.y][location.x];
    return ('h' in tile && tile.h);
  }

  // TODO create tests
  public boardIsFairyInTile(location : Location) : boolean {
    const tile = this.boardLayout[location.y][location.x];
    return ('f' in tile && tile.f);
  }

  // // // TRI-FORCE METHODS // // //

  public boardCreateNewTriForceCollectionForCharacter() : any {
    return 
  }
  
  // TODO create tests
  public boardIsTriForceInTile(location : Location) : boolean {
    const tile = this.boardLayout[location.y][location.x];
    return ('i' in tile && typeof tile.i === 'interger');
  }

  // TODO create tests
  public boardGetTriForceNumberFromTile(location : Location) : number {
    const tile = this.boardLayout[location.y][location.x];
    return tile.i;
  }

  // TODO create tests
  public boardGetTriForceLocations() : Location[] {
    let locations : Location[] = [];
    this.boardLayout.forEach((row, yIdx) => {
      row.forEach((tile, xIdx) => {
        if ('i' in tile && typeof tile.i === 'number') {
          locations.push({x: xIdx, y: yIdx});
        }
      });
    });
    return locations;
  }

  public boardGetTriForceCollection() : Boolean[] {
    const locations : Location[] = this.boardGetTriForceLocations();
    const collection : Boolean[] = [];
    locations.forEach(location => {
      const piece : number = this.boardGetTriForceNumberFromTile(location);
      collection[piece] = false;
    });
    return collection;
  }

  // // // // TURN METHODS // // //
  
  // boardCheckForTurnInTile(location : Location) : boolean {
  //   return ('turn' in this.boardLayout[location.y][location.x]);
  // }

  // boardGetTurnInformation(location : Location) : Turn {
  //   // always check boardCheckForTurnInTile first to make sure there is a turn present
  //   if (this.boardCheckForTurnInTile(location)) return this.boardLayout[location.y][location.x].turn;
  // }

  // // // BOARD STATE METHODS // // //
  
  // TODO create tests
  public boardGetBoardState() : BoardState {
    return {
      boardLayout: this.boardLayout
    };
  }

}