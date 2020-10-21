import React, {createContext, useState} from 'react'

const AuthContext = createContext()

export const AuthProvider = props => {
  const [loged, setLoged] = useState(false)
  return(
    <AuthContext.Provider value={{loged, setLoged}}>
      {
        props.children
      }
    </AuthContext.Provider>
  )
}

export default AuthContext