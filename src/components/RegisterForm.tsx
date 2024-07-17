"use client"

import { registerUser } from "@/actions/authActions"
import TextInput from "./TextInput"
import ButtonCustom from "./ButtonCustom"
import { toast } from "sonner"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { signupSchema } from "@/schemas/signupSchema"

const RegisterForm = () => {
  const {
    control,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "all",
  })

  return (
    <div className="bg-zinc-700/20 border border-zinc-700 rounded-lg p-4 py-12 w-full mx-12">
      <form
        action={async (formData) => {
          const result = await registerUser(formData)
          if (result?.error) {
            toast.error(result.error)
          } else {
            toast.success("User registered.")
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
          name="email"
          control={control}
          render={({ field }) => (
            <TextInput
              label="Email"
              type="text"
              placeholder="Enter email"
              {...field}
              error={errors.email?.message || ""}
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
          Register
        </ButtonCustom>
      </form>

      <span className="text-right block text-sm text-yellow-400/50 mt-4">
        Already have an account?{" "}
        <Link
          href={"/login"}
          className="font-semibold text-yellow-400 hover:text-yellow-600 transition-colors"
        >
          Login
        </Link>{" "}
        now.
      </span>
    </div>
  )
}

export default RegisterForm
