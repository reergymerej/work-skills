import {Job, SkillProps} from "./types"

const getJobSkill = (job: Job, name: string): SkillProps | undefined => {
  return job.skills.find(skill => {
    return skill.name === name
  })
}

export const getNewSkills = (
  skills: SkillProps[],
  job: Job,
): SkillProps[] => {
  return skills.map(skill => {
    const jobSkill = getJobSkill(job, skill.name)

    // add skills per job
    // degrade skills
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
}


