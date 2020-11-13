import React, {createContext, useState} from 'react'
import {Alert} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

const AuthContext = createContext()

export const AuthProvider = props => {
  const [loged, setLoged] = useState(false)

  deleteStorage = async () => {
    try {
      await AsyncStorage.removeItem('@user')
    } catch(e) {
      console.log(`Erro na delecao do Storage. Detalhes: ${e}`)
    }
  }
  const logoutWithoutAuthorization = () => {
    deleteStorage()
    setLoged(false)
  }
  const logout = () => Alert.alert(
    "Desconectar",
    "Você gostariar mesmo de desconectar de sua conta?",
    [ { text: "Cancelar" }, { text: "Desconectar", onPress: () => (deleteStorage(), setLoged(false)) } ], { cancelable: false })
    
  return(
    <AuthContext.Provider value={{loged, setLoged, logout, logoutWithoutAuthorization}}>
      {
        props.children
      }
    </AuthContext.Provider>
  )
}

export default AuthContext