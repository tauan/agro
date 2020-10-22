import 'react-native-gesture-handler';
import React from 'react';
import Routes from './routes'
import {AuthProvider} from './contexs/Auth'
export default function App()
{
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>)
}
