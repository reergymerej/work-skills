import SkillSetComp from "./SkillSetComp"
import {Job, Qualifications} from "./types"

type JobCompProps = {
  job: Job,
  qualifications: Qualifications,
}

const JobComp = (props: JobCompProps) => {
  return (
    <div className="Job">
      <div className="name">{props.job.name}</div>
      <SkillSetComp
        skills={props.job.skills}
        qualifications={props.qualifications}
      />
    </div>
  )
}


export default JobComp
