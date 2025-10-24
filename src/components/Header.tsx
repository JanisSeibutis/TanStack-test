import { Link } from '@tanstack/react-router'

export const Header = () => {
  return (
    <header className="flex gap-5 pl-40 h-10 items-center bg-green-400 text-lg font-bold">
      <Link to="/">Home</Link>
      <Link to="/reports">Reports</Link>
      <Link to="/login" className="ml-auto mr-10">
        Log out
      </Link>
    </header>
  )
}
