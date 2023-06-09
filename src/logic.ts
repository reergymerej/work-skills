import {Job, Skill, SkillProps} from "./types"

const getPlayerSkill = (skills: Skill[], name: string): Skill | undefined => {
  return skills.find(skill => {
    return skill.name === name
  })
}

const getJobSkill = (job: Job, name: string): SkillProps | undefined => {
  return job.skills.find(skill => {
    return skill.name === name
  })
}

const getNewSkillsFromJob = (job: Job, currentSkills: Skill[]) => {
  return job.skills.filter(skill => {
    const playerSkill = getPlayerSkill(currentSkills, skill.name)
    return playerSkill === undefined
  })
}

export const getNewSkills = (
  skills: Skill[],
  job: Job | null,
): SkillProps[] => {

  const newSkills = job
    ? getNewSkillsFromJob(job, skills)
    : []

  let nextSkills: Skill[] = []
  if (newSkills.length) {
    nextSkills = newSkills.map(skill => {
      return {
        ...skill,
        knowledge: 1,
        experience: 1,
      }
    })
  }

  nextSkills = [
    ...nextSkills,
    ...skills,
  ]

  nextSkills = nextSkills.map(skill => {
    const MAX_EXPERIENCE = 300
    const GAIN_EXPERIENCE = 1
    const GAIN_KNOWLEDGE = 2
    // degrade skills
    const jobSkill = job
      ? getJobSkill(job, skill.name)
      : undefined

    let nextKnowledge = Math.max(skill.knowledge - 1, 0)
    let nextExperience = Math.max(skill.experience - 1, 0)

    if (jobSkill !== undefined) {
      nextKnowledge = nextKnowledge <= jobSkill.knowledge
        ? nextKnowledge + GAIN_KNOWLEDGE
        : nextKnowledge
      nextExperience = Math.min(
        skill.experience + GAIN_EXPERIENCE,
        MAX_EXPERIENCE
      )
    }
    return {
      ...skill,
      knowledge: nextKnowledge,
      experience: nextExperience,
    }
  })
  .filter(skill => {
    return skill.experience > 0 || skill.knowledge > 0
  })

  return nextSkills
}

type Change = 1 | -1
export const loop = (
  current: number,
  change: Change,
  max: number,
): number =>  {
  const next = current + change
  if (next < 0) {
    return max
  }
  return next % (max + 1)
}
