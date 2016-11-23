import {expect} from 'chai';

// reducers
import {Choice, Turn, GameState, gameState, INITIAL_STATE} from '../../src/client/reducers/gameReducer';

// action creators
import {nextTurnAction, voteAction, updateCharAction} from '../../src/client/actions/gameActions';

describe('game reducer', () => {
  let state: GameState;
  beforeEach(() => {
    state = INITIAL_STATE;
  });

  xit('can increment the vote count', () => {
    // const nextState = gameState(state, voteAction('crab'));
    // expect(nextState.turn.votes[0].count).to.equal(1);
  });

  xit('can switch to the next turn', () => {
    // const prompt = 'It is the next turn.  Will you run or hide?';
    // const choices = ['run', 'hide'];
    // const nextState = gameState(state, nextTurnAction(prompt, choices));
    // expect(nextState.turn.prompt).to.equal('It is the next turn.  Will you run or hide?');
    // expect(nextState.turn.votes[0].name).to.equal('run');
  });

  it('can update character state', () => {
    const nextCharState = {
      charHealth: 80,
      charLocation: [1,0],
      charName: 'Link'
    };
    const nextState = gameState(INITIAL_STATE, updateCharAction(nextCharState));
    expect(nextState.charState.charHealth).to.equal(80);
    expect(nextState.charState.charLocation).to.eql([1,0]);
  });
});