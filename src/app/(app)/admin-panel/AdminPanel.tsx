import CardComponent from "@/components/CardComponent"
import {
  getAdminCount,
  getTaskCount,
  getUserCount,
  getUsers,
} from "@/data-access/adminAccess"
import { Loader2 } from "lucide-react"
import { Suspense } from "react"
import UsersList from "./UsersList"
import { toast } from "sonner"
import { MdAdminPanelSettings } from "react-icons/md"
import { FaTasks, FaUser } from "react-icons/fa"

const AdminPanel = async () => {
  const [adminCount, userCount, taskCount] = await Promise.all([
    getAdminCount(),
    getUserCount(),
    getTaskCount(),
  ])

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4 mt-10">
        <CardComponent
          title="Admin"
          description="Current number of Admins in the database."
          content={adminCount}
          icon={<MdAdminPanelSettings color="orange" />}
        />
        <CardComponent
          title="User"
          description="Current number of active users in the database."
          content={userCount}
          icon={<FaUser color="skyblue" />}
        />
        <CardComponent
          title="Task"
          description="Current number of tasks stored in the database."
          content={taskCount}
          icon={<FaTasks color="lightgreen" />}
        />
      </div>

      <Suspense
        fallback={
          <div className="mx-auto">
            <Loader2 className="animate-spin" />
          </div>
        }
      >
        <RenderUsersList />
      </Suspense>
    </>
  )
}

const RenderUsersList = async () => {
  const users = await getUsers()

  if (!users) {
    toast.error("Error getting users list.")
    return null
  }

  return <UsersList users={users} />
}

export default AdminPanel
