import { auth } from "@/lib/auth"
import React from "react"

const AdminPanel = async () => {
  const session = await auth()
  const role = session?.user.role

  // TODO: ADMIN authorization
  return <div>AdminPanel - This is a protected route</div>
}

export default AdminPanel
