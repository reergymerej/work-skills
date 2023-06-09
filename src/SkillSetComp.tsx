import Skill from "./Skill"
import {SkillSetProps} from "./types"


const SkillSetComp = (props: SkillSetProps) => {
  return (
    <div className="SkillSetComp">
      {props.skills.map((skill) => {
        return (
          <Skill
            key={skill.name}
            name={skill.name}
            experience={skill.experience}
            knowledge={skill.knowledge}
          />
        )
      })}
    </div>
  )
}


export default SkillSetComp
