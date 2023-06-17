import {useContext} from 'react'
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
      <div>
        <Button onClick={handleNext}>next</Button>
        <Button onClick={handleRunClick}>{running ? 'stop' : 'run'}</Button>
      </div>
  )
}

export default GameControls
