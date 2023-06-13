import {useContext} from 'react'
import {AppContext, AppDispatchContext} from '../AppContext'
import Button from '../Button'
import {Technology} from '../types'


const TechnologySection = () => {
  const {
    day,
    technologies,
  } = useContext(AppContext)
  const dispatch = useContext(AppDispatchContext)

  const handleCreateTechnology = () => {
    dispatch({
      type: 'technologyCreate',
    })
  }

  const handleStudyClick = (name: Technology['name']) => {
    dispatch({
      type: 'study',
      value: name,
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
              className="p-1 flex justify-start gap-x-4"
            >
              <Button
                color="teal"
                extraClassName="mr-4"
                onClick={() => handleStudyClick(technology.name)}
              >study</Button>
              <div className="font-bold w-24">{technology.name}</div>
              <div className="age">{day - technology.createdDay}</div>
              <div className="demand text-xs">{technology.demand}</div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default TechnologySection
