import { createContext, useState, useContext, useEffect } from 'react'

type AuthContextType = {
    user: UserDataType,
    updateUser: (newUserData: UserDataType) => void,
    logout: () => void
}

type UserDataType = {
    accessToken: string | null
    isRegistrationPending: boolean
}

const DEFAULT_USER_DATA: UserDataType = {
    accessToken: null,
    isRegistrationPending: false
}

const AuthContext = createContext<AuthContextType>({
    user: DEFAULT_USER_DATA,
    updateUser: (newUserData) => '',
    logout: () => ''
});

// Create a provider component to wrap around the App
export function AuthContextProvider({ children }) {
    const [user, setUser] = useState<UserDataType>(DEFAULT_USER_DATA)
    const [effectChalGaya, setEffectChalGaya] = useState(false)

    const updateUser = (newUserData: UserDataType, force: boolean = false) => {
        if (effectChalGaya || force) {
            setUser(newUserData)

            sessionStorage.setItem('user', JSON.stringify(newUserData))
        }
    }

    const logout = () => updateUser(DEFAULT_USER_DATA)

    useEffect(() => {
        let storedData = sessionStorage.getItem('user')

        setEffectChalGaya(true)

        if (storedData)
            updateUser(JSON.parse(storedData), true)
    }, [])

    return (
        <AuthContext.Provider value={{ user, updateUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to access the context
export function useAuth() {
    return useContext(AuthContext)
}

export function getUser() {
    let user = sessionStorage.getItem('user')

    if (user)
        return JSON.parse(user)

    return DEFAULT_USER_DATA
}