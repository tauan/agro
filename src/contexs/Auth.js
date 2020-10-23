import React, {createContext, useState} from 'react'
import {Alert} from 'react-native'

const AuthContext = createContext()

export const AuthProvider = props => {
  const [loged, setLoged] = useState(false)

  const logout = () => Alert.alert(
    "Desconectar",
    "Você gostariar mesmo de desconectar de sua conta?",
    [ { text: "Cancelar" }, { text: "Desconectar", onPress: () => setLoged(false) } ], { cancelable: false })
    
  return(
    <AuthContext.Provider value={{loged, setLoged, logout}}>
      {
        props.children
      }
    </AuthContext.Provider>
  )
}

export default AuthContext