import { cn } from "@/lib/utils"
import { ComponentProps, ReactNode } from "react"

type ButtonCustomProps = {
  children: ReactNode
  variant?: "destructive" | "primary" | "ghost"
  className?: string
} & ComponentProps<"button">

const ButtonCustom = ({
  children,
  variant = "primary",
  className,
  ...rest
}: ButtonCustomProps) => {
  let variant_colors

  if (variant === "primary") {
    variant_colors = "bg-zinc-200 text-zinc-950 hover:bg-zinc-200/80"
  } else if (variant === "ghost") {
    variant_colors =
      "bg-transparent hover:bg-zinc-200 hover:text-zinc-950  text-zinc-200 border-zinc-200"
  } else if (variant === "destructive") {
    variant_colors =
      "bg-transparent text-red-500 hover:bg-red-800 hover:text-zinc-50 border-red-800 hover:border-red-800"
  }

  return (
    <button
      className={cn(
        variant_colors,
        "transition-colors rounded-xl w-fit p-3 px-6 text-sm border-2 font-semibold uppercase disabled:mix-blend-overlay disabled:cursor-not-allowed",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default ButtonCustom
