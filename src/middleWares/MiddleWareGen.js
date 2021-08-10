import { GENERATE_SLOTS,  } from "../actions/ActionTypes";
import {updateSlots} from "../actions/Actions";
import { DAILY_WORKING_HR, DAY_OPENING_HR, SLOT_DAYS, SLOT_SIZE, DAY_SIZE } from "../const";

const TAG = "MIDDLE-WARE GEN:";
export default middleWareGen = store => next => action => {

  switch(action.type){
    case GENERATE_SLOTS:{
      generateSlot(store);
    }
    default:{
      next(action);
    }
  }

}


generateSlot=(store)=>{
  console.log(TAG+"Generating Slots....");
  const state = store.getState();

  let expireWindow = (Date.now()) - (1000*60*60*SLOT_SIZE);
  let slotsParDay  = (DAILY_WORKING_HR/SLOT_SIZE);
  let totalSlots   =  slotsParDay*SLOT_DAYS;
  const SLOT_SIZE_TIME = (60*60*1000*SLOT_SIZE); // mill-sec

  console.log(TAG,"TotalSlots:"+totalSlots+" slotsParDAy :"+slotsParDay);
  
  let slots = state.appReducer.slots;
  let remainingSlots = [];
  //Filter-out expired slots
  for (let index = 0; index < slots.length; index++) {
    if(slots[index].openingTime > expireWindow)
      remainingSlots.push(slots[index]);
  }
  //Generate Remaining Slots
  
  const DAY_CLOSING_HR = DAY_OPENING_HR + (slotsParDay*SLOT_SIZE);
  
  let date = new Date();

  date.setHours(DAY_OPENING_HR,0,0,0);
  console.log(TAG+"DAY OPENING TIME :"+date.toString());
  const DAY_OPENING_TIME = date.getTime();

  date.setHours(DAY_CLOSING_HR,0,0,0);
  const DAY_CLOSING_TIME = date.getTime(); //mill-sec
  console.log(TAG+"DAY CLOSING TIME :"+date.toString());

  console.log(TAG,"OPening HR :"+DAY_OPENING_HR+" CLosing HR :"+DAY_CLOSING_HR);  
  console.log(TAG+"OPENING TIME:"+DAY_OPENING_TIME+" CLOSING TIME :"+DAY_CLOSING_TIME);

  let slotsToGen = totalSlots - remainingSlots.length;  

  var nextSlotOpeningTime = DAY_OPENING_TIME;
  for (let index = 0; index < slotsToGen; index++) {
      if(remainingSlots.length>0)
      {
        const lastSlot = remainingSlots[remainingSlots.length-1];
        // console.log(TAG+"Last Slot Opening Time :"+lastSlot.openingTime);
        nextSlotOpeningTime = lastSlot.closingTime;
        // chk if slot moved to nxt day
        let date = new Date(nextSlotOpeningTime);
        if( date.getHours() >= DAY_CLOSING_HR ){ 
          console.log(TAG + "MOVING TO NEXT DAY at:"+index);
          let date  =  new Date(nextSlotOpeningTime);
          date.setHours(DAY_OPENING_HR);
          nextSlotOpeningTime = date.getTime() + DAY_SIZE;
        }
      }
      let nextSlotClosingTime = nextSlotOpeningTime + SLOT_SIZE_TIME;
      //create a slot
      let newSlot = {
        openingTime : nextSlotOpeningTime,
        closingTime : nextSlotClosingTime,
        bookingStatus : false, //avail
        slotTimeSize:SLOT_SIZE,
        bookedFor:null, 
      }
      remainingSlots.push(newSlot);
  }
  store.dispatch(updateSlots({list:remainingSlots}));
}