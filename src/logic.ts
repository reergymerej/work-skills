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

export const getNewSkills = (
  skills: Skill[],
  job: Job,
): SkillProps[] => {
  const newSkills = job.skills.filter(skill => {
    const playerSkill = getPlayerSkill(skills, skill.name)
    return playerSkill === undefined
  })

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
    // degrade skills
    const jobSkill = getJobSkill(job, skill.name)

    let nextKnowledge = Math.max(skill.knowledge - 1, 0)
    let nextExperience = Math.max(skill.experience - 1, 0)

    if (jobSkill !== undefined) {
      nextKnowledge = nextKnowledge <= jobSkill.knowledge
        ? nextKnowledge + 2
        : nextKnowledge
      nextExperience = Math.min(skill.experience + 3, 600)
    }
    return {
      ...skill,
      knowledge: nextKnowledge,
      experience: nextExperience,
    }
  })

  return nextSkills
}
