import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native'
import { ProductProvider } from '../contexs/ProductContext'
import HomeScreen from '../pages/Home';
import PropertyScreen from '../pages/Property/';  
import ProductScreen from '../pages/Products/Product';
import ProductForm from '../pages/Products/Screens/Produto';
import TagsScreen from '../pages/Tags';

const Stack = createStackNavigator();

const MainRoutes = props => {
  return (
      <ProductProvider>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Stack.Navigator
          headerMode="none"
          screenOptions={{
            animationEnabled: false,
          }}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="PropertyScreen" component={PropertyScreen} />
          <Stack.Screen name="ProductScreen" component={ProductScreen} />
          <Stack.Screen name="ProductForm" component={ProductForm} />
          <Stack.Screen name="TagsScreen" component={TagsScreen} />
        </Stack.Navigator>
      </ProductProvider>
  );
};
export default MainRoutes;
