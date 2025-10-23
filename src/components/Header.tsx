import { Link } from '@tanstack/react-router'

export const Header = () => {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/forms">Forms</Link>
    </>
  )
}
