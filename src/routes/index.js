import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthRoutes from './auth.routes';
import {AuthProvider} from '../contexs/Auth'
//import MainRoutes from './main.routes';

export default props => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <AuthRoutes />
      </AuthProvider>
    </NavigationContainer>
  );
};
