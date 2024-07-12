"use client"

import { addTask } from "@/actions/actions"
import { createRef, useState } from "react"
import { FiPlus } from "react-icons/fi"
import { toast } from "sonner"
import { motion } from "framer-motion"

const AddTodo = ({ categoryId }: { categoryId: string }) => {
  const [isAdding, setIsAdding] = useState(false)
  const inputRef = createRef<HTMLTextAreaElement>()

  const addTaskWithCategoryId = addTask.bind(null, categoryId)

  return (
    <>
      {isAdding ? (
        <motion.form
          layout
          action={async (formData) => {
            const result = await addTaskWithCategoryId(formData)
            if (result?.error) {
              toast.error(result.error)
            } else {
              inputRef.current!.value = ""
              toast.success("Task Added")
            }
          }}
        >
          <textarea
            name="content"
            autoFocus
            ref={inputRef}
            required
            placeholder="Add new task..."
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm placeholder-violet-300 focus:outline-0"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && "form" in e.target) {
                e.preventDefault()
                ;(e.target.form as HTMLFormElement).requestSubmit()
              }

              if (e.key === "Escape") {
                setIsAdding(false)
              }
            }}
          />
          <div className="flex gap-3 text-xs items-center justify-end">
            <button
              onClick={() => setIsAdding(false)}
              className="text-zinc-300"
            >
              Close
            </button>
            <button
              type="submit"
              className="text-black hover:bg-zinc-300 transition-colors bg-zinc-100 py-1.5 px-3 rounded font-bold flex gap-2 items-center"
            >
              <span>Add</span>
              <FiPlus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setIsAdding(true)}
          className="flex justify-end gap-2 text-sm text-zinc-500 items-center w-full py-2 px-3"
        >
          <span>Add Task</span>
          <FiPlus />
        </motion.button>
      )}
    </>
  )
}

export default AddTodo
