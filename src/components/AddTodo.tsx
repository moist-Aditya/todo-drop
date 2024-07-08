"use client"

import { addTask } from "@/actions/actions"
import { useActionState, useState } from "react"
import { FiPlus } from "react-icons/fi"
import { toast } from "sonner"

const AddTodo = ({ categoryId }: { categoryId: string }) => {
  const [isAdding, setIsAdding] = useState(false)

  //   const [error, action, isPending] = useActionState(addTask, null)
  const addTaskWithCategoryId = addTask.bind(null, categoryId)

  return (
    <>
      {isAdding ? (
        <form
          action={async (formData) => {
            const result = await addTaskWithCategoryId(formData)
            if (result?.error) {
              toast.error(result.error)
            } else {
              setIsAdding(false)
              toast.success("Task Added")
            }
          }}
        >
          <textarea
            name="content"
            autoFocus
            required
            placeholder="Add new task..."
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm placeholder-violet-300 focus:outline-0"
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
        </form>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="flex justify-end gap-2 text-sm text-zinc-500 items-center w-full py-2 px-3"
        >
          <span>Add Task</span>
          <FiPlus />
        </button>
      )}
    </>
  )
}

export default AddTodo
