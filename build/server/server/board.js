"use strict";
const testLayout = [
    [{ passable: false }, { passable: false }, { passable: true }, { passable: true }, { passable: true }],
    [{ passable: false }, { passable: true }, { passable: true }, { passable: false }, { passable: true }],
    [{ passable: true }, { passable: true }, { passable: true }, { passable: true }, { passable: true }],
    [{ passable: true }, { passable: false }, { passable: true }, { passable: true }, { passable: false }],
    [{ passable: true }, { passable: true }, { passable: true }, { passable: false }, { passable: false }]
];
class Board {
    constructor() {
        this.mapLayout = testLayout;
    }
    boardCharCanMoveDirection(direction, currentLocation) {
        const { x, y } = currentLocation;
        const layout = this.mapLayout;
        let can = false;
        switch (direction) {
            case 'up':
                if (layout[x][y - 1] !== undefined && layout[x][y - 1].passable)
                    can = true;
                break;
            case 'right':
                if (layout[x + 1][y] !== undefined && layout[x + 1][y].passable)
                    can = true;
                break;
            case 'down':
                if (layout[x][y + 1] !== undefined && layout[x][y + 1].passable)
                    can = true;
                break;
            case 'left':
                if (layout[x - 1][y] !== undefined && layout[x - 1][y].passable)
                    can = true;
                break;
        }
        return can;
    }
    // some duplication of code here and prob not necessary, but fine sep of concerns for now
    boardGetNewCharLocation(direction, currentLocation) {
        // there's probably a better way to destructure currentLocation here
        let newLocation;
        newLocation.x = currentLocation.x;
        newLocation.y = currentLocation.y;
        switch (direction) {
            case 'up':
                newLocation.y--;
                break;
            case 'right':
                newLocation.x++;
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
exports.Board = Board;
//# sourceMappingURL=board.js.map