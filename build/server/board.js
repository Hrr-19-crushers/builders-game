"use strict";
class Board {
    constructor(layout) {
        this.boardLayout = layout;
    }
    boardGetBoardState() {
        return {
            boardLayout: this.boardLayout
        };
    }
    boardCharCanMoveDirection(direction, currentLocation) {
        const { x, y } = currentLocation;
        const layout = this.boardLayout;
        let can = false;
        // don't let Nick S see this, he hates switch statements
        switch (direction) {
            case 'up':
                if ((y - 1 in layout) && (layout[y - 1][x].passable))
                    can = true;
                break;
            case 'right':
                if ((x + 1 in layout[y]) && (layout[y][x + 1].passable))
                    can = true;
                break;
            case 'down':
                if ((y + 1 in layout) && (layout[y + 1][x].passable))
                    can = true;
                break;
            case 'left':
                if ((x - 1 in layout[y]) && (layout[y][x - 1].passable))
                    can = true;
                break;
        }
        return can;
    }
    // some duplication of code here and prob not necessary, but fine sep of concerns for now
    boardGetNewCharLocation(direction, currentLocation) {
        // there's probably a better way to destructure currentLocation here
        let newLocation;
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
}
exports.Board = Board;
//# sourceMappingURL=board.js.map