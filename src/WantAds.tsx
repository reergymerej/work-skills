import JobComp from "./Job"
import {getQualifications, isQualified} from "./logic"
import {Job, Skill} from "./types"

type WantAdsProps = {
  jobs: Job[],
  onNewJob: (job: Job) => void,
  onNext: () => void,
  onPrev: () => void,
  skills: Skill[],
  jobIndex: number,
}

const WantAds = ({
  jobIndex,
  jobs,
  onNewJob,
  onNext,
  onPrev,
  skills,
}: WantAdsProps) => {
  const job = jobs[jobIndex]

  const handleNextJob = () => {
    onNext()
  }
  const handlePrevJob = () => {
    onPrev()
  }
  const qualifications = getQualifications(skills, job)
  const canApply = isQualified(skills, job)
  const handleApply = () => {
    if (canApply) {
      onNewJob(job)
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
