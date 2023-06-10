import {Action} from "./actions"
import {AppState, factoryAppState} from "./types"

export const initialAppState: AppState = factoryAppState()

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
        job: action.value,
      }
    case 'dayNext':
      return {
        ...state,
        day: state.day + 1,
      }
    case 'reset':
      return {
        ...initialAppState,
      }
  }
}


