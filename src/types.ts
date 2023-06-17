export type SkillSet = {
  skills: Skill[],
}

export type Job = SkillSet & {
  id: string,
  name: string,
  qualificationThreshold: number,
  basePay: number,
  duration: number | null,
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
  jobFocusedId: Job['id'] | null,
  jobIndex: number,
  jobs: Job[],
  running: boolean,
  skills: Skill[],
  technologies: Technology[],
  time: number,
}

export const factoryAppState = (state: Partial<AppState> = {}): AppState => {
  return {
    day: 0,
    job: null,
    jobFocusedId: null,
    jobIndex: 0,
    jobs: [],
    running: false,
    skills: [],
    technologies: [],
    time: Date.now(),
    ...state,
  }
}

export type Technology = {
  createdDay: AppState['day'],
  name: string,
  demand: number,
}
