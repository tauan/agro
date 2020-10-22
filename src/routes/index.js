import React, {useContext, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthRoutes from './auth.routes';
import AuthContext from '../contexs/Auth'
import {UserProvider} from '../contexs/User'
import MainRoutes from './main.routes';

export default props => {
  const { loged } = useContext(AuthContext)
  return (
    <NavigationContainer>
      <UserProvider>
        {loged === false && <AuthRoutes />}
        {loged === true && <MainRoutes />}
      </UserProvider>
    </NavigationContainer>
  );
};