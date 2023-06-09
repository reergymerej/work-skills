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
