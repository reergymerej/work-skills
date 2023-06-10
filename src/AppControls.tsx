import {useContext} from "react"
import {AppDispatchContext} from "./AppContext"
import './AppControls.css'

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
        <button onClick={handleReset}>reset</button>
        <button onClick={handleSave} disabled={saving}>save</button>
      </div>
    </div>
  )
}

export default AppControls
