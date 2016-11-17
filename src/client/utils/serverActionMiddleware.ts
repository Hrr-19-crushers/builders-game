import { updateMessages } from './socket_io';

export default store => next => action => {
  updateMessages(action);
  return next(action);
};