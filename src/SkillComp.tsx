import SkillBarsComp from "./SkillBarsComp"
import {Skill, SkillMatch} from "./types"


type SkillCompProps = Skill & {
  skillMatch: SkillMatch | undefined,
}


const SkillComp = (props: SkillCompProps) => {
  const knowledgeRatio = (props.skillMatch && props.skillMatch.knowledge) || 0
  const experienceRatio = (props.skillMatch && props.skillMatch.experience) || 0
  return (
        <div className="Skill">
          <div className="font-bold">
            {props.name}
          </div>
          <div className="values">
            <SkillBarsComp
              ratio={knowledgeRatio}
              name='knowledge'
              value={props.knowledge}
            />

            <SkillBarsComp
              ratio={experienceRatio}
              name='experience'
              value={props.experience}
            />
          </div>
        </div>
  )
}

export default SkillComp
