import {useCallback, useEffect, useState} from 'react'
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

type Job = SkillSetProps

const SkillSetComp = (props: SkillSetProps) => {
  return (
    <div className="SkillSetComp">
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
    knowledge: 80,
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

const getJobSkill = (job: Job, name: string): SkillProps | undefined => {
  return job.skills.find(skill => {
    return skill.name === name
  })
}

const getNewSkills = (
  skills: SkillProps[],
  job: Job,
): SkillProps[] => {
  return skills.map(skill => {
    const jobSkill = getJobSkill(job, skill.name)

    // add skills per job
    // degrade skills
    let nextKnowledge = Math.max(skill.knowledge - 1, 0)
    let nextExperience = Math.max(skill.experience - 1, 0)

    if (jobSkill !== undefined) {
      nextKnowledge = nextKnowledge <= jobSkill.knowledge
        ? nextKnowledge + 2
        : nextKnowledge
      nextExperience = Math.min(skill.experience + 3, 600)
    }

    return {
      ...skill,
      knowledge: nextKnowledge,
      experience: nextExperience,
    }
  })
}

const initialJob: Job = {
  skills: [
    {
      experience: 10,
      name: 'skill 1',
      knowledge: 40,
    },
    {
      experience: 0,
      name: 'skill 3',
      knowledge: 50,
    },
  ],
}

function App() {
  const [skills, setSkills] = useState(initialSkills)
  const [job, setJob] = useState(initialJob)
  const [running, setRunning] = useState(false)

  const next = useCallback(() => {
    const newSkills = getNewSkills(skills, job)
    setSkills(newSkills)
  }, [skills, job])


  const handleClick = () => {
    next()
  }

  const handleRunClick = () => {
    setRunning(!running)
  }

  useEffect(() => {
    if (running) {
      const INTERVAL_TIME = 500
      const interval = setInterval(() => {
        next()
      }, INTERVAL_TIME)
      return () => {
        clearInterval(interval)
      }
    }
  }, [next, running])

  return (
    <div className="App">
      <SkillSetComp skills={skills} />
      <button onClick={handleClick}>next</button>
      <button onClick={handleRunClick}>{running ? 'stop' : 'run'}</button>
    </div>
  );
}

export default App
