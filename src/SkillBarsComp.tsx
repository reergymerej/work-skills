type SkillBarsCompProps = {
  value: number,
  name: string,
  ratio: number,
}
const SkillBarsComp = (props: SkillBarsCompProps) => {
  return (
    <>
      <div>
        {props.name}
        <span className="text-xs ml-1">
          {Math.round(props.value)} | {Math.trunc(props.ratio * 100)}%
        </span>
      </div>
      <div className={`value ${props.name}`}
        style={{
          width: `${props.value}px`,
        }}
      />
    </>
  )
}

export default SkillBarsComp
