import {useContext} from 'react'
import {AppContext, AppDispatchContext} from '../AppContext'
import Button from '../Button'
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
      <div className="font-bold text-xl">
        Technology
      </div>
      <Button
        onClick={handleCreateTechnology}
      >create</Button>
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
