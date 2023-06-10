import {useCallback, useEffect, useReducer, useState} from 'react'
import './App.css'
import {AppContext, AppDispatchContext} from './AppContext'
import {appStateReducer, initialAppState} from './appStateReducer'
import CurrentJob from './CurrentJob'
import {skillNames} from './data'
import {addSkillKnowledge, getNewSkills, getQualifications} from './logic'
import SkillSetComp from './SkillSetComp'
import {loadSavedAppState, saveAppState} from './storage'
import WantAds from './WantAds'


const Status = () => {
  return (
    <div className="Status">
      status
    </div>
  )
}

const App = () => {
  const [appState, dispatch] = useReducer(appStateReducer, initialAppState)
  const [loading, setLoading] = useState<boolean>(false)
  const [saving, setSaving] = useState<boolean>(false)

  const {
    jobIndex,
    job,
    skills,
    jobs,
    running,
  } = appState

  const next = useCallback(() => {
    const newSkills = getNewSkills(skills, job)
    dispatch({
      type: 'skillsSet',
      value: newSkills,
    })
    dispatch({
      type: 'dayNext',
    })
  }, [job, skills])


  const handleClick = () => {
    next()
  }

  const handleRunClick = () => {
    dispatch({
      type: 'runningToggle',
    })
  }

  const handleStudyClick = (skillName: string) => () => {
    const newSkills = addSkillKnowledge(skills, skillName, 10)
    dispatch({
      type: 'skillsSet',
      value: newSkills,
    })
  }

  const handleSaveClick = () => {
    setSaving(true)
    saveAppState(appState)
    setSaving(false)
  }

  const handleResetClick = () => {
    dispatch({
      type: 'reset',
    })
  }

  useEffect(() => {
    // load initial or saved state
    if (!loading) {
      setLoading(true)
      dispatch({
        type: 'loaded',
        value: loadSavedAppState(),
      })
      setLoading(false)
    }
  }, [
    loading,
  ])

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
    <AppContext.Provider value={appState}>
      <AppDispatchContext.Provider value={dispatch}>
        <div className="App">
          {loading
            ? <div>loading...</div>
            : (
              <>
              <Status />
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
                  <button onClick={handleSaveClick} disabled={saving}>save</button>
                  <button onClick={handleResetClick}>reset</button>
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
              <WantAds />
            </>
            )
          }
        </div>
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  )
}

export default App
