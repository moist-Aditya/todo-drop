"use client"

import { deleteTask } from "@/actions/todoActions"
import { DragEvent, useState } from "react"
import { FaTrash } from "react-icons/fa"
import { toast } from "sonner"

const DeleteTodoDroppable = () => {
  const [active, setActive] = useState(false)

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    setActive(true)
  }
  const handleDragLeave = (e: DragEvent) => {
    setActive(false)
  }
  const handleDragEnd = async (e: DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId")

    const result = await deleteTask(cardId)

    if (result?.error) toast.error(result.error)
    else toast.success("Task deleted")

    setActive(false)
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDragEnd}
      className={`mt-10 rounded w-56 h-56 shrink-0 grid text-3xl place-content-center border ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-zinc-800 bg-zinc-800/20 text-zinc-800"
      }`}
    >
      <FaTrash className={`${active ? "animate-bounce" : ""}`} />
    </div>
  )
}

export default DeleteTodoDroppable
