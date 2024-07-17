"use client"

import { loginUser } from "@/actions/authActions"
import TextInput from "./TextInput"
import ButtonCustom from "./ButtonCustom"
import { toast } from "sonner"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/schemas/loginSchema"

const LoginForm = ({ callbackUrl }: { callbackUrl?: string }) => {
  const {
    register,
    control,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "all",
  })

  return (
    <div className="bg-zinc-700/20 border border-zinc-700 rounded-lg p-4 py-12 w-full mx-12">
      <form
        action={async (formData) => {
          const result = await loginUser(formData, callbackUrl)
          if (result?.error) {
            toast.error(result.error)
          } else {
            toast.success("Login successfull")
          }
        }}
        className="flex flex-col gap-6"
      >
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextInput
              label="Username"
              type="text"
              placeholder="Enter username"
              {...field}
              error={errors.username?.message || ""}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...field}
              error={errors.password?.message || ""}
            />
          )}
        />
        <ButtonCustom
          disabled={!isValid}
          type="submit"
          className="mx-auto w-full mt-6"
        >
          Login
        </ButtonCustom>
      </form>
    </div>
  )
}

export default LoginForm
