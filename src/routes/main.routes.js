import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native'
import { ProductProvider } from '../contexs/ProductContext'
import { PropertiesProvider } from '../contexs/Properties'
import HomeScreen from '../pages/Home';
import PropertyScreen from '../pages/Property/';
import ProductScreen from '../pages/Products/index';
import ProductForm from '../pages/Products/Product';
import PropertiesForm from '../pages/Property/Properties';
import TagsScreen from '../pages/Tags';

const Stack = createStackNavigator();

const MainRoutes = props => {
  return (
    <ProductProvider>
      <PropertiesProvider>
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
          <Stack.Screen name="PropertiesForm" component={PropertiesForm} />
          <Stack.Screen name="TagsScreen" component={TagsScreen} />
        </Stack.Navigator>
      </PropertiesProvider>
    </ProductProvider>
  );
};
export default MainRoutes;
