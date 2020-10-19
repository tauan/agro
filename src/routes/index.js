import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthRoutes from './auth.routes';
//import MainRoutes from './main.routes';

export default () => {
  const [loged, setLoged] = useState(false);

  return (
    <NavigationContainer>
         <AuthRoutes />
    </NavigationContainer>
  );
};
