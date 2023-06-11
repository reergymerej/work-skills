import {useContext} from 'react'
import {AppContext, AppDispatchContext} from '../AppContext'
import Button from '../Button'

const JobsSection = () => {
  const {
    day,
    jobs,
  } = useContext(AppContext)
  const dispatch = useContext(AppDispatchContext)

  const handleCreateTechnology = () => {
    dispatch({
      type: 'jobCreate',
      value: day,
    })
  }

  return (
    <div>
      <div className="font-bold text-xl">
        Jobs
      </div>
      <Button
        onClick={handleCreateTechnology}
      >create</Button>
      <ul>
        {jobs.map(job => {
          return (
            <li
              key={job.id}
            >
              <div className="name">
                {job.name} - {job.id}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default JobsSection

