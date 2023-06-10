import JobComp from "./Job"
import {getQualifications} from "./logic"
import {Job, Skill} from "./types"

type CurrentJobProps = {
  skills: Skill[],
  job: Job | null,
}

const CurrentJob = ({
  job,
  skills,
}: CurrentJobProps) => {
  return (
    <div>
      <h2>Current Job</h2>
      {job
        ? (
          <JobComp
            job={job}
            qualifications={getQualifications(
              skills,
              job,
            )}
          />
        )
        : 'unemployed'
      }
    </div>
  )
}

export default CurrentJob
