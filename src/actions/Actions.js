import {
  TOGGLE_SESSION,
  SET_SESSION,
  MARK_BACKGROUND_TIME,
} from "./ActionTypes";


export const toggleSession=()=>{
  return {
    type:TOGGLE_SESSION,
  }
}

export const setSession=(data)=>{
  return {
    type:SET_SESSION,
    data
  }
}

export const markBackGroundTime=(data)=>{
  return{
    type: MARK_BACKGROUND_TIME,
    data
  }
}


