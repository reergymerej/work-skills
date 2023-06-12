import {useContext} from "react"
import {AppContext, AppDispatchContext} from "../../AppContext"
import Button from "../../Button"
import './Study.css'

const Study = () => {
  const dispatch = useContext(AppDispatchContext)
  const {
    technologies,
  } = useContext(AppContext)
  const handleStudyClick = (skillName: string) => () => {
    dispatch({
      type: 'study',
      value: skillName,
    })
  }

  return (
    <div className="Study">
        <div className="Buttons">
          {technologies.map(technonogy => {
            const {name} = technonogy
            return (
              <Button
                key={name}
                onClick={handleStudyClick(name)}>{name}</Button>
            )
          })}
        </div>
    </div>
  )
}


export default Study
