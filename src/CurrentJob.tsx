import JobComp from "./Job"
import {getQualifications} from "./logic"
import {Job, Skill} from "./types"

type CurrentJobProps = {
  skills: Skill[],
  job: Job | null,
}

const CurrentJob = (props: CurrentJobProps) => {
  return (
    <div>
      <h2>Current Job</h2>
      {props.job
        ? (
          <JobComp
            job={props.job}
            qualifications={getQualifications(
              props.skills,
              props.job,
            )}
          />
        )
        : 'unemployed'
      }
    </div>
  )
}

export default CurrentJob
