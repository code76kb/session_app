import {
  SET_BOOKING_SLOT_INDEX,
  UPDATE_SLOTS,
} from "../actions/ActionTypes";

const initialState = {
  slots:[],
  bookingSlotIndex:{
    index:null,
  },
}

const appReducer = (state = initialState, action)=>{
  switch (action.type) {

    case UPDATE_SLOTS: {
        return {...state, slots:action.data }
    }

    case SET_BOOKING_SLOT_INDEX: {
      return {...state, bookingSlotIndex: action.data}
    }

    default :{
      return state;
    }

  }
}

export default appReducer;