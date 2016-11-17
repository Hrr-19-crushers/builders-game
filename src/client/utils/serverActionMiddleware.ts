import { updateMessages } from './socket_io';
// FIXME: causes echo on every update when multiple clients logged in
export default store => next => action => {
  updateMessages(action);
  return next(action);
};