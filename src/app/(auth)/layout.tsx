export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="flex h-screen">
      <aside className="bg-green-300 justify-center items-center hidden md:flex md:w-[50vw] lg:w-[60vw] 2xl:w-[70vw]">
        <h1 className="font-black text-5xl text-center text-zinc-950">
          Join the TodoDrop Community
          <br /> (Add zoop effect)
        </h1>
      </aside>

      <div className="flex flex-1 justify-center items-center">{children}</div>
    </main>
  )
}
