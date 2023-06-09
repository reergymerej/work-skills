import SkillComp from "./SkillComp"
import {Skill} from "./types"

type SkillSetProps = {
  skills: Skill[],
}

const SkillSetComp = (props: SkillSetProps) => {
  return (
    <div className="SkillSetComp">
      {props.skills
        .sort((a, b) => {
          if (a.name < b.name) {
            return -1
          } else if (a.name > b.name) {
            return 1
          }
          return 0
        })
        .map((skill) => {
        return (
          <SkillComp
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
