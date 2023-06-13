import {useContext} from 'react'
import './GameControls.css'
import {AppContext, AppDispatchContext} from '../AppContext'
import Button from '../Button'


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
        <div className="Buttons">
          <Button onClick={handleNext}>next</Button>
          <Button onClick={handleRunClick}>{running ? 'stop' : 'run'}</Button>
        </div>
      </div>
  )
}

export default GameControls
