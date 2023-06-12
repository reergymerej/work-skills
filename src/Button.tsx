type ButtonProps = React.PropsWithChildren & {
  onClick?: () => void,
  color?: string,
}

const Button = ({
  onClick,
  children,
  color = 'violet',
}: ButtonProps) => {
  const className=`bg-${color}-500 hover:bg-${color}-700 text-white font-bold py-1 px-4`
  return (
    <button
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
