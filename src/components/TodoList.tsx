import { prisma } from "../../prisma/client"
import AddCategory from "./AddCategory"
import DeleteTodoDroppable from "./DeleteTodoDroppable"
import TodoColumn from "./TodoColumn"

const TodoList = async () => {
  const [categories, tasks] = await Promise.all([
    prisma.category.findMany(),
    prisma.todo.findMany(),
  ])

  return (
    <div className="flex gap-3 w-full h-full flex-1 overflow-scroll relative">
      {categories.map((cat) => (
        <TodoColumn
          key={cat.id}
          category={cat}
          headingColor="text-yellow-600"
          cards={tasks}
        />
      ))}

      <DeleteTodoDroppable />
      <AddCategory />
    </div>
  )
}

export default TodoList
