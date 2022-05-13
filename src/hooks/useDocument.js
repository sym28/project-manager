import { doc, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase/config'

export const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const docRef = doc(db, collection, id)
    const unsub = onSnapshot(docRef, (doc) => {
      if (!doc.data()) {
        setError('Document does not exist')
      } else {
        setError(null)
        setDocument({ ...doc.data(), id })
      }
    },(error) => {
      console.log(error)
      setError(error.message)
    })
    return () => unsub()
  }, [collection, id])


  return { document, error }

}


// getDoc(docRef).then((docSnap) => {
    //   console.log(docSnap)
    //   setDocument(docSnap.data())
    // }).catch((error) => {
    //   console.log(error)
    //   setError(error)
    // })