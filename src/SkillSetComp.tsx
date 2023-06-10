import {by} from "./logic"
import SkillComp from "./SkillComp"
import {Qualifications, Skill} from "./types"

type SkillSetProps = {
  skills: Skill[],
  qualifications: Qualifications | null,
}

const SkillSetComp = (props: SkillSetProps) => {
  const qualifications = props.qualifications || []
  return (
    <div className="SkillSetComp">
      {props.skills
        .sort(by('name'))
        .map((skill) => {
          const skillMatch = qualifications.find(q => q.name === skill.name)
          return (
            <SkillComp
              key={skill.name}
              name={skill.name}
              experience={skill.experience}
              knowledge={skill.knowledge}
              skillMatch={skillMatch}
            />
          )
        })}
    </div>
  )
}


export default SkillSetComp
