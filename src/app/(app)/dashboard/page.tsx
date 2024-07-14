import TodoList from "@/components/TodoList"

export default function Home() {
  return (
    <>
      <h3 className="text-5xl text-center font-bold uppercase text-zinc-600/40">
        Task Board<span className="font-black text-blue-400">.</span>
      </h3>
      <div className="mt-10 w-full flex-1 overflow-auto border border-zinc-800 rounded">
        <TodoList />
      </div>
    </>
  )
}
