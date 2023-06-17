import {useCallback, useEffect, useReducer, useState} from 'react'
import './App.css'
import {AppContext, AppDispatchContext} from './AppContext'
import CurrentJob from './CurrentJob'
import {getQualifications} from './logic'
import SkillSetComp from './SkillSetComp'
import {loadSavedAppState, saveAppState} from './storage'
import AppControls from './AppControls'
import GameControls from './GameControls'
import TechnologySection from './TechnologySection'
import JobsSection from './JobsSection'
import {appStateReducer, initialAppState} from './reducer'

type ColumnSectionProps = React.PropsWithChildren & {
  title: string,
  className?: string,
}
const ColumnSection = ({
  title,
  className,
  children,
}: ColumnSectionProps) => {
  return (
    <div className={`bg-white ${className}`}>
      <div className="font-bold text-xl py-2 px-4 text bg-violet-100">
        {title}
      </div>
      <div className="px-4 mt-2">
        {children}
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

  return (
    <AppContext.Provider value={appState}>
      <AppDispatchContext.Provider value={dispatch}>
        <div className="App h-full">
          {loading
            ? <div>loading...</div>
            : (
              <div className="h-full flex flex-col">
                <div className="h-24 flex items-center p-4">
                  <div className="text-3xl">
                    <div>Day {appState.day}</div>
                  </div>

                  <div className="flex flex-1 justify-center">
                    <GameControls
                      onNext={handleNext}
                    />
                  </div>

                  <div className="top-0 right-0 flex">
                    <AppControls
                      saving={saving}
                      onSave={handleSave}
                    />
                  </div>
                </div>




                <div className="flex-1 grid grid-cols-5 gap-4 bg-gray-100 p-4">
                  <ColumnSection title="tech">
                    <TechnologySection />
                  </ColumnSection>

                  <ColumnSection title="jobs">
                    <JobsSection />
                  </ColumnSection>

                  <ColumnSection
                    className="col-span-2"
                    title="job details"
                  >
                    <CurrentJob
                      skills={skills}
                      job={job}
                    />
                  </ColumnSection>

                  <ColumnSection title="skills">
                    <SkillSetComp
                      skills={skills}
                      qualifications={job && getQualifications(skills, job)}
                    />
                  </ColumnSection>
                </div>
              </div>
            )
          }
        </div>
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  )
}

export default App
