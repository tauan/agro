import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { StatusBar} from 'react-native'

import HomeScreen from '../pages/Home';  

const Stack = createStackNavigator();

const MainRoutes = props => {
  return (
    <>
    <StatusBar backgroundColor="#fff" barStyle="dark-content"  />
    <Stack.Navigator
      headerMode="none"      
      screenOptions={{
        animationEnabled: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen}  />
    </Stack.Navigator>
    </>
  );
};
export default MainRoutes;
