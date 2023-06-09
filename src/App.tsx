import {useCallback, useEffect, useState} from 'react'
import './App.css'
import {getNewSkills} from './logic'
import SkillSetComp from './SkillSetComp'
import {Job, SkillProps} from './types'


const initialSkills: SkillProps[] = [
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
  ],
}

function App() {
  const [skills, setSkills] = useState(initialSkills)
  const [job, setJob] = useState(initialJob)
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
      const INTERVAL_TIME = 500
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
      <button onClick={handleClick}>next</button>
      <button onClick={handleRunClick}>{running ? 'stop' : 'run'}</button>
    </div>
  );
}

export default App
