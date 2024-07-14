import Link from "next/link"

const Home = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Link href={"/dashboard"} className="btn-primary">
        Get Started
      </Link>
    </div>
  )
}

export default Home
