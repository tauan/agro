import 'react-native-gesture-handler';
import React from 'react';
import Routes from './routes'
import FlashMessage from "react-native-flash-message";
import { AuthProvider } from './contexs/Auth'

export default function App() {
  return (
    <>
      <AuthProvider>
        <Routes />
      </AuthProvider>
      < FlashMessage position=" top " />
    </>
  )
}
