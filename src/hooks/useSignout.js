import { useAuthContext } from "./useAuthContext"
import { useState, useEffect } from "react"
import { getAuth, signOut } from "firebase/auth"

export const useSignout = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const {dispatch} = useAuthContext()


    const logout = async () => {
        setError(null)
        setIsPending(true)

        // sign user out
        try {
            const auth = getAuth()
            await signOut(auth)
            dispatch({type: 'LOGOUT'})
            if(!isCancelled){
                setIsPending(false)
                setError(null)
            }
        } catch(err) {
            if(!isCancelled) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return {logout, error, isPending}
}