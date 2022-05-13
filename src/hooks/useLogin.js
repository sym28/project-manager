import { useAuthContext } from "./useAuthContext"
import { useState, useEffect } from "react"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../firebase/config"
export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const {dispatch} = useAuthContext()

    const login = async (email, password) => {
        setError(false)
        setIsPending(true)

        try {
            // login user
            const auth = getAuth()
            const res = await signInWithEmailAndPassword(auth, email, password)

            // update online status to true
            await setDoc(doc(db, 'users', res.user.uid), {online: true}, {merge: true})

            dispatch({type: 'LOGIN', payload: res.user})


            if(!isCancelled){
                setIsPending(false)
                setError(null)
            }
            
        } catch(err) {
            if(!isCancelled) {
                console.dir(err.message)
                setError('Email/password incorrect.')
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return {login, error, isPending}

}