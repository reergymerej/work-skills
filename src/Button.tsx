import cx from 'classnames'

type ButtonProps = React.PropsWithChildren & {
  color?: string,
  disabled?: boolean,
  onClick?: () => void,
}

const Button = ({
  children,
  color = 'violet',
  disabled,
  onClick,
}: ButtonProps) => {
  const className = cx(
    {
      [`bg-${color}-500 hover:bg-${color}-700 text-white`]: !disabled,
      [`bg-${color}-500 text-${color}-700`]: disabled,
    },
    [
      'font-bold py-1 px-4',
    ],
  )
  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
