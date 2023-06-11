import {createContext, Dispatch} from "react"
import {Action} from "./actions"
import {initialAppState} from "./appStateReducer"

export const AppContext = createContext(initialAppState)
export const AppDispatchContext = createContext((() => undefined) as Dispatch<Action>)
