import { useEffect, useState } from "react"
import {db} from '../firebase/config'
import {onSnapshot, collection, where, query, orderBy} from 'firebase/firestore'

export const useCollection = (collectionName, uid) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const q = query(collection(db, collectionName))
        const unsub = onSnapshot(q, (snapshot) => {
            let results = []
            snapshot.docs.forEach(doc => results.push({...doc.data(), id: doc.id}))
            setDocuments(results)
            setError(null)
        }, (error) => {
            console.log(error)
            setError(error.message)
        })
        
        // unsubscribe on component unmount
        return unsub

    }, [collectionName, uid])

    return {documents, error}
}
