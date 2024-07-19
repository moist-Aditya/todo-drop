import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FaUser } from "react-icons/fa"
import { MdAdminPanelSettings } from "react-icons/md"
import { SlOptionsVertical } from "react-icons/sl"
import { deleteUser, makeAdmin } from "./adminActions"
import { User } from "@prisma/client"

const UsersList = async ({ users }: { users: Partial<User>[] }) => {
  return (
    <div className="mt-14 w-full max-w-7xl mx-auto">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="sr-only">Role</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="text-right sr-only">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                {user.role === "USER" ? (
                  <FaUser size={20} color="skyblue" />
                ) : (
                  <MdAdminPanelSettings size={25} color="orange" />
                )}
              </TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {new Date(user.createdAt as Date).toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="p-1">
                      <SlOptionsVertical />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-fit mr-4">
                    <DropdownMenuItem asChild>
                      <form
                        action={async () => {
                          "use server"
                          await makeAdmin(user.id as string)
                        }}
                      >
                        <button type="submit">Make Admin</button>
                      </form>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <form
                        action={async () => {
                          "use server"
                          await deleteUser(user.id as string)
                        }}
                      >
                        <button type="submit" className="text-red-600">
                          Delete User
                        </button>
                      </form>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default UsersList
