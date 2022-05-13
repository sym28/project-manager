import { useEffect, useState } from 'react'
import {useAuthContext} from '../../hooks/useAuthContext'
import { Timestamp } from 'firebase/firestore'
import {useFirestore} from '../../hooks/useFirestore'
import Avatar from '../../components/Avatar'
import {formatDistanceToNow} from 'date-fns'


export default function ProjectComments({project}) {
  const [comment, setComment] = useState('')
  const {user} = useAuthContext()
  const {updateDocument, response} = useFirestore('projects')

  useEffect(() => {
    if(response.success) {
      setComment('')
    }
  },[response])


  const handleComment = async (e) => {
    e.preventDefault()
    const timestamp = Timestamp
    
    const commentDetails = {
      comment,
      createdAt: timestamp.fromDate(new Date()),
      createdBy: user.displayName,
      photoURL: user.photoURL,
      id: Math.random()
    }

    await updateDocument(project.id, {
      comments: [commentDetails, ...project.comments]
    })
    
  }

  return (
    <div className="project-comments">
      <h4>Project Comments</h4>
      <ul>
        {project.comments && 
          project.comments.map(comment => (
            <li key={comment.id}>
              <div className="comment-author">
                <Avatar src={comment.photoURL} />
                <p>{comment.createdBy}</p>
              </div>
                <div className="comment-date">
                  {formatDistanceToNow(comment.createdAt.toDate(),{addSuffix: true})}
                </div>
                <div className="comment-content">
                  <p>{comment.comment}</p>
                </div>
            </li>
          ))
        }
      </ul>

      <form className="add-comment" onSubmit={e => handleComment(e)}>
        <label>
          <span>Add new comment:</span>
          <textarea
            required
            type="text" 
            value={comment} 
            onChange={e => setComment(e.target.value)}/>
        </label>
        <button className='btn'>Submit</button>
      </form>
    </div>
  )
}