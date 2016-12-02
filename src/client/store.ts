import {createStore} from 'redux';

import rootReducer from './reducers/rootReducer';
import {GameState} from './reducers/gameReducer';
import {UserState} from './reducers/userReducer';

export interface StoreState {
  gameState: Object;
  chatReducer: Object;
  userState: Object;
};

const store = createStore(
  rootReducer
);

const getState = (): StoreState => store.getState() as StoreState;

export const getGameState = (): GameState => getState().gameState as GameState;

export const getUserState = (): UserState => getState().userState as UserState;

export default store;
