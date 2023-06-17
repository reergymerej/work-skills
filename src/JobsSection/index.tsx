import {useContext} from 'react'
import {AppContext, AppDispatchContext} from '../AppContext'
import Button from '../Button'
import {currency, isQualified} from '../logic'
import {Job} from '../types'

const JobsSection = () => {
  const {
    job,
    jobFocusedId,
    jobs,
    skills,
  } = useContext(AppContext)
  const dispatch = useContext(AppDispatchContext)

  const handleApplyClick = (job: Job) => {
    dispatch({
      type: 'jobSet',
      value: job,
    })
  }

  const handleJobClick = (job: Job) => {
    dispatch({
      type: 'jobFocus',
      value: job.id,
    })
  }

  return (
    <div>
      <ul>
        {jobs.map(thisJob => {
          const isCurrentJob = !!job && job.id && job.id === thisJob.id
          const canApply = !isCurrentJob && !!thisJob && isQualified(skills, thisJob)
          const isFocused = jobFocusedId && jobFocusedId === thisJob.id
          return (
            <li
              key={thisJob.id}
              className="p-1 flex justify-start gap-x-4"
            >
              <Button
                color="teal"
                extraClassName=""
                onClick={() => handleApplyClick(thisJob)}
                disabled={!canApply}
              >apply</Button>
              <div
                className={`cursor-pointer hover:underline ${isFocused ? 'font-bold' : ''}`}
                onClick={() => handleJobClick(thisJob)}
              >
                  ${currency(thisJob.basePay)} - {thisJob.duration}
              </div>
              <div>
                {isCurrentJob && '*'}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default JobsSection
