import {
  getAdminCount,
  getTaskCount,
  getUserCount,
} from "@/data-access/adminCountAccess"
import CardComponent from "./CardComponent"

const AdminPanel = async () => {
  const [adminCount, userCount, taskCount] = await Promise.all([
    getAdminCount(),
    getUserCount(),
    getTaskCount(),
  ])

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-10">
      <CardComponent
        title="Admin"
        description="Current number of Admins in the database."
        content={adminCount}
      />
      <CardComponent
        title="User"
        description="Current number of active users in the database."
        content={userCount}
      />
      <CardComponent
        title="Task"
        description="Current number of tasks stored in the database."
        content={taskCount}
      />
    </div>
  )
}

export default AdminPanel
