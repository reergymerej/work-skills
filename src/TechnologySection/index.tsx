import {useState} from 'react'
import {by, createTechnology} from '../logic'
import {Technology} from '../types'
import './TechnologySection.css'

const intialTechnologies: Technology[] = []

const TechnologySection = () => {
  const [technologies, setTechnologies] = useState<Technology[]>(intialTechnologies)

  const handleCreateTechnology = () => {
    const newTechnology: Technology = createTechnology(technologies)
    setTechnologies([
      ...technologies,
      newTechnology,
    ].sort(by('name')))
  }

  return (
    <div className="TechnologySection">
      <h2>
        Technology
      </h2>
      <button onClick={handleCreateTechnology}>create</button>
      <ul>
        {technologies.map(technology => {
          return (
            <li
              key={technology.name}
            >
              {technology.name} {technology.demand}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default TechnologySection
