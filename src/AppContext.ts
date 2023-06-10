import {createContext, Dispatch} from "react"
import {initialAppState} from "./appStateReducer"

export const AppContext = createContext(initialAppState)
export const AppDispatchContext = createContext((() => undefined) as Dispatch<any>)
