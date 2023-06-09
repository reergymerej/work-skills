import {useCallback, useEffect, useState} from 'react'
import './App.css'
import JobComp from './Job'
import {getNewSkills} from './logic'
import SkillSetComp from './SkillSetComp'
import {Job, Skill} from './types'


const initialSkills: Skill[] = [
  {
    experience: 50,
    name: 'skill 1',
    knowledge: 80,
  },
  {
    experience: 20,
    name: 'skill 2',
    knowledge: 80,
  },
  {
    experience: 0,
    name: 'skill 3',
    knowledge: 10,
  },
]

const initialJob: Job = {
  name: 'job 1',
  skills: [
    {
      experience: 10,
      name: 'skill 1',
      knowledge: 40,
    },
    {
      experience: 0,
      name: 'skill 3',
      knowledge: 50,
    },
    {
      experience: 10,
      name: 'skill 4',
      knowledge: 20,
    },
  ],
}


function App() {
  const [skills, setSkills] = useState<Skill[]>(initialSkills)
  const [job, setJob] = useState<Job>(initialJob)
  const [running, setRunning] = useState(false)

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
      <SkillSetComp skills={skills} />
      <JobComp job={job} />
      <div>
        <button onClick={handleClick}>next</button>
        <button onClick={handleRunClick}>{running ? 'stop' : 'run'}</button>
      </div>
    </div>
  )
}

export default App
