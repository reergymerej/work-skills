import {allJobs, initialSkills} from "./data"

export type SkillSet = {
  skills: Skill[],
}

export type Job = SkillSet & {
  name: string,
  qualificationThreshold: number,
  basePay: number,
}

export type Skill = {
  name: string
  experience: number
  knowledge: number
}

export type SkillMatch = {
  experience: number,
  knowledge: number,
  name: string,
}

export type Qualifications = SkillMatch[]

export type AppState = {
  day: number,
  job: Job | null,
  jobIndex: number,
  jobs: Job[],
  running: boolean,
  skills: Skill[],
  time: number,
}

export const factoryAppState = (state: Partial<AppState> = {}): AppState => {
  return {
    day: 0,
    job: null,
    jobIndex: 0,
    jobs: allJobs,
    running: false,
    skills: initialSkills,
    time: Date.now(),
    ...state,
  }
}
