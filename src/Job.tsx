import {currency, getQualificationRating} from "./logic"
import SkillSetComp from "./SkillSetComp"
import {Job, Qualifications} from "./types"

type JobCompProps = {
  job: Job,
  qualifications: Qualifications,
}

const JobComp = (props: JobCompProps) => {
  const qualificationRating = getQualificationRating(props.qualifications)
  return (
    <div>
      <div>
        <div>
          <div>
            base pay: ${currency(props.job.basePay)}
          </div>
          <div>
            required qual: {props.job.qualificationThreshold}
          </div>
          <div>
            qualification: {Math.trunc(qualificationRating)}
          </div>
          <div>
            duration: {props.job.duration + ''}
          </div>
        </div>
      </div>
      <SkillSetComp
        skills={props.job.skills}
        qualifications={props.qualifications}
      />
    </div>
  )
}


export default JobComp
