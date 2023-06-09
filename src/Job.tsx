import SkillSetComp from "./SkillSetComp"
import {JobCompProps} from "./types"

const JobComp = (props: JobCompProps) => {
  return (
    <div className="Job">
      <div className="name">{props.job.name}</div>
      <SkillSetComp skills={props.job.skills} />
    </div>
  )
}


export default JobComp
