// styles
import './Create.css'

import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'
import { Timestamp } from 'firebase/firestore'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { useNavigate } from 'react-router-dom'

export default function Create() {
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState(null)
  const [users, setUsers] = useState([])

  // hooks
  const { documents } = useCollection('users')
  const { user: loggedInUser } = useAuthContext()
  const { response, addDocument } = useFirestore('projects')

  const navigate = useNavigate()

  useEffect(() => {
    if (response.success) {
      console.log('response success')
      navigate('/')
    }
  }, [response])


  useEffect(() => {
    if (documents) {
      setUsers(documents.map((user) => {
        return { value: user, label: user.displayName }
      }))
    }
  }, [documents])

  const options = [
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)

    if (!category) {
      setFormError('Please select a category')
      return
    }
    if (assignedUsers.length < 1) {
      setFormError('Please assign at least 1 user')
      return
    }

    const timeStamp = Timestamp
    const createdBy = {
      displayName: loggedInUser.displayName,
      photoURL: loggedInUser.photoURL,
      id: loggedInUser.uid
    }
    const assignedUsersList = assignedUsers.map((user) => {
      return {
        displayName: user.value.displayName,
        photoURL: user.value.photoURL,
        id: user.value.id
      }
    })

    const project = {
      name,
      details,
      dueDate: timeStamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList,
      category
    }

    console.dir(project)

    await addDocument(project).then((e) => {
      console.log(e)
      console.log(response)
    })
    // await addDocument(project)
    // if(!response.error){
    //   navigate('/')
    // }


  }


  return (
    <div className='create-form'>
      <h2 className="page-title">Create a new projet</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project Name:</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea
            required
            type="text"
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>
        <label>
          <span>Project Date:</span>
          <input
            required
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Project Category:</span>
          <Select
            options={options}
            onChange={(option) => setCategory(option.value)}
          />
        </label>
        <label>
          <span>Assign To:</span>
          <Select
            isMulti
            options={users}
            onChange={(val) => setAssignedUsers(val)}
          />
        </label>
        <button className='btn'>Add Project</button>
        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  )
}
