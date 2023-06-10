import {useContext} from 'react'
import './GameControls.css'
import {AppContext, AppDispatchContext} from '../AppContext'
import Study from './Study'


type GameControlsProps = {
  onNext: () => void,
}
const GameControls = ({
  onNext,
}: GameControlsProps) => {
  const dispatch = useContext(AppDispatchContext)
  const {
    running,
  } = useContext(AppContext)

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
        <Study />
      </div>
  )
}

export default GameControls
