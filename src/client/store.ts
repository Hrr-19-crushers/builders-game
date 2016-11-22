import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';
//import socketMiddleware from './utils/serverActionMiddleware';
import chatMiddleware from './utils/chatActionMiddleware';
interface StoreState {
  gameState: Object;
  chatReducer: Object;
};

const store = createStore(
  rootReducer,
  applyMiddleware(chatMiddleware),
);

export const getGameState = () => {
  const state = store.getState() as StoreState;
  return state.gameState;
};

export default store;