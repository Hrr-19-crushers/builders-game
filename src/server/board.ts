import { Location, Tile, BoardState } from './interfaces';
// import { Turn } from '../client/reducers/gameReducer';
// import { turns } from './gameTurns';
// import { testLayout } from './layouts';

export class Board {
  private boardLayout : Tile[][];

  constructor(layout : Tile[][]) {
    this.boardLayout = layout;
  }

  boardGetBoardState() : BoardState {
    return {
      boardLayout: this.boardLayout
    };
  }

  boardCharCanMoveDirection(direction : string, currentLocation : Location) : boolean {
    // heroku appears to not like destructuring yet
    // const {x, y} = currentLocation;
    const x = currentLocation.x;
    const y = currentLocation.y;
    const layout = this.boardLayout;
    let can = false;
    // don't let Nick S see this, he hates switch statements
    switch(direction) {
      case 'up':
        if ((y - 1 in layout) && (layout[y - 1][x].p)) can = true;
        break;
      case 'right':
        if ((x + 1 in layout[y]) && (layout[y][x + 1].p)) can = true;
        break;
      case 'down':
        if ((y + 1 in layout) && (layout[y + 1][x].p)) can = true;
        break;
      case 'left':
        if ((x - 1 in layout[y]) && (layout[y][x - 1].p)) can = true;
        break;
    }
    return can;
  }

  // some duplication of code here and prob not necessary, but fine sep of concerns for now
  boardGetNewCharLocation(direction : string, currentLocation : Location) : Location {
    // there's probably a better way to destructure currentLocation here
    // don't call this with a location unless you've already checked it's valid with boardCharCanMoveDirection
    let newLocation: Location;
    switch(direction) {
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

  // boardCheckForTurnInTile(location : Location) : boolean {
  //   return ('turn' in this.boardLayout[location.y][location.x]);
  // }

  // boardGetTurnInformation(location : Location) : Turn {
  //   // always check boardCheckForTurnInTile first to make sure there is a turn present
  //   if (this.boardCheckForTurnInTile(location)) return this.boardLayout[location.y][location.x].turn;
  // }

}