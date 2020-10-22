import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { StatusBar} from 'react-native'

import ProductsScreen from '../pages/Products/Product';  

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
      <Stack.Screen name="ProductsScreen" component={ProductsScreen} />
    </Stack.Navigator>
    </>
  );
};
export default MainRoutes;
