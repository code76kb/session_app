import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from "redux-persist";
import {combineReducers} from "redux";
import appReducer from "./AppReducer";


const persistConfig = {
  key:'test_app_root',
  storage:AsyncStorage,
  whitelist:["appReducer"],//Reducer's to be saved 
  blacklist:[]
}

const allCombineReducers = combineReducers({appReducer});
const persistedReducer = persistReducer(persistConfig,allCombineReducers);
export default persistedReducer;