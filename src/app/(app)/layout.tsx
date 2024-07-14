import AppHeader from "@/components/AppHeader"

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <AppHeader />
      <main className="h-[100vh] flex flex-col p-4 pt-24">{children}</main>
    </>
  )
}
