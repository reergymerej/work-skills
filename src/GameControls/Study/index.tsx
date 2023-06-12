import {useContext} from "react"
import {AppContext, AppDispatchContext} from "../../AppContext"
import Button from "../../Button"
import {addSkillKnowledge} from "../../logic"
import './Study.css'

const Study = () => {
  const dispatch = useContext(AppDispatchContext)
  const {
    skills,
    technologies,
  } = useContext(AppContext)
  const handleStudyClick = (skillName: string) => () => {
    const newSkills = addSkillKnowledge(skills, skillName, 10)
    dispatch({
      type: 'skillsSet',
      value: newSkills,
    })
  }

  return (
    <div className="Study">
        <div className="Buttons">
          {technologies.map(technonogy => {
            const {name} = technonogy
            return (
              <Button
                key={name}
                onClick={handleStudyClick(name)}>{name}</Button>
            )
          })}
        </div>
    </div>
  )
}


export default Study
