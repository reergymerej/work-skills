import {useContext} from 'react'
import {AppContext, AppDispatchContext} from '../AppContext'
import Button from '../Button'
import {getSkillByName} from '../logic'
import {Technology} from '../types'


const TechnologySection = () => {
  const {
    technologies,
    skills,
  } = useContext(AppContext)
  const dispatch = useContext(AppDispatchContext)

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
      <ul>
        {technologies.map(technology => {
          const skill = getSkillByName(skills, technology.name)
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
              <div>
                {skill && skill.knowledge} {skill && Math.round(skill.experience)}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default TechnologySection
