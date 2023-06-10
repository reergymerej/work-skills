import {useCallback, useEffect, useState} from 'react'
import './App.css'
import CurrentJob from './CurrentJob'
import {allJobs, initialSkills, skillNames} from './data'
import {addSkillKnowledge, getNewSkills, getQualifications} from './logic'
import SkillSetComp from './SkillSetComp'
import {loadSavedAppState, saveAppState} from './storage'
import {AppState, factoryAppState, Job, Skill} from './types'
import WantAds from './WantAds'






const initialAppState: AppState = factoryAppState()

const App = () => {
  const [loaded, setLoaded] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [appState, setAppState] = useState<AppState>(initialAppState)

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
    // load initial or saved state
    if (!loaded && !loading) {
      setLoading(true)
      setAppState(() => loadSavedAppState())
      setLoading(false)
      setLoaded(true)
    }
  }, [
    loaded,
    loading,
    setAppState,
  ])

  useEffect(() => {
    // When setting the state for the first time, we are `loading`.  Ignore this
    // first change.
    if (!loading && !loaded) {
      saveAppState(appState)
      return
    }
  }, [loaded, loading, appState])

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
      {loading
        ? <div>loading...</div>
        : (
          <>
        <div>{JSON.stringify(appState)}</div>
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
                <button
                  key={skillName}
                  onClick={handleStudyClick(skillName)}>{skillName}</button>
              )
            })}
          </div>
        </div>
        <WantAds
          jobs={jobs}
          onNewJob={handleNewJob}
          skills={skills}
        />
          </>
        )
      }
    </div>
  )
}

export default App
