import { getUserCategories, getUserTodos } from "@/data-access/userTodosAccess"
import AddCategory from "./AddCategory"
import DeleteTodoDroppable from "./DeleteTodoDroppable"
import TodoColumn from "./TodoColumn"

const TodoList = async () => {
  const [categories, tasks] = await Promise.all([
    getUserCategories(),
    getUserTodos(),
  ])

  return (
    <div className="flex gap-3 w-full h-full p-4 overflow-scroll relative">
      {(categories ?? []).map((cat) => (
        <TodoColumn
          key={cat.id}
          category={cat}
          headingColor="text-yellow-600"
          cards={tasks ?? []}
        />
      ))}

      <DeleteTodoDroppable />
      <AddCategory />
    </div>
  )
}

export default TodoList
