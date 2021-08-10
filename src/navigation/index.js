import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import SlotsScreen from '../screens/SlotsScreen';
import BookingScreen from '../screens/BookingScreen';

const AppStack = createStackNavigator();

const appStack=()=>{
  return(
    <AppStack.Navigator initialRouteName="Home">
      <AppStack.Screen name="Home" component={HomeScreen}/>
      <AppStack.Screen name="Slots" component={SlotsScreen}/>
      <AppStack.Screen name="Booking" component={BookingScreen}/>
    </AppStack.Navigator>
  )
}

export const appNavigation=()=>{
  return(
    <NavigationContainer>
      {appStack()}
    </NavigationContainer>
  )
}