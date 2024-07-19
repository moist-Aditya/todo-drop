import AdminPanel from "./AdminPanel"
import MainHeading from "@/components/MainHeading"
import UnAuthorizedWarning from "@/components/UnAuthorizedWarning"
import { auth } from "@/lib/auth"
import { Loader2 } from "lucide-react"
import React, { Suspense } from "react"

const AdminPanelPage = async () => {
  const session = await auth()
  const role = session?.user.role

  if (role !== "ADMIN") {
    return <UnAuthorizedWarning />
  }

  return (
    <>
      <MainHeading title="Admin Panel" />
      <Suspense fallback={<Loader2 className="animate-spin mx-auto" />}>
        <AdminPanel />
      </Suspense>
    </>
  )
}

export default AdminPanelPage
