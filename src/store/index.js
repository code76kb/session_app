import { createStore, applyMiddleware, compose } from "redux";
import {persistStore} from "redux-persist";
import {createLogger} from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import persistedReducer from "../reducers";


const middleWares = [];
middleWares.push(createLogger());

const composeEnhancers = composeWithDevTools({
  trace:true,
  traceLimit:4,
});

const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(...middleWares)));

let persistor = persistStore(store);

export {store, persistor};