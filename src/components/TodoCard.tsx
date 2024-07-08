import { Category, Todo } from "@prisma/client"
import DropIndicator from "./DropIndicator"

const TodoCard = ({ todo }: { todo: Todo }) => {
  return (
    <>
      <DropIndicator beforeId={todo.id} categoryId={todo.categoryId} />
      <div
        draggable={true}
        className="cursor-grab p-4 bg-zinc-950 rounded border border-zinc-800 active:cursor-grabbing"
      >
        <p className="text-sm">{todo.content}</p>
      </div>
    </>
  )
}

export default TodoCard
