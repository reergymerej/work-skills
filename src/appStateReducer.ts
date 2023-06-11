import {Action} from "./actions"
import {by, createTechnology, loop} from "./logic"
import {AppState, factoryAppState, Job, Technology} from "./types"

export const initialAppState: AppState = factoryAppState()

const jobReducer = (
  state: AppState['job'],
  action: Action,
): AppState['job'] => {
  switch (action.type) {
    case 'jobSet':
      return action.value
    case 'dayNext': {
      const duration = state && ((state.duration || Infinity) - 1)
      if (duration === 0) {
        return null
      }
      return state && {
        ...state,
        duration,
      }
    }
    default:
      return state
  }
}

const technologiesReducer = (
  state: AppState['technologies'],
  action: Action,
): AppState['technologies'] => {
  switch (action.type) {
    case 'technologyCreate': {
      const field: keyof Technology = 'createdDay'
      return [
        ...state,
        createTechnology(state, action.value),
      ].sort(by(field, -1))
    }
    default:
      return state
  }
}

export const appStateReducer = (
  state: AppState,
  action: Action,
): AppState => {
  switch (action.type) {
    case 'loaded':
      return {
        ...state,
        ...action.value,
      }
    case 'skillsSet':
      return {
        ...state,
        skills: action.value,
      }
    case 'runningToggle':
      return {
        ...state,
        running: !state.running,
      }
    case 'jobSet':
      return {
        ...state,
        job: jobReducer(state.job, action),
      }
    case 'dayNext':
      return {
        ...state,
        day: state.day + 1,
        job: jobReducer(state.job, action),
      }
    case 'reset':
      return {
        ...initialAppState,
      }
    case 'wantAdNext':
    case 'wantAdPrev':
      return {
        ...state,
        jobIndex: loop(
            state.jobIndex,
            action.type === 'wantAdNext'
            ? 1
            : -1,
            state.jobs.length - 1,
        ),
      }
    case 'wantAdsToggle':
      return {
        ...state,
        wantAdsOpen: !state.wantAdsOpen,
      }
    case 'technologyCreate':
      return {
      ...state,
      technologies: technologiesReducer(state.technologies, action),
    }
    case 'jobCreate': {
      const id = action.value + '.' + (Date.now() % 1e3)
      const newJob: Job = {
        basePay: 1000,
        duration: Infinity,
        id,
        name: id,
        qualificationThreshold: 0.2,
        skills: [],
      }
      return {
        ...state,
        jobs: [
          ...state.jobs,
          newJob,
        ],
      }
    }
  }
}
