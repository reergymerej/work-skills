import {useCallback, useContext, useEffect, useReducer, useState} from 'react'
import './App.css'
import {AppContext, AppDispatchContext} from './AppContext'
import {appStateReducer, initialAppState} from './appStateReducer'
import CurrentJob from './CurrentJob'
import {getNewSkills, getQualifications} from './logic'
import SkillSetComp from './SkillSetComp'
import {loadSavedAppState, saveAppState} from './storage'
import WantAds from './WantAds'
import {addSkillKnowledge} from './logic'
import {skillNames} from './data'


type AppControlsProps = {
  saving: boolean,
  onSave: () => void,
}
const AppControls = ({
  saving,
  onSave,
}: AppControlsProps) => {
  const dispatch = useContext(AppDispatchContext)
  const handleReset = () => {
    dispatch({
      type: 'reset',
    })
  }
  const handleSave = () => {
    onSave()
  }

  return (
    <div className="AppControls">
      <div className="buttons">
        <button onClick={handleSave} disabled={saving}>save</button>
        <button onClick={handleReset}>reset</button>
      </div>
    </div>
  )
}

type GameControlsProps = {
  onNext: () => void,
}
const GameControls = ({
  onNext,
}: GameControlsProps) => {
  const dispatch = useContext(AppDispatchContext)
  const {
    skills,
    running,
  } = useContext(AppContext)

  const handleStudyClick = (skillName: string) => () => {
    const newSkills = addSkillKnowledge(skills, skillName, 10)
    dispatch({
      type: 'skillsSet',
      value: newSkills,
    })
  }

  const handleNext = () => {
    onNext()
  }

  const handleRunClick = () => {
    dispatch({
      type: 'runningToggle',
    })
  }


  return (
      <div className="GameControls">
        <div className="buttons">
          <button onClick={handleNext}>next</button>
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
  )
}

const App = () => {
  const [appState, dispatch] = useReducer(appStateReducer, initialAppState)
  const [loading, setLoading] = useState<boolean>(false)
  const [saving, setSaving] = useState<boolean>(false)

  const {
    job,
    skills,
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

  const handleSave = () => {
    setSaving(true)
    saveAppState(appState)
    setSaving(false)
  }

  const handleNext = () => {
    next()
  }

  return (
    <AppContext.Provider value={appState}>
      <AppDispatchContext.Provider value={dispatch}>
        <div className="App">
          {loading
            ? <div>loading...</div>
            : (
              <>
              <AppControls
                saving={saving}
                onSave={handleSave}
              />
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
                <GameControls
                  onNext={handleNext}
                />
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
