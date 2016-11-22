"use strict";
const actionTypes_1 = require('../actions/actionTypes');
exports.INITIAL_STATE = {
    charState: {
        charHealth: 100,
        charLocation: {
            x: 0,
            y: 4
        },
        charName: 'Link'
    }
};
exports.gameState = (state = exports.INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes_1.NEXT_TURN:
            const votes = action
                .payload
                .choices
                .map(choice => ({ name: choice, count: 0 }));
            const turn = {
                prompt: action.payload.prompt,
                votes
            };
            return Object.assign({}, state, { turn });
        case actionTypes_1.VOTE:
            const voteChoice = [
                ...state
                    .turn
                    .votes
                    .filter(choice => choice.name !== action.payload), {
                    name: action.payload,
                    count: state
                        .turn
                        .votes
                        .filter(choice => choice.name === action.payload)[0]
                        .count + 1
                }
            ]
                .sort(choice => choice.count)
                .reverse();
            const newTurn = Object.assign(state.turn, { votes: voteChoice });
            return Object.assign({}, state, newTurn);
        case actionTypes_1.OUTCOME:
            return Object.assign({}, state, { outcome: action.payload });
        case actionTypes_1.UPDATE_CHAR:
            console.log('updated char state', Object.assign({}, state, { charState: action.payload }).charState.charLocation);
            return Object.assign({}, state, { charState: action.payload });
        default:
            return state;
    }
};
//# sourceMappingURL=gameReducer.js.map