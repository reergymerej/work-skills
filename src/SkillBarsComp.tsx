import {colorsByMeaning} from "./global"

type SkillBarsCompProps = {
  value: number,
  name: 'experience' | 'knowledge',
  ratio: number,
}

const SkillBarsComp = (props: SkillBarsCompProps) => {
  const color: string = colorsByMeaning[props.name]
  return (
    <>
      <div>
        {props.name}
        <span className="text-xs ml-1">
          {Math.round(props.value)} | {Math.trunc(props.ratio * 100)}%
        </span>
      </div>
      <div className={`value bg-${color}-500`}
        style={{
          width: `${props.value}px`,
        }}
      />
    </>
  )
}

export default SkillBarsComp
