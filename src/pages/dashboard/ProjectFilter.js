import { useState } from "react"

export default function ProjectFilter({getFilter}) {
  const [currentFilter, setCurrentFilter] = useState('all')
  const filterList = ['all', 'mine', 'development', 'design', 'marketing', 'sales']

  const handleClick = (category) => {
    setCurrentFilter(category)
    getFilter(category)
  }

  return (
    <div className="project-filter">
      <nav>
        <p>Filter:</p>
        {filterList.map((category) => (
          <button 
            className={currentFilter === category ? 'active' : ''} 
            key={category} 
            onClick={() => handleClick(category)}
          >
            {category}
          </button>
        ))}
      </nav>
    </div>
  )
}