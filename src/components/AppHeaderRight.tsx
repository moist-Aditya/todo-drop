import { User } from "next-auth"
import React from "react"
import { FiUser } from "react-icons/fi"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IoMdLogOut } from "react-icons/io"
import Link from "next/link"
import { logoutUser } from "@/actions/authActions"

type navItem = {
  label: string
  href: string
  role?: string
}

const navItems: navItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Admin Panel",
    href: "/admin-panel",
    role: "ADMIN",
  },
]
const AppHeaderRight = ({ user }: { user: User }) => {
  return (
    <div className="flex gap-12 items-center">
      <ul className="flex gap-4 items-center">
        {navItems.map((navItem) => {
          if (!navItem.role || navItem.role === user.role) {
            return <NavLink key={navItem.label} item={navItem} />
          }
        })}
      </ul>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="bg-zinc-200/0 hover:bg-zinc-50/20 transition-colors text-zinc-50 p-1.5 rounded flex gap-2 items-center cursor-pointer">
            <span className="capitalize text-sm text-zinc-200 font-semibold">
              {user.username}
            </span>
            <FiUser className="w-6 h-6 bg-zinc-200 rounded-full text-black" />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-38">
          <DropdownMenuItem>
            <IoMdLogOut className="mr-2 h-4 w-4" />
            <form action={logoutUser}>
              <button type="submit">Logout</button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

const NavLink = ({ item }: { item: navItem }) => {
  return (
    <li className="text-sm uppercase font-semibold text-zinc-200/70 hover:text-zinc-200">
      <Link href={item.href}>{item.label}</Link>
    </li>
  )
}

export default AppHeaderRight
