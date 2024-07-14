import { auth } from "@/lib/auth"
import Link from "next/link"
import AppHeaderRight from "./AppHeaderRight"

const AppHeader = async () => {
  const session = await auth()
  return (
    <nav className="z-50 absolute top-0 left-0 right-0 h-12 mx-auto max-w-7xl flex justify-between items-center px-6 border-zinc-900">
      <Link href={"/"} className="text-xl font-bold text-zinc-200">
        Todo<span className="text-yellow-600 font-black">Drop</span>
      </Link>

      {/* NavRight component (client) */}
      {session && <AppHeaderRight user={session.user} />}
    </nav>
  )
}

export default AppHeader
