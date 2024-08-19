'use client'
import { AuthProviderProps, userSession } from '@/interfaces/Types'
import {useState, useEffect, createContext, useContext} from 'react'

export interface AuthContextProps {
    userData: userSession | null;
    setUserData: (userData: userSession | null) => void;
}

export const AuthContext = createContext<AuthContextProps>({
    userData: null,
    setUserData: () => {}
})

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [userData, setUserData] = useState<userSession | null>(null)

    useEffect(() => {
        if(userData) {
            localStorage.setItem("userSession", JSON.stringify({token: userData.token, userData: userData.userData}))
        }
    }, [userData])

    useEffect(() => {
        const userData = localStorage.getItem("userSession")
        setUserData(JSON.parse(userData!))
    }, [])

  return (
    <AuthContext.Provider value={{userData, setUserData}}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
