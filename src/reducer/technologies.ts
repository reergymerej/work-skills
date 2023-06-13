import {Action} from "../actions"
import {by, createTechnology} from "../logic"
import {AppState, Technology} from "../types"

const reduceDemand = (demand: number): number => {
  const x = Math.random()
  const willReduce = x <= 0.4
  if (willReduce) {
    return demand - (Math.random() / 1000)
  }
  return demand
}

const ageTech = (tech: Technology[]): Technology[] => {
  return tech.map((t) => {
    return {
      ...t,
      demand: reduceDemand(t.demand),
    }
  }).filter(x => x.demand > 0)
}

const createTechAndAdd = (
  tech: Technology[],
  day: number,
): Technology[] => {
    const field: keyof Technology = 'createdDay'
    return [
      ...tech,
      createTechnology(tech, day),
    ].sort(by(field, -1))
}

const technologiesReducer = (
  state: AppState['technologies'],
  action: Action,
  allState: AppState,
): AppState['technologies'] => {
  switch (action.type) {
    case 'dayNext': {
      let nextTech = ageTech(state)
      const newTechOdds = 1 / 30
      if (Math.random() < newTechOdds) {
        nextTech = createTechAndAdd(state, allState['day'])
      }
      return nextTech
    }
    case 'technologyCreate': {
      return createTechAndAdd(state, allState['day'])
    }
    default:
      return state
  }
}

export default technologiesReducer
