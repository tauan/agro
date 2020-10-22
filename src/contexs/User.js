import React, {createContext, useState} from 'react'

const UserContext = createContext()

export const UserProvider = props => {
  const [user, setUser] = useState({})
  const {children} = props
  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext