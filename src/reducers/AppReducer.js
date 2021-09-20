import {
  TOGGLE_SESSION,
  SET_SESSION,
  MARK_BACKGROUND_TIME
} from "../actions/ActionTypes";

const initialState = {
    isSessionActive:false,
    backGroundTime:Date.now(),
}

const appReducer = (state = initialState, action)=>{
  console.log('Reducer :'+JSON.stringify(action));
  switch (action.type) {

    case TOGGLE_SESSION: {
        return {...state, isSessionActive: !state.isSessionActive }
    }

    case SET_SESSION:{
      return {...state, isSessionActive: action.data }
    }

    case MARK_BACKGROUND_TIME:{
      return {...state, backGroundTime: action.data }
    }

    default :{
      return state;
    }

  }
}

export default appReducer;