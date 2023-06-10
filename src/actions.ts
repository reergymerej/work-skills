import {AppState, Job, Skill} from "./types"

type Loaded = {
  type: 'loaded',
  value: AppState,
}

type SkillsSet = {
  type: 'skillsSet',
  value: Skill[],
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


export type Action =
  | DayNext
  | JobSet
  | Loaded
  | Reset
  | RunningToggle
  | SkillsSet