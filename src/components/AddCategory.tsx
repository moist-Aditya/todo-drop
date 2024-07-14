"use client"

import { addCategory } from "@/actions/todoActions"
import { useState } from "react"
import { FiPlus } from "react-icons/fi"
import { MdPlaylistAdd } from "react-icons/md"
import { toast } from "sonner"

const AddCategory = () => {
  const [isAdding, setIsAdding] = useState(false)
  return (
    <>
      {isAdding ? (
        <form
          action={async (formData) => {
            const result = await addCategory(formData)

            if (result?.error) toast.error(result.error)
            else {
              setIsAdding(false)
              toast.success(`Category ${formData.get("categoryName")} added`)
            }
          }}
        >
          <input
            type="text"
            name="categoryName"
            placeholder="Add new category..."
            className="rounded border border-violet-400 bg-violet-400/20 p-2 text-sm placeholder-violet-300 focus:outline-0 mb-1.5"
            onKeyDown={(e) => {
              if (e.key === "Enter" && "form" in e.target) {
                e.preventDefault()
                ;(e.target.form as HTMLFormElement).requestSubmit()
              }
            }}
          />
          <div className="flex gap-4 justify-end items-center text-xs">
            <button onClick={() => setIsAdding(false)}>Close</button>
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
          className="text-xl flex flex-col items-center text-yellow-500 bg-zinc-950 border border-yellow-500 p-1 h-56 mt-10 rounded relative"
        >
          <MdPlaylistAdd />
          <span className="text-xs rotate-90 absolute text-nowrap bottom-[50%]">
            Add category
          </span>
        </button>
      )}
    </>
  )
}

export default AddCategory
