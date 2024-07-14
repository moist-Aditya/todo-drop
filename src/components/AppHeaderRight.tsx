"use client"

import { User } from "next-auth"
import React from "react"
import { FiUser } from "react-icons/fi"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IoMdLogOut } from "react-icons/io"
import { logoutUser } from "@/actions/authActions"
import { MdOutlineAdminPanelSettings } from "react-icons/md"
import { useRouter } from "next/navigation"

const AppHeaderRight = ({ user }: { user: User }) => {
  const router = useRouter()
  const menuItems = [
    {
      icon: <IoMdLogOut className="mr-2 h-4 w-4" />,
      label: "Logout",
      onClick: async () => await logoutUser(),
    },
    {
      icon: <MdOutlineAdminPanelSettings className="mr-2 h-4 w-4" />,
      label: "Admin Panel",
      role: "USER", // TODO: Change to ADMIN
      onClick: () => router.push("/admin-panel"),
    },
  ]
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="bg-zinc-200/0 hover:bg-zinc-50/20 transition-colors text-zinc-50 p-1.5 rounded flex gap-4 items-center">
          <span className="uppercase text-sm text-zinc-50/50 font-semibold">
            Welcome, {user.username}
          </span>
          <FiUser className="w-6 h-6 bg-zinc-200 rounded-full text-black" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        {/* <DropdownMenuGroup> */}
        {menuItems.map(
          (menuItem) =>
            (!menuItem.role || menuItem.role === user.role) && (
              <DropdownMenuItem onClick={menuItem?.onClick}>
                {menuItem.icon}
                <span>{menuItem.label}</span>
              </DropdownMenuItem>
            )
        )}
        {/* </DropdownMenuGroup> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AppHeaderRight
