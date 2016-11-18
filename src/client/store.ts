import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';
import socketMiddleware from './utils/serverActionMiddleware';

interface StoreState {
  gameState: Object;
  chatReducer: Object;
};

const store = createStore(
  rootReducer,
  applyMiddleware(socketMiddleware)
);
export default store;

export const getGameState = () => {
  const state = store.getState() as StoreState;
  return state.gameState;
};