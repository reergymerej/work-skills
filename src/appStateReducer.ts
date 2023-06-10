import {Action} from "./actions"
import {loop} from "./logic"
import {AppState, factoryAppState} from "./types"

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
  }
}
