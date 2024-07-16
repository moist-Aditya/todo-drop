import MainHeading from "@/components/MainHeading"
import TodoList from "@/components/TodoList"
import { Loader2 } from "lucide-react"
import { Suspense } from "react"

export default function Home() {
  return (
    <>
      <MainHeading title="Task Board" />
      <div className="mt-10 w-full flex-1 overflow-auto border border-zinc-800 rounded">
        <Suspense fallback={<Loader2 className="animate-spin mx-auto" />}>
          <TodoList />
        </Suspense>
      </div>
    </>
  )
}
