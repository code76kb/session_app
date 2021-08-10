const TAG = "MIDDLE-WARE-LOGGER:";
export default middleWareUpdateLogger = store => next => action => {
  // const state = store.getState();

  let updateAction = action;
  updateAction.data= {...action.data,updateTime:Date.now()};

  next(updateAction);
}
