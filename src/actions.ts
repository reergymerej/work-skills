import {AppState, Job, Technology} from "./types"

type Loaded = {
  type: 'loaded',
  value: AppState,
}

type RunningToggle = {
  type: 'runningToggle'
}

type DayNext = {
  type: 'dayNext',
}


type JobSet = {
  type: 'jobSet',
  value: Job,
}

type Reset = {
  type: 'reset',
}

type WantAdNext = {
  type: 'wantAdNext',
}

type WantAdPrev = {
  type: 'wantAdPrev',
}


export type Action =
  | DayNext
  | JobSet
  | Loaded
  | Reset
  | RunningToggle
  | WantAdNext
  | WantAdPrev
  | {
    type: 'technologyCreate',
  }
  | {
    type: 'jobCreate',
    value: AppState['day'],
  }
  | {
    type: 'study',
    value: Technology['name'],
  }
  | {
    type: 'jobFocus',
    value: Job['id'],
  }
