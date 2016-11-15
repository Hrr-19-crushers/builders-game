import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';
import socketMiddleware from './utils/serverActionMiddleware';

const store = createStore(
  rootReducer,
  applyMiddleware(socketMiddleware)
);
export default store;