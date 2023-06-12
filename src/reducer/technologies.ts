import {Action} from "../actions"
import {ageTech, by, createTechnology} from "../logic"
import {AppState, Technology} from "../types"

const technologiesReducer = (
  state: AppState['technologies'],
  action: Action,
): AppState['technologies'] => {
  switch (action.type) {
    case 'dayNext': {
      return ageTech(state)
    }
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

export default technologiesReducer
