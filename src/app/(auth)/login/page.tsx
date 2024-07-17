import { loginUser } from "@/actions/authActions"
import LoginForm from "@/components/LoginForm"

const Login = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) => {
  const callbackUrl = searchParams?.callbackUrl

  return <LoginForm callbackUrl={callbackUrl} />
}

export default Login
