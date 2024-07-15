import { loginUser, registerUser } from "@/actions/authActions"
import { signIn } from "@/lib/auth"
import { redirect } from "next/navigation"
import { toast } from "sonner"

const Login = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) => {
  const callbackUrl = searchParams?.callbackUrl

  return (
    <div className="bg-zinc-700/20 border border-zinc-700 rounded p-4">
      <form
        action={async (formData) => {
          "use server"

          const result = await loginUser(formData, callbackUrl)
          if (result?.error) return
          else {
            // toast successfull
          }
        }}
        className="flex flex-col"
      >
        <input name="username" type="text" placeholder="Username" />
        <input name="password" type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
