export default store => next => action => {
  console.log('in socket middleware');
  return next(action);
};