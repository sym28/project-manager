import { useAuthContext } from "./useAuthContext"
import { useState, useEffect } from "react"
import { getAuth, signOut } from "firebase/auth"
import {doc, setDoc} from 'firebase/firestore'
import { db } from "../firebase/config"

export const useSignout = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const {dispatch, user} = useAuthContext()


    const logout = async () => {
        setError(null)
        setIsPending(true)

        // sign user out
        try {
            // update online status to false
            await setDoc(doc(db, 'users', user.uid), {online: false}, {merge: true})
            
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