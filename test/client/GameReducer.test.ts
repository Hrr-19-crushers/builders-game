import {expect} from 'chai';

// reducers
import {Choice, Turn, GameState, gameState, INITIAL_STATE} from '../../src/client/reducers/gameReducer';

// action creators
import {nextTurnAction, voteAction} from '../../src/client/actions/gameActions';

describe('game reducer', () => {
  let state: GameState;
  beforeEach(() => {
    state = INITIAL_STATE;
  });

  it('can increment the vote count', () => {
    const nextState = gameState(state, voteAction('crab'));
    expect(nextState.turn.votes[0].count).to.equal(1);
  });

  it('can switch to the next turn', () => {
    const prompt = 'It is the next turn.  Will you run or hide?';
    const choices = ['run', 'hide'];
    const nextState = gameState(state, nextTurnAction(prompt, choices));
    expect(nextState.turn.prompt).to.equal('It is the next turn.  Will you run or hide?');
    expect(nextState.turn.votes[0].name).to.equal('run');
  });
});