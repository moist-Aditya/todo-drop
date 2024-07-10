import { prisma } from "../../prisma/client"
import AddCategory from "./AddCategory"
import DeleteTodoDroppable from "./DeleteTodoDroppable"
import TodoColumn from "./TodoColumn"

const TodoList = async () => {
  const categories = await prisma.category.findMany()
  const tasks = await prisma.todo.findMany()

  return (
    <div className="flex gap-3 w-full h-full flex-1 p-12 overflow-scroll relative">
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
