import {
  GENERATE_SLOTS,
  UPDATE_SLOTS,
  BOOK_SLOT,
  SET_BOOKING_SLOT_INDEX,
} from "./ActionTypes";


export const generateSlots=()=>{
  return {
    type:GENERATE_SLOTS,
  }
}

export const updateSlots=(data)=>{
  return {
    type:UPDATE_SLOTS,
    data,
  }
}

export const setBookingSlotIndex=(data)=>{
  return {
    type:SET_BOOKING_SLOT_INDEX,
    data,
  }
}
export const bookSlot=(data)=>{
  return {
    type:BOOK_SLOT,
    data,
  }
}
