import {useState} from 'react'
import './App.css'

type SkillProps = {
  name: string
  experience: number
  knowledge: number
}

const Skill = (props: SkillProps) => {
  return (
        <div className="Skill">
          <div className="name">
            {props.name}
          </div>
          <div className="values">
            <div className="value knowledge"
              style={{
                width: `${props.knowledge}px`,
              }}
            />
            <div className="value experience"
              style={{
                width: `${props.experience}px`,
              }}
            />
          </div>
        </div>
  )
}

type SkillSetProps = {
  skills: SkillProps[],
}

const SkillSet = (props: SkillSetProps) => {
  return (
    <div className="SkillSet">
      {props.skills.map((skill) => {
        return (
          <Skill
            key={skill.name}
            name={skill.name}
            experience={skill.experience}
            knowledge={skill.knowledge}
          />
        )
      })}
    </div>
  )
}

const initialSkills: SkillProps[] = [
  {
    experience: 50,
    name: 'skill 1',
    knowledge: 30,
  },
  {
    experience: 20,
    name: 'skill 2',
    knowledge: 80,
  },
  {
    experience: 0,
    name: 'skill 3',
    knowledge: 10,
  },
]

const getNewSkills = (
  skills: SkillProps[],
): SkillProps[] => {
  // add skills per job
  // degrade skills
  return skills.map(skill => {
    const nextKnowledge = Math.max(skill.knowledge - 1, 0)
    const nextExperience = Math.max(skill.experience - 1, 0)
    return {
      ...skill,
      knowledge: nextKnowledge,
      experience: nextExperience,

    }
  })
}

function App() {
  const [skills, setSkills] = useState(initialSkills)

  const handleClick = () => {
    const newSkills = getNewSkills(skills)
    setSkills(newSkills)
  }

  return (
    <div className="App">
      <SkillSet skills={skills} />
      <button onClick={handleClick}>next</button>
    </div>
  );
}

export default App
