import {useCallback, useEffect, useState} from 'react'
import './App.css'
import CurrentJob from './CurrentJob'
import {allJobs, initialSkills, skillNames} from './data'
import {addSkillKnowledge, getNewSkills, getQualifications} from './logic'
import SkillSetComp from './SkillSetComp'
import {Job, Skill} from './types'
import WantAds from './WantAds'




function App() {
  const [skills, setSkills] = useState<Skill[]>(initialSkills)
  const [jobs, setJobs] = useState<Job[]>(allJobs)
  const [running, setRunning] = useState(false)
  const [job, setJob] = useState<Job | null>(null)

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

  const handleNewJob = (job: Job) => {
    setJob(job)
  }

  const handleStudyClick = (skillName: string) => () => {
    const newSkills = addSkillKnowledge(skills, skillName, 10)
    setSkills(newSkills)
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
      <div className="stage">
        <div>
          <h2>Your Skills</h2>
          <SkillSetComp
            skills={skills}
            qualifications={job && getQualifications(skills, job)}
          />
        </div>
        <CurrentJob
          skills={skills}
          job={job}
        />
      </div>
      <div className="controls">
        <div className="buttons">
          <button onClick={handleClick}>next</button>
          <button onClick={handleRunClick}>{running ? 'stop' : 'run'}</button>
        </div>
        <div className="buttons">
          {skillNames.map(skillName => {
            return (
              <button onClick={handleStudyClick(skillName)}>{skillName}</button>
            )
          })}
        </div>
      </div>
      <WantAds
        jobs={jobs}
        onNewJob={handleNewJob}
        skills={skills}
      />
    </div>
  )
}

export default App
