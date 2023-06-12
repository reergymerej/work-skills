import {useContext} from "react"
import {AppContext, AppDispatchContext} from "./AppContext"
import Button from "./Button"
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
              <div className="Buttons">
                <Button onClick={handlePrevJob}>prev</Button>
                <Button onClick={handleApply} disabled={!canApply}>apply</Button>
                <Button onClick={handleNextJob}>next</Button>
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
