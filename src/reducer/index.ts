import {Action} from "../actions"
import {addSkillKnowledge, getNewSkills, loop} from "../logic"
import {AppState, factoryAppState} from "../types"
import jobsReducer from "./jobs"
import technologiesReducer from "./technologies"

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
        jobs: jobsReducer(state.jobs, action, state),
        skills: getNewSkills(state.skills, state.job),
        technologies: technologiesReducer(state.technologies, action, state),
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
      // TODO: split this so reducers can handle on their own without needing to
      // be called by this one
      return {
      ...state,
      technologies: technologiesReducer(state.technologies, action, state),
    }
    case 'jobCreate': {
      return {
        ...state,
        jobs: jobsReducer(
          state['jobs'],
          action,
          state,
        ),
      }
    }
    case 'study': {
      return {
        ...state,
        skills: addSkillKnowledge(state.skills, action.value, 10),
      }
    }
  }
}

