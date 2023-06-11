import {useContext} from 'react'
import {AppContext, AppDispatchContext} from '../AppContext'
import './TechnologySection.css'


const TechnologySection = () => {
  const {
    day,
    technologies,
  } = useContext(AppContext)
  const dispatch = useContext(AppDispatchContext)

  const handleCreateTechnology = () => {
    dispatch({
      type: 'technologyCreate',
      value: day,
    })
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
              <div className="name">{technology.name}</div>
              <div className="age">{day - technology.createdDay}</div>
              <div className="demand">{technology.demand}</div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default TechnologySection
