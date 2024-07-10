import { Category, Todo } from "@prisma/client"
import DropIndicator from "./DropIndicator"
import { DragEvent } from "react"

const TodoCard = ({
  todo,
  handleDragStart,
}: {
  todo: Todo
  handleDragStart: (e: DragEvent, cardId: string) => void
}) => {
  return (
    <>
      <DropIndicator beforeId={todo.id} categoryId={todo.categoryId} />
      <div
        draggable={true}
        onDragStart={(e) => handleDragStart(e, todo.id)}
        className="cursor-grab p-4 bg-zinc-950 rounded border border-zinc-800 active:cursor-grabbing"
      >
        <p className="text-sm">{todo.content}</p>
      </div>
    </>
  )
}

export default TodoCard
