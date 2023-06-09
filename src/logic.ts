import {Job, Qualifications, Skill, SkillMatch} from "./types"

const getPlayerSkill = (skills: Skill[], name: string): Skill | undefined => {
  return skills.find(skill => {
    return skill.name === name
  })
}

const getJobSkill = (job: Job, name: string): Skill | undefined => {
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
): Skill[] => {

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

// Get rating to quantify how closely an applicant's skill matches.
const getSkillMatch = (
  applicantSkill: Skill | undefined,
  jobSkill: Skill,
): SkillMatch => {
  const knowledgeRatio = applicantSkill
    ? applicantSkill.knowledge / jobSkill.knowledge
    : 0
  const experienceRatio = applicantSkill
    ? applicantSkill.experience / jobSkill.experience
    : 0
  return {
    experience: Math.min(experienceRatio, 1),
    knowledge: Math.min(knowledgeRatio, 1),
    name: jobSkill.name,
  }
}



// See how a set of skills stack up against a job's skills.
export const getQualifications = (
  skills: Skill[],
  job: Job,
): Qualifications => {
  return job.skills.map(jobSkill => {
    const applicantSkill = getPlayerSkill(skills, jobSkill.name)
    const skillMatch = getSkillMatch(applicantSkill, jobSkill)
    return {
      name: jobSkill.name,
      knowledge: skillMatch.knowledge,
      experience: skillMatch.experience,
    }
  })
}

export const isQualified = (
  skills: Skill[],
  job: Job,
): boolean => {
  // for each job skill
  // how does the applicant's skills compare?
  return true
}

