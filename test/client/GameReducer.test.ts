import {expect} from 'chai';

// reducers
import {Choice, Turn, GameState, gameState} from '../../src/client/reducers/gameReducer';

// action creators
import {nextTurnAction, voteAction} from '../../src/client/actions/gameActions';

describe('game reducer', () => {
  let INITIAL_STATE: GameState;
  beforeEach(() => {
    INITIAL_STATE = {
      turnNumber: 0,
      turn: {
        prompt: 'We need 3 b\'s in the chat to start the game',
        votes: [
          {
            name: 'b',
            count: 0
          }
        ]
      }
    };
  });

  it('can increment the vote count', () => {
    const nextState = gameState(INITIAL_STATE, voteAction('b'));
    expect(nextState.turn.votes[0].count).to.equal(1);
  });

  it('can switch to the next turn', () => {
    const prompt = 'It is the next turn.  Will you run or hide?', ;
    const choices = ['run', 'hide'];
    const nextState = gameState(INITIAL_STATE, nextTurnAction(prompt, choices));
    expect(nextState.turn.prompt).to.equal('It is the next turn.  Will you run or hide?');
    expect(nextState.turn.votes[0].name).to.equal('run');
  });
});