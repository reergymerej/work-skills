import {useCallback, useEffect, useState} from 'react'
import './App.css'
import JobComp from './Job'
import {getNewSkills} from './logic'
import SkillSetComp from './SkillSetComp'
import {Job, Skill} from './types'


const initialSkills: Skill[] = [
]

const jobs: Job[] = [
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
  },
]


function App() {
  const [skills, setSkills] = useState<Skill[]>(initialSkills)
  const [jobIndex, setJobIndex] = useState<number>(0)
  const [running, setRunning] = useState(false)

  const job = jobs[jobIndex]

  const next = useCallback(() => {
    const newSkills = getNewSkills(skills, job)
    setSkills(newSkills)
  }, [skills, job])


  const handleClick = () => {
    next()
  }

  const handleRunClick = () => {
    setRunning(!running)
  }

  const handleNextJob = () => {
    const nextIndex = jobIndex + 1
    setJobIndex(nextIndex >= jobs.length
      ? 0
      : nextIndex
     )
  }

  useEffect(() => {
    if (running) {
      const INTERVAL_TIME = 100
      const interval = setInterval(() => {
        next()
      }, INTERVAL_TIME)
      return () => {
        clearInterval(interval)
      }
    }
  }, [next, running])

  return (
    <div className="App">
      <div className="controls">
        <button onClick={handleClick}>next</button>
        <button onClick={handleRunClick}>{running ? 'stop' : 'run'}</button>
        <button onClick={handleNextJob}>next job</button>
      </div>
      <div className="stage">
        <SkillSetComp skills={skills} />
        <JobComp job={job} />
      </div>
    </div>
  )
}

export default App
