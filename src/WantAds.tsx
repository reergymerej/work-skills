import {useState} from "react"
import JobComp from "./Job"
import {loop} from "./logic"
import {Job} from "./types"

type WantAdsProps = {
  jobs: Job[],
  onNewJob: (job: Job) => void,
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
  const handleApply = () => {
    const isQualified = true
    if (isQualified) {
      props.onNewJob(job)
    }
  }
  return (
    <div className="WantAds">
      <h2>
        want ads
      </h2>
      <div className="controls">
        <button onClick={handlePrevJob}>prev</button>
        <button onClick={handleApply}>apply</button>
        <button onClick={handleNextJob}>next</button>
      </div>
      <div>
        <JobComp job={job} />
      </div>
    </div>
  )
}

export default WantAds