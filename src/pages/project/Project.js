import './Project.css'
import {useParams} from 'react-router-dom'
import { useDocument } from '../../hooks/useDocument'
import ProjectSummary from './ProjectSummary'
import ProjectComments from './ProjectComments'

export default function Project() {
  const {id} = useParams()

  const {document, error} = useDocument('projects', id)
  
  return (
    <div>
      {error && <div className='error'>{error}</div>}

      {!document && !error && <div className='loading'>Loading</div>}

      {document && <div className='project-details'>
        <ProjectSummary project={document} />
        <ProjectComments project={document}></ProjectComments>
      </div>}
      
    </div>
  )
}
