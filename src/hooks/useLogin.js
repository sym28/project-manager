import { useAuthContext } from "./useAuthContext"
import { useState, useEffect } from "react"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const {dispatch} = useAuthContext()

    const login = async (email, password) => {
        setError(false)
        setIsPending(true)

        // sign user out
        try {
            const auth = getAuth()
            const res = await signInWithEmailAndPassword(auth, email, password)
            dispatch({type: 'LOGIN', payload: res.user})
            if(!isCancelled){
                setIsPending(false)
                setError(null)
            }
        } catch(err) {
            if(!isCancelled) {
                console.log(err.message)
                setError('Oops, cannot find account with the login details provided. Please try again.')
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return {login, error, isPending}

}