import './Dashboard.css'
import { useCollection } from '../../hooks/useCollection'
import ProjectList from '../../components/ProjectList'
import ProjectFilter from './ProjectFilter'
import { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

export default function Dashboard() {
  const [filterVal, setFilterVal] = useState('all')
  const [filteredProjects, setFilteredProjects] = useState([])
  const {documents, error} = useCollection('projects')
  const {user} = useAuthContext()

  const getFilter = (val) => {
    setFilterVal(val)
  }

  useEffect(() => {
    if(documents) {
      if(filterVal === 'all') { 
        setFilteredProjects(documents)
      }
      else if(filterVal === 'mine') {
        setFilteredProjects(documents.filter(project => project.createdBy.id === user.uid))
      } else {
        setFilteredProjects(documents.filter(project => project.category === filterVal))
      }
    }
  }, [documents, filterVal])

  return (
    <div>
      <h1>Dashboard</h1>
      {error && <p className='error'>{error}</p>}
      {documents && <ProjectFilter getFilter={getFilter} />}
      {filteredProjects && <ProjectList projects={filteredProjects} />}
    </div>
  )
}
