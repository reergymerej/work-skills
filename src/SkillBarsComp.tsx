type SkillBarsCompProps = {
  value: number,
  name: string,
  ratio: number,
}
const SkillBarsComp = (props: SkillBarsCompProps) => {
  return (
    <>
      <div>
        {props.name} {Math.trunc(props.ratio * 100)}%
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
