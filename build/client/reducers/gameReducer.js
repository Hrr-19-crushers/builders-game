"use strict";
const actionTypes_1 = require('../actions/actionTypes');
exports.INITIAL_STATE = {
    charState: {
        charHealth: 100,
        charLocation: {
            x: 39,
            y: 52
        },
        charName: 'Link',
        charTriForce: []
    }
};
exports.gameState = (state = exports.INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes_1.UPDATE_CHAR:
            return Object.assign({}, state, { charState: action.payload });
        case actionTypes_1.UPDATE_BOARD:
            return Object.assign({}, state, { gameBoard: action.payload });
        default:
            return state;
    }
};
//# sourceMappingURL=gameReducer.js.map