import {useContext} from "react"
import {AppContext, AppDispatchContext} from "./AppContext"
import JobComp from "./Job"
import {getQualifications, isQualified} from "./logic"


const WantAds = () => {
  const {
    jobIndex,
    jobs,
    skills,
  } = useContext(AppContext)
  const dispatch = useContext(AppDispatchContext)
  const job = jobs[jobIndex]

  const handleNextJob = () => {
    dispatch({
      type: 'wantAdNext',
    })
  }
  const handlePrevJob = () => {
    dispatch({
      type: 'wantAdPrev',
    })
  }
  const canApply = !!job && isQualified(skills, job)

  const handleApply = () => {
    if (canApply) {
      dispatch({
        type: 'jobSet',
        value: job,
      })
    }
  }

  return (
    <div className="WantAds">
      <h2>
        want ads
      </h2>
      {job
        ? (
          <>
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
                qualifications={getQualifications(skills, job)}
              />
            </div>
          </>
        )
        : 'no jobs'
      }
    </div>
  )
}

export default WantAds
