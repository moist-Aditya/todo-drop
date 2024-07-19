import type { Metadata } from "next"
import { Noto_Sans } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import { cn } from "@/lib/utils"

const noto = Noto_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TodoDrop",
  description: "A task organization app with drag and drop features!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(noto.className, "dark")}>
        <Toaster position="bottom-right" theme="dark" richColors />
        {children}
      </body>
    </html>
  )
}
