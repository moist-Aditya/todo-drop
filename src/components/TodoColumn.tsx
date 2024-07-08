"use client"

import { Category, Todo } from "@prisma/client"
import { useState } from "react"
import TodoCard from "./TodoCard"
import DropIndicator from "./DropIndicator"
import AddTodo from "./AddTodo"

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

  return (
    <div className="w-56 shrink-0">
      <div className="flex justify-between items-center mb-3">
        <h3 className={`font-semibold ${headingColor}`}>{category.name}</h3>
        <span className="text-sm text-zinc-500">{filteredCards.length}</span>
      </div>

      <div
        className={`h-full w-full transition-colors ${
          active ? "bg-zinc-700/50" : "bg-zinc-700/0"
        }`}
      >
        {filteredCards.map((todo) => (
          <TodoCard todo={todo} />
        ))}

        <DropIndicator categoryId={category.id} />

        <AddTodo categoryId={category.id} />
      </div>
    </div>
  )
}

export default TodoColumn
