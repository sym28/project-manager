import { createContext, useEffect, useReducer } from "react";
import {onAuthStateChanged, getAuth} from 'firebase/auth'
import '../firebase/config'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {...state, user: action.payload}
        case 'LOGOUT':
            return {...state, user: null}
            // case if user logged in
        case 'AUTH_IS_READY':
            return {...state, user: action.payload, authIsReady: true}

        default:
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false
    })

    useEffect(() => {
        const auth = getAuth()
        // returns unsubscrible func - used to unsub from onAuthStateChanged observer
        const unsub = onAuthStateChanged(auth, (user) => {
            dispatch({type: 'AUTH_IS_READY', payload: user})
            unsub()
        })
    }, [])

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}