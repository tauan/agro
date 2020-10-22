import React, {useContext, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthRoutes from './auth.routes';
import AuthContext, {AuthProvider} from '../contexs/Auth'
import MainRoutes from './main.routes';

export default props => {
  const { loged } = useContext(AuthContext)
  return (
    <NavigationContainer>
        {loged === false && <AuthRoutes />}
        {loged === true && <MainRoutes />}
    </NavigationContainer>
  );
};
