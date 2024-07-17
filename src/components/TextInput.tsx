import { cn } from "@/lib/utils"
import { ComponentProps } from "react"

type TextInputProps = {
  label?: string
  error?: string
} & ComponentProps<"input">

const TextInput = ({ label, error, ...rest }: TextInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold px-2 text-yellow-500">
        {label}
      </label>
      <input
        {...rest}
        className={cn(
          "p-2 py-3 rounded-lg bg-zinc-950 border-2 focus:border-yellow-500 outline-none text-base font-semibold w-full",
          error && "bg-red-600/20 border-red-600/40 placeholder:text-red-600/40"
        )}
      />
      {error && (
        <span className="text-red-500/80 w-fit self-end text-sm text-right bg-red-500/10 p-1 px-3 rounded">
          {error}
        </span>
      )}
    </div>
  )
}

export default TextInput
