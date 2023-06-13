import {Action} from "../actions"
import {getNewJob} from "../logic"
import {AppState, Job, Technology} from "../types"

const ageJobs = (jobs: Job[]): Job[] => {
  return jobs.map(job => {
    const duration = (job.duration || Infinity) - 1
    return {
      ...job,
      duration,
    }
  })
}
const removeExpiredJobs = (jobs: Job[]): Job[] => {
  return jobs.filter(x => x.duration === null || x.duration > 0)
}

const createAndAdd = (jobs: AppState['jobs'], day: number, tech: Technology[]): Job[] => {
  if (tech.length === 0) {
    console.warn('unable to create job without tech')
    return jobs
  }
    return [
      ...jobs,
      getNewJob(
       day,
        tech,
      ),
    ]
}


// all jobs, not current job
const jobsReducer = (
  state: AppState['jobs'],
  action: Action,
  allState: AppState,
): AppState['jobs'] => {
  switch (action.type) {
    case 'jobCreate': {
      return createAndAdd(state,
          allState['day'],
          allState['technologies'],
       )
    }
    case 'dayNext': {
      let nextJobs = removeExpiredJobs(
          ageJobs(state)
        )
      if (Math.random() < 0.1) {
        nextJobs = createAndAdd(nextJobs, allState['day'], allState['technologies'])
      }
      return nextJobs
    }
  }

  return state
}

export default jobsReducer
