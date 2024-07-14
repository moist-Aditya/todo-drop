import { Todo } from "@prisma/client"
import DropIndicator from "./DropIndicator"
import { motion } from "framer-motion"

const TodoCard = ({
  todo,
  handleDragStart,
}: {
  todo: Todo
  handleDragStart: (e: any, cardId: string) => void
}) => {
  return (
    <>
      <DropIndicator beforeId={todo.id} categoryId={todo.categoryId} />
      <motion.div
        layout
        layoutId={todo.id}
        draggable={true}
        onDragStart={(e) => handleDragStart(e, todo.id)}
        className="cursor-grab p-4 bg-zinc-950 rounded border border-zinc-800 active:cursor-grabbing"
      >
        <p className="text-sm">{todo.content}</p>
      </motion.div>
    </>
  )
}

export default TodoCard
