import UnAuthorizedWarning from "@/components/UnAuthorizedWarning"
import { auth } from "@/lib/auth"
import React from "react"

const AdminPanel = async () => {
  const session = await auth()
  const role = session?.user.role

  if (role !== "ADMIN") {
    return <UnAuthorizedWarning />
  }

  return <div>AdminPanel - If you see this, you are an admin!</div>
}

export default AdminPanel
