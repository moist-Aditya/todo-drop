import ZoopText from "@/components/ZoopText"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="flex h-screen">
      <aside className="bg-violet-300 justify-center items-center hidden md:flex md:w-[50vw] lg:w-[60vw] 2xl:w-[70vw]">
        <h1 className="text-4xl lg:text-7xl text-center">
          <span className="mb-6 block font-black text-violet-400 uppercase">
            Join now,
          </span>
          <div className="relative">
            <ZoopText href="/" className="z-10">
              TodoDrop
            </ZoopText>
            <div className="w-[50%] bg-yellow-500 absolute inset-y-[-10%] -rotate-12 right-0" />
          </div>
        </h1>
      </aside>

      <div className="flex flex-1 justify-center items-center">{children}</div>
    </main>
  )
}
