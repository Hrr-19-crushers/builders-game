import {expect} from 'chai';

import {INITIAL_STATE, StatsState, statsState} from '../../src/client/reducers/statsReducer';
import {updateClientsAction} from '../../src/client/actions/statsActions';

describe('stats state', () => {
  let state;

  beforeEach(() => {
    state = INITIAL_STATE;
  });

  it('can update the number of current clients', () => {
    const nextState: StatsState = statsState(INITIAL_STATE, updateClientsAction(5));
    expect(nextState.clients).to.equal(5);
  });
});