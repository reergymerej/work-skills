import {useState} from "react"
import JobComp from "./Job"
import {getQualifications, isQualified, loop} from "./logic"
import {Job, Skill} from "./types"

type WantAdsProps = {
  jobs: Job[],
  onNewJob: (job: Job) => void,
  skills: Skill[],
}

const WantAds = (props: WantAdsProps) => {
  const [jobIndex, setJobIndex] = useState<number>(0)
  const job = props.jobs[jobIndex]

  const handleNextJob = () => {
    setJobIndex(loop(jobIndex, 1, props.jobs.length - 1))
  }
  const handlePrevJob = () => {
    setJobIndex(loop(jobIndex, -1, props.jobs.length - 1))
  }
  const qualifications = getQualifications(props.skills, job)
  const canApply = isQualified(props.skills, job)
  const handleApply = () => {
    if (canApply) {
      props.onNewJob(job)
    }
  }

  return (
    <div className="WantAds">
      <h2>
        want ads
      </h2>
      <div className="controls">
        <div className="buttons">
          <button onClick={handlePrevJob}>prev</button>
          <button onClick={handleApply} disabled={!canApply}>apply</button>
          <button onClick={handleNextJob}>next</button>
        </div>
      </div>
      <div>
        <JobComp
          job={job}
          qualifications={qualifications}
        />
      </div>
    </div>
  )
}

export default WantAds
