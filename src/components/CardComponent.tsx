import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"

type CardComponentProps = {
  title: string
  description: string
  content: number | null
  icon: React.ReactNode | null
}

const CardComponent = ({
  title,
  description,
  content,
  icon,
}: CardComponentProps) => {
  return (
    <Card className="flex-1 max-w-80 min-w-56">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between items-center text-5xl">
        <span className="font-bold">{content ?? "-"}</span>
        {icon}
      </CardContent>
    </Card>
  )
}

export default CardComponent
