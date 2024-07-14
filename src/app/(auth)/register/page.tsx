import { registerUser } from "@/actions/authActions"
import { redirect } from "next/navigation"
import { toast } from "sonner"

const Register = () => {
  return (
    <div className="bg-zinc-700/20 border border-zinc-700 rounded p-4">
      <form
        action={async (formData) => {
          "use server"
          const result = await registerUser(formData)

          if (result?.error) return
          else {
            // toast.success("Registered successfully.")
            redirect("/login")
          }
        }}
        className="flex flex-col"
      >
        <input name="username" type="text" placeholder="Username" />
        <input name="email" type="email" placeholder="Email" />
        <input name="password" type="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
