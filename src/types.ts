export type Job = SkillSetProps

export type SkillProps = {
  name: string
  experience: number
  knowledge: number
}

export type SkillSetProps = {
  skills: SkillProps[],
}
