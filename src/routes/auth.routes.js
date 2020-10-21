import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { StatusBar} from 'react-native'

import LoginScren from '../pages/Login';
import RegisterScreen from '../pages/Register';  
import PasswordScreen from '../pages/Password';  
import ProductsScreen from '../pages/Products/Product';  

const Stack = createStackNavigator();

const AuthRoutes = props => {
  return (
    <>
    <StatusBar backgroundColor="#fff" barStyle="dark-content"  />
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        animationEnabled: false,
      }}>
      <Stack.Screen name="LoginScreen" component={LoginScren} />
      <Stack.Screen name="ProductsScreen" component={ProductsScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
    </>
  );
};
export default AuthRoutes;
