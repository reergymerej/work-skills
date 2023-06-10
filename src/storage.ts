import {AppState, factoryAppState} from "./types"

const APP_ID = 'com.reergymerej.skills'

export const saveAppState = (state: AppState): boolean => {
  try {
    localStorage.setItem(APP_ID, JSON.stringify({
      ...state,
      time: Date.now(),
    }))
    return true
  } catch {}
  return false
}

export const loadSavedAppState = (): AppState => {
  const savedData = localStorage.getItem(APP_ID)
  if (savedData) {
    try {
      return JSON.parse(savedData)
    } catch {
      console.warn('corrupted app state loaded, resetting')
      console.debug(savedData)
      saveAppState(factoryAppState())
    }
  }
  return factoryAppState()
}

