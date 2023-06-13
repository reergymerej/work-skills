import {useCallback, useEffect, useReducer, useState} from 'react'
import './App.css'
import {AppContext, AppDispatchContext} from './AppContext'
import CurrentJob from './CurrentJob'
import {getQualifications} from './logic'
import SkillSetComp from './SkillSetComp'
import {loadSavedAppState, saveAppState} from './storage'
import WantAds from './WantAds'
import AppControls from './AppControls'
import GameControls from './GameControls'
import TechnologySection from './TechnologySection'
import JobsSection from './JobsSection'
import Button from './Button'
import {appStateReducer, initialAppState} from './reducer'

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
    dispatch({
      type: 'dayNext',
    })
  }, [])


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

  const handleToggleWantAdds = () => {
    dispatch({
      type: 'wantAdsToggle',
    })
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
                <div>{appState.day}</div>
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
              <Button onClick={handleToggleWantAdds}>want ads</Button>
              {appState.wantAdsOpen && <WantAds /> }
              <div className="grid gap-x-4 grid-cols-2 m-4 p-4 bg-gray-100">
                <TechnologySection />
                <JobsSection />
              </div>
            </>
            )
          }
        </div>
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  )
}

export default App
