/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Component } from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import HomeScreen from './src/screens/HomeScreen';
import { store, persistor } from './src/store';

export default class App extends Component {
  render(){
    return (
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HomeScreen/>
      </PersistGate>         
      </Provider>
    );
  }
}
