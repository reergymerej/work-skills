import {Job, Qualifications, Skill, SkillMatch} from "./types"

export const unique = (v: any, i: number, a: any[]): boolean => i === a.indexOf(v)

const getSkillIndex = (skills: Skill[], name: string): number => {
  return skills.findIndex((skill) => {
    return skill.name === name
  })
}

const getSkillByName = (skills: Skill[], name: string): Skill | undefined => {
  return skills.find(skill => {
    return skill.name === name
  })
}


const getMissingSkills = (skills: Skill[], currentSkills: Skill[]): Skill[] => {
  return skills.filter(skill => {
    const playerSkill = getSkillByName(currentSkills, skill.name)
    return playerSkill === undefined
  })
}

const getNewSkillsFromJob = (job: Job, currentSkills: Skill[]) => {
  return getMissingSkills(job.skills, currentSkills)
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
    const MAX_EXPERIENCE = 100
    const GAIN_EXPERIENCE = 1
    const GAIN_KNOWLEDGE = 2
    const LOSE_EXPERIENCE = 0.2
    const LOSE_KNOWLEDGE = 1
    // degrade skills
    const jobSkill = job
      ? getSkillByName(job.skills, skill.name)
      : undefined

    let nextKnowledge = Math.max(skill.knowledge - LOSE_KNOWLEDGE, 0)
    let nextExperience = Math.max(skill.experience - LOSE_EXPERIENCE, 0)

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
    const applicantSkill = getSkillByName(skills, jobSkill.name)
    const skillMatch = getSkillMatch(applicantSkill, jobSkill)
    return {
      name: jobSkill.name,
      knowledge: skillMatch.knowledge,
      experience: skillMatch.experience,
    }
  })
}

export const getQualificationRating = (qualifications: Qualifications): number => {
  const count = qualifications.length
  const sum = qualifications.reduce((value: number, current): number => {
    return value + current.experience + current.knowledge
  }, 0)
  return (sum / (count * 2)) * 100
}


export const isQualified = (
  skills: Skill[],
  job: Job,
): boolean => {
  const qualifications = getQualifications(skills, job)
  const qualificationRating = getQualificationRating(qualifications)
  return qualificationRating >= job.qualificationThreshold
}

export const addSkillKnowledge = (skills: Skill[], name: string, value: number): Skill[] => {
  const skillIndex = getSkillIndex(skills, name)
  if (skillIndex === -1) {
    return [
      ...skills,
      {
        name,
        knowledge: value,
        experience: 0,
      },
    ]
  }
  return skills.map((skill, index) => {
    if (index === skillIndex) {
      return {
        ...skill,
        knowledge: skill.knowledge + value,
      }
    }
    return skill
  })
}
