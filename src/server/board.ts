import { Location, Terrain } from '../interfaces';

const testLayout: Terrain[][] = [
  [{passable: false}, {passable: false}, {passable: true}, {passable: true}, {passable: true}],
  [{passable: false}, {passable: true}, {passable: true}, {passable: false}, {passable: true}],
  [{passable: true}, {passable: true}, {passable: true}, {passable: true}, {passable: true}],
  [{passable: true}, {passable: false}, {passable: true}, {passable: true}, {passable: false}],
  [{passable: true}, {passable: true}, {passable: true}, {passable: false}, {passable: false}]
];

export class Board {
  private mapLayout: Terrain[][];

  constructor() {
    this.mapLayout = testLayout;
  }

  boardCharCanMoveDirection(direction: string, currentLocation: Location): boolean {
    const {x, y} = currentLocation;
    const layout = this.mapLayout;
    let can = false;
    // don't let Nick S see this, he hates switch statements
    switch(direction) {
      case 'up':
        if (layout[x][y - 1] !== undefined && layout[x][y - 1].passable) can = true;
        break;
      case 'right':
        if (layout[x + 1][y] !== undefined && layout[x + 1][y].passable) can = true;
        break;
      case 'down':
        if (layout[x][y + 1] !== undefined && layout[x][y + 1].passable) can = true;
        break;
      case 'left':
        if (layout[x - 1][y] !== undefined && layout[x - 1][y].passable) can = true;
        break;
    }
    return can;
  }

  // some duplication of code here and prob not necessary, but fine sep of concerns for now
  boardGetNewCharLocation(direction: string, currentLocation: Location): Location {
    // there's probably a better way to destructure currentLocation here
    let newLocation: Location;
    newLocation.x = currentLocation.x;
    newLocation.y = currentLocation.y;
    switch(direction) {
      case 'up':
        newLocation.y--;
        break;
      case 'right':
        newLocation.x++
        break;
      case 'down':
        newLocation.y++;
        break;
      case 'left':
        newLocation.x--;
        break;
    }
    return newLocation;
  }
}