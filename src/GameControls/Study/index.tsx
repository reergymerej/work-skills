import {useContext} from "react"
import {AppContext, AppDispatchContext} from "../../AppContext"
import {skillNames} from "../../data"
import {addSkillKnowledge} from "../../logic"
import './Study.css'

const Study = () => {
  const dispatch = useContext(AppDispatchContext)
  const {
    skills,
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
        <div className="buttons">
          {skillNames.map(skillName => {
            return (
              <button
                key={skillName}
                onClick={handleStudyClick(skillName)}>{skillName}</button>
            )
          })}
        </div>
    </div>
  )
}


export default Study
