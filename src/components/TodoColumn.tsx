"use client"

import { Category, Todo } from "@prisma/client"
import { DragEvent, useState } from "react"
import TodoCard from "./TodoCard"
import DropIndicator from "./DropIndicator"
import AddTodo from "./AddTodo"
import { moveTask } from "@/actions/todoActions"
import { toast } from "sonner"

const TodoColumn = ({
  category,
  headingColor,
  cards,
}: {
  category: Category
  headingColor: string
  cards: Todo[]
}) => {
  const filteredCards = cards.filter((todo) => todo.categoryId === category.id)
  const [active, setActive] = useState(false)

  const handleDragStart = (e: DragEvent, cardId: string) => {
    e.dataTransfer.setData("cardId", cardId)
  }

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    setActive(true)
  }
  const handleDragLeave = (e: DragEvent) => {
    setActive(false)
  }
  const handleDragEnd = async (e: DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId")

    const result = await moveTask(cardId, category.id)
    if (result?.error) toast.error(result.error)

    setActive(false)
  }

  return (
    <div
      className="w-56 shrink-0 flex flex-col"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDragEnd}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className={`font-semibold ${headingColor}`}>{category.name}</h3>
        <span className="text-sm text-zinc-500">{filteredCards.length}</span>
      </div>

      <div
        className={`w-full transition-colors flex-1  ${
          active ? "bg-zinc-700/50" : "bg-zinc-700/0"
        }`}
      >
        {filteredCards.map((todo) => (
          <TodoCard
            todo={todo}
            key={todo.id}
            handleDragStart={handleDragStart}
          />
        ))}

        <DropIndicator categoryId={category.id} />

        <AddTodo categoryId={category.id} />
      </div>
    </div>
  )
}

export default TodoColumn
