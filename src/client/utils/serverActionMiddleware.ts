import { updateMessages } from './socket_io';

export default store => next => action => {
  console.log('in middleware', action);
  updateMessages(action);
  return next(action);
};