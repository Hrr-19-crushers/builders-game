"use strict";
const interfaces_1 = require('./interfaces');
exports.testLayout = [
    [
        { passable: false, type: interfaces_1.TileType.rock },
        { passable: false, type: interfaces_1.TileType.rock },
        { passable: true, type: interfaces_1.TileType.dirt },
        { passable: true, type: interfaces_1.TileType.dirt },
        { passable: true, type: interfaces_1.TileType.dirt }
    ],
    [
        { passable: false, type: interfaces_1.TileType.rock },
        { passable: true, type: interfaces_1.TileType.dirt },
        { passable: true, type: interfaces_1.TileType.dirt },
        { passable: false, type: interfaces_1.TileType.water },
        { passable: true, type: interfaces_1.TileType.dirt }
    ],
    [
        { passable: true, type: interfaces_1.TileType.dirt },
        { passable: true, type: interfaces_1.TileType.dirt },
        { passable: true, type: interfaces_1.TileType.dirt },
        { passable: true, type: interfaces_1.TileType.dirt },
        { passable: true, type: interfaces_1.TileType.dirt }
    ],
    [
        { passable: true, type: interfaces_1.TileType.dirt },
        { passable: false, type: interfaces_1.TileType.water },
        { passable: true, type: interfaces_1.TileType.dirt },
        { passable: true, type: interfaces_1.TileType.dirt },
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