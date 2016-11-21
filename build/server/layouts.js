"use strict";
const interfaces_1 = require('./interfaces');
const gameTurns_1 = require('./gameTurns');
exports.testLayout = [
    [
        { passable: false, type: interfaces_1.TileType.rock },
        { passable: false, type: interfaces_1.TileType.rock },
        { passable: true, type: interfaces_1.TileType.dirt, turn: gameTurns_1.turns[1] },
        { passable: true, type: interfaces_1.TileType.dirt },
        { passable: true, type: interfaces_1.TileType.dirt }
    ],
    [
        { passable: false, type: interfaces_1.TileType.rock },
        { passable: true, type: interfaces_1.TileType.dirt },
        { passable: true, type: interfaces_1.TileType.dirt },
        { passable: false, type: interfaces_1.TileType.water },
        { passable: true, type: interfaces_1.TileType.dirt, turn: gameTurns_1.turns[2] }
    ],
    [
        { passable: true, type: interfaces_1.TileType.dirt },
        { passable: true, type: interfaces_1.TileType.dirt, turn: gameTurns_1.turns[0] },
        { passable: true, type: interfaces_1.TileType.dirt },
        { passable: true, type: interfaces_1.TileType.dirt },
        { passable: true, type: interfaces_1.TileType.dirt }
    ],
    [
        { passable: true, type: interfaces_1.TileType.dirt },
        { passable: false, type: interfaces_1.TileType.water },
        { passable: true, type: interfaces_1.TileType.dirt },
        { passable: true, type: interfaces_1.TileType.dirt, turn: gameTurns_1.turns[5] },
        { passable: false, type: interfaces_1.TileType.rock }
    ],
    [
        { passable: true, type: interfaces_1.TileType.dirt },
        { passable: true, type: interfaces_1.TileType.dirt },
        { passable: true, type: interfaces_1.TileType.dirt },
        { passable: false, type: interfaces_1.TileType.rock },
        { passable: false, type: interfaces_1.TileType.rock }
    ]
];
//# sourceMappingURL=layouts.js.map