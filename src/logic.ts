import {AppState, Job, Qualifications, Skill, SkillMatch, Technology} from "./types"

export const unique = (v: any, i: number, a: any[]): boolean => i === a.indexOf(v)

const getSkillIndex = (skills: Skill[], name: string): number => {
  return skills.findIndex((skill) => {
    return skill.name === name
  })
}

export const getSkillByName = (skills: Skill[], name: string): Skill | undefined => {
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
    ? applicantSkill.knowledge / Math.max(jobSkill.knowledge, 1)
    : 0
  const experienceRatio = applicantSkill
    ? applicantSkill.experience / Math.max(jobSkill.experience, 1)
    : 0
  const experience = Math.min(experienceRatio, 1)
  const knowledge = Math.min(knowledgeRatio, 1)
  return {
    experience,
    knowledge,
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

interface ByAble {
  [name: string]: any
}
export const by = <T extends ByAble>(field: string, direction = 1) => (a: T, b: T) => {
  if (!a.hasOwnProperty(field) || !b.hasOwnProperty(field)) {
    throw new Error(`missing "${field}"`)
  }
  if (a[field] < b[field]) {
    return -1 * direction
  } else if (a[field] > b[field]) {
    return 1 * direction
  }
  return 0
}

const rand = (min: number, max: number): number => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const getRandomWord = (length: number): string => {
  const a = 'a'.charCodeAt(0)
  const z = a + 25
  const min = a
  const max = z
  let word = ''
  while (word.length < length) {
    word = word + String.fromCharCode(rand(min, max))
  }
  return word
}

const getNewTechName = (existing: Technology['name'][]): Technology['name'] => {
  const length = rand(2, 4)
  let name = ''
  do {
    name = getRandomWord(length)
  } while (existing.indexOf(name) > -1)
  return name
}

export const createTechnology = (
  existing: Technology[],
  day: AppState['day'],
): Technology => {
  const name = getNewTechName(existing.map(t => t.name))
  return {
    createdDay: day,
    demand: rand(0, 100) / 100,
    name,
  }
}

type Stacked = {
  min: number,
  max: number,
  name: string,
}

const getPickFromStacked = (stackedList: Stacked[], pick: number): Stacked | undefined => {
  return stackedList.find(stacked => {
    return pick >= stacked.min && pick <= stacked.max
  })
}

const getInDemandTech = (tech: AppState['technologies']): Technology => {
  const totalDemand = tech.reduce((acc, value) => {
    return acc + value.demand
  }, 0)
  const field: keyof Technology = 'demand'
  const orderedByDemand = [...tech].sort(by(field, 1))
  let stackedList: Stacked[] = []
  orderedByDemand.forEach((technology, index) => {
    // must round to avoid floating point issues
    const previousMax = index === 0
      ? 0
      : stackedList[index - 1].max
    const adjustedDemand = Math.round(technology.demand * 100)
    stackedList = [
      ...stackedList,
      {
        min: previousMax + 1,
        max: previousMax + adjustedDemand,
        name: technology.name,
      }
    ]
  })
  const pickValue = rand(1, totalDemand * 100)
  const picked = getPickFromStacked(stackedList, pickValue)
  if (picked === undefined) {
    throw new Error('pick failed')
  }
  const inDemandTech = tech.find(x => x.name === picked.name)
  if (inDemandTech === undefined) {
    throw new Error('could not find tech')
  }
  return inDemandTech
}

const getKnowledgeRequirement = (tech: Technology): number => {
  return rand(0, 90)
}

const getExperienceRequirement = (tech: Technology, age: number): number => {
  return rand(0, age)
}

const getInDemandSkill = (
  tech: AppState['technologies'],
  day: AppState['day'],
): Skill => {
  const inDemandTech: Technology = getInDemandTech(tech)
  return {
    name: inDemandTech.name,
    knowledge: getKnowledgeRequirement(inDemandTech),
    experience: getExperienceRequirement(inDemandTech, day - inDemandTech.createdDay),
  }
}

const getInDemandSkills = (
  tech: AppState['technologies'],
  count: number,
  day: AppState['day'],
): Skill[] => {
  let skills: Skill[] = []
  let attempts = 0
  const MAX_ATTEMPTS = 10
  // If there are very few skills and we want a lot and one of them is very
  // rare, it may be hard to ever select it by chance.
  while (skills.length < count && attempts++ < MAX_ATTEMPTS) {
    try {
      const nextSkill = getInDemandSkill(tech, day)
      if (skills.some(x => x.name === nextSkill.name)) {
        continue
      }
      skills = [
        ...skills,
        nextSkill,
      ]
    } catch {}
  }
  return skills
}

const getBasePay = (skills: Skill[]): number => {
  const knowledge = skills.reduce((acc, value) => acc + value.knowledge, 0)
  const experience = skills.reduce((acc, value) => acc + value.experience, 0)
  return knowledge * 1000 + experience * 10
}

export const getNewJob = (
  day: AppState['day'],
  tech: AppState['technologies'],
): Job => {
  if (tech.length === 0) {
    throw new Error('unable to create job with no tech')
  }
  const techMin = Math.min(2, tech.length)
  const techMax = Math.min(3, tech.length)
  const techCount = rand(techMin, techMax)
  const id = day + '.' + (Date.now() % 1e3)
  const skills = getInDemandSkills(tech, techCount, day)
  const qualificationThreshold = Math.trunc(Math.random() * 100) / 100
  const duration = rand(4, 52) * 7
  const basePay = getBasePay(skills)
  const newJob: Job = {
    basePay,
    duration,
    id,
    name: id,
    qualificationThreshold,
    skills,
  }
  return newJob
}

export const currency = (x: number): string => {
  let asString = (x + '').split('').reverse().join('')
  let sections: string[] = []
  for (let i = 0; i < asString.length; i += 3) {
    const end = Math.min(i + 3, asString.length)
    const section = asString.substring(i, end)
    sections = [
      ...sections,
      section,
    ]
  }
  return sections.join(',').split('').reverse().join('')
}

