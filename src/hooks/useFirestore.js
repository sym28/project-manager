import { useReducer, useEffect, useState } from "react";
import {db} from '../firebase/config'
import {collection, addDoc, serverTimestamp, doc, deleteDoc, updateDoc} from 'firebase/firestore'

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    // add and delete case currently the same but kept in case changes needed
    switch (action.type) {
        case 'IS_PENDING':
            return {isPending: true, document: null, success: false, error: null}
        case 'ADDED_DOCUMENT':
            return {document: action.payload, error: null, success: true, isPending: false}
        case 'DELETED_DOCUMENT':
            return {isPending: false, success: true, error: null}
        case 'UPDATE_DOCUMENT':
            return {isPending: false, success: true, error: null, document: action.payload}
        case 'ERROR':
            return {error: action.payload, isPending: false, document: null, success: false}
        default:
            return state
    }
}

export const useFirestore = (col) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)


    // only dispatch if not cancelled
    const dispatchIfNotCancelled = (action) => {
        if(!isCancelled) {
            dispatch(action)
        }
    }

    
    // add a document
    const addDocument = async (doc) => {
        dispatch({type: 'IS_PENDING'})
        try {
            const createdAt = serverTimestamp()
            console.log(createdAt)
            const docRef = await addDoc(collection(db, col), {...doc, createdAt})
            dispatchIfNotCancelled({type: 'ADDED_DOCUMENT', payload: docRef})
        } catch(error) {
            dispatchIfNotCancelled({type: 'ERROR', payload: error.message})
        }
    }

    // update a document
    const updateDocument = async (docID, data) => {
        dispatch({type: 'IS_PENDING'})
        try {
            const docRef = doc(db, col, docID)
            await updateDoc(docRef, data)
            dispatchIfNotCancelled({type: 'UPDATE_DOCUMENT', payload: docID + ' comment added' })

        } catch(error) {
            dispatchIfNotCancelled({type: 'ERROR', payload: error.message})
            return error.message
        }
    }

    // delete document
    const deleteDocument = async (id) => {
        dispatch({type: 'IS_PENDING'})
        try {
            const res = await deleteDoc(doc(db, col, id))
            dispatchIfNotCancelled({type: 'DELETED_DOCUMENT'})
            return res
        } catch(error) {
            dispatchIfNotCancelled({type: 'ERROR', payload: error.message})
            return error.message
        }

    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])
   
    return {response, addDocument, deleteDocument, updateDocument}
}