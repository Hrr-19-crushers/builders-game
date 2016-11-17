export default store => next => action => {
  // updateMessages(action);
  return next(action);
};