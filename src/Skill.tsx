import {SkillProps} from "./types"

const Skill = (props: SkillProps) => {
  return (
        <div className="Skill">
          <div className="name">
            {props.name}
          </div>
          <div className="values">
            <div className="value knowledge"
              style={{
                width: `${props.knowledge}px`,
              }}
            />
            <div className="value experience"
              style={{
                width: `${props.experience}px`,
              }}
            />
          </div>
        </div>
  )
}

export default Skill
