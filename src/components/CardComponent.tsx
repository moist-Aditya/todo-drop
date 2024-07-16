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
}

const CardComponent = ({ title, description, content }: CardComponentProps) => {
  return (
    <Card className="flex-1 max-w-80 min-w-56">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <span className="text-5xl font-bold">{content ?? "-"}</span>
      </CardContent>
    </Card>
  )
}

export default CardComponent
