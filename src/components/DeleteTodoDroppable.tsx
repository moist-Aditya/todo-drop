"use client"

import { useState } from "react"
import { FaTrash } from "react-icons/fa"

const DeleteTodoDroppable = () => {
  const [active, setActive] = useState(false)
  return (
    <div
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
