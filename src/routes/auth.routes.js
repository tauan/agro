import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { StatusBar} from 'react-native'

import LoginScren from '../pages/Login';

const Stack = createStackNavigator();

const AuthRoutes = props => {
  return (
    <>
    <StatusBar backgroundColor="#fff" barStyle="dark-content" />
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        animationEnabled: false,
      }}>
      <Stack.Screen name="LoginScreen" component={LoginScren} />
    </Stack.Navigator>
    </>
  );
};
export default AuthRoutes;
