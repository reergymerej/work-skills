export type Job = SkillSetProps & {
  name: string,
}

export type Skill = {
  name: string
  experience: number
  knowledge: number
}

export type SkillProps = Skill

export type SkillSetProps = {
  skills: SkillProps[],
}

export type JobCompProps = {
  job: Job,
}

