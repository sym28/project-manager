import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../../components/Avatar";
import {useAuthContext} from '../../hooks/useAuthContext'
import { useFirestore } from "../../hooks/useFirestore";


export default function ProjectSummary({project}) {
  const {user} = useAuthContext()
  const {deleteDocument, response} = useFirestore('projects')
  const navigate = useNavigate()

  const handleDelete = async (e) => {
    e.preventDefault()
    try {
      await deleteDocument(project.id)
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">{project.name}</h2>
        <p>Created by {project.createdBy.displayName}</p>
        <p className="due-date">Project deadline: {project.dueDate.toDate().toDateString()}</p>
        <p className="details">{project.details}</p>
        <h4>Project is assigned to:</h4>
        <div className="assigned-users">
          {project.assignedUsersList.map(user => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
      </div>
      {user.uid === project.createdBy.id ? 
      <button className='btn' onClick={handleDelete}>Delete</button> 
      : null} 
    </div>
  )

}