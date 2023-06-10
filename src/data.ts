import {unique} from "./logic"
import {Job, Skill} from "./types"

export const initialSkills: Skill[] = [
]

export const allJobs: Job[] = [
  {
    name: 'help desk',
    skills: [
      {
        experience: 0,
        name: 'html',
        knowledge: 20,
      },
      {
        experience: 0,
        name: 'css',
        knowledge: 10,
      },
    ],
    qualificationThreshold: 0,
    basePay: 40000,
    duration: Infinity,
  },
  {
    name: 'junior ui dev',
    skills: [
      {
        experience: 30,
        name: 'html',
        knowledge: 60,
      },
      {
        experience: 10,
        name: 'css',
        knowledge: 50,
      },
      {
        experience: 10,
        name: 'javascript',
        knowledge: 40,
      },
    ],
    qualificationThreshold: 38,
    basePay: 50000,
    duration: Infinity,
  },
  {
    name: 'junior web dev',
    skills: [
      {
        experience: 30,
        name: 'html',
        knowledge: 50,
      },
      {
        experience: 20,
        name: 'css',
        knowledge: 50,
      },
      {
        experience: 30,
        name: 'javascript',
        knowledge: 40,
      },
      {
        experience: 10,
        name: 'php',
        knowledge: 30,
      },
      {
        experience: 10,
        name: 'sql',
        knowledge: 20,
      },
    ],
    qualificationThreshold: 65,
    basePay: 50000,
    duration: Infinity,
  },
  {
    name: 'web dev',
    skills: [
      {
        experience: 40,
        name: 'html',
        knowledge: 70,
      },
      {
        experience: 30,
        name: 'css',
        knowledge: 70,
      },
      {
        experience: 30,
        name: 'javascript',
        knowledge: 60,
      },
      {
        experience: 30,
        name: 'php',
        knowledge: 60,
      },
      {
        experience: 30,
        name: 'sql',
        knowledge: 40,
      },
    ],
    qualificationThreshold: 80,
    basePay: 75000,
    duration: Infinity,
  },
  {
    name: 'sr web dev (node)',
    skills: [
      {
        experience: 70,
        name: 'javascript',
        knowledge: 90,
      },
      {
        experience: 40,
        name: 'node',
        knowledge: 100,
      },
      {
        experience: 60,
        name: 'sql',
        knowledge: 60,
      },
    ],
    qualificationThreshold: 60,
    basePay: 95000,
    duration: Infinity,
  },
  {
    name: 'data engineer',
    skills: [
      {
        experience: 20,
        name: 'spark',
        knowledge: 30,
      },
      {
        experience: 20,
        name: 'aws',
        knowledge: 40,
      },
      {
        experience: 30,
        name: 'docker',
        knowledge: 50,
      },
      {
        experience: 20,
        name: 'k8s',
        knowledge: 30,
      },
      {
        experience: 20,
        name: 'sql',
        knowledge: 50,
      },
      {
        experience: 30,
        name: 'python',
        knowledge: 50,
      },
    ],
    qualificationThreshold: 56,
    basePay: 175000,
    duration: Infinity,
  },
]

export const skillNames: string[] = allJobs
  .reduce((all: string[], job) => {
    const skillNamesForJob = job.skills.map(skill => skill.name)
    return [
      ...all,
      ...skillNamesForJob,
    ]
  }, [])
  .filter(unique)
  .sort()
