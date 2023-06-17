import {useContext} from 'react'
import {AppContext, AppDispatchContext} from '../AppContext'
import Button from '../Button'
import {isQualified} from '../logic'
import {Job} from '../types'

const JobsSection = () => {
  const {
    jobs,
    skills,
    jobFocusedId,
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
        {jobs.map(job => {
          const canApply = !!job && isQualified(skills, job)
          const isFocused = jobFocusedId && jobFocusedId === job.id
          return (
            <li
              key={job.id}
              className="p-1 flex justify-start gap-x-4"
            >
              <Button
                color="teal"
                extraClassName="mr-4"
                onClick={() => handleApplyClick(job)}
                disabled={!canApply}
              >apply</Button>
              <div
                className={`cursor-pointer hover:underline ${isFocused ? 'font-bold' : ''}`}
                onClick={() => handleJobClick(job)}
              >
                  {job.name}
                 - {job.duration}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default JobsSection
