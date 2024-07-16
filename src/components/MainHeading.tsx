import React from "react"

const MainHeading = ({ title }: { title: string }) => {
  return (
    <h3 className="text-5xl text-center font-bold uppercase text-zinc-600/40">
      {title}
      <span className="font-black text-blue-400">.</span>
    </h3>
  )
}

export default MainHeading
