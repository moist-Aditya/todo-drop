import AddCategory from "@/components/AddCategory"
import TodoList from "@/components/TodoList"

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center">
      <h1 className="text-5xl font-black mt-4">TodoDrop</h1>

      <div className="mt-20 w-full h-full flex overflow-hidden flex-1">
        <TodoList />
      </div>
    </main>
  )
}
