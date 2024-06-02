type Color = Record<string, string>

interface IProps {
  text?: string
  color?: keyof Color
}

const colorClasses: Color = {
  blue: 'bg-blue-500',
  red: 'bg-red-500',
  green: 'bg-green-500',
  gray: 'bg-gray-500'
}

const Badge = ({ text = 'Yes', color = 'blue' }: IProps) => {
  return (
    <span
      className={`inline-block text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ${colorClasses[color]}`}
    >
      {text}
    </span>
  )
}

export default Badge
