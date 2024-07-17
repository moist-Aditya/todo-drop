import { registerUser } from "@/actions/authActions"
import RegisterForm from "@/components/RegisterForm"
import { redirect } from "next/navigation"
import { toast } from "sonner"

const Register = () => {
  return <RegisterForm />
}

export default Register
