import { useState, useEffect } from "react"
import {useAuthContext} from './useAuthContext'
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'
import {setDoc, doc} from 'firebase/firestore'
import {storage, db} from '../firebase/config'

export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const {dispatch} = useAuthContext()
    

    const signup = async (email, password, displayName, thumbnail) => {
        setError(null)
        setIsPending(true)

        try {
            // signup user
            const auth = getAuth()
            const res = await createUserWithEmailAndPassword(auth, email, password)
            console.log(res.user)

            if(!res){
                throw new Error('Could not complete signup')
            }

            // handle user thumbnail
            const uploadPath = `/thumbnails/${res.user.uid}/${thumbnail.name}`
            const storageRef = ref(storage, uploadPath)
            const uploadTask = uploadBytesResumable(storageRef, thumbnail)

            // listen for state changes
            uploadTask.on('state_changed',
                (snapshot) => {
                    // task progress
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                    console.log('Upload progress: ' + progress + '%')
                },
                (error) => {
                    // error handling
                    console.log(error)
                },
                async () => {
                    // upload success
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
                    console.log('file available at: ', downloadURL)

                    // add display name + image to user
                    await updateProfile(res.user, {displayName, photoURL: downloadURL})

                    // add user document
                    await setDoc(doc(db, 'users', res.user.uid), {
                        online: true,
                        displayName,
                        photoURL: downloadURL
                    })
                    // run dispatch login action
                    dispatch({type: 'LOGIN', payload: res.user})
                }
            )

            
            // update state
            if(!isCancelled) {
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

    return {error, isPending, signup}
}