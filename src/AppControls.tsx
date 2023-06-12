import {useContext} from "react"
import {AppDispatchContext} from "./AppContext"
import './AppControls.css'
import Button from "./Button"

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
      <div className="Buttons">
        <Button onClick={handleReset}>reset</Button>
        <Button onClick={handleSave} disabled={saving}>save</Button>
      </div>
    </div>
  )
}

export default AppControls
