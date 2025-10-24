import { Link, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { Button } from './ui/button'
import { supabase } from '@/supabaseClient'

export const Header = () => {
  const navigate = useNavigate()
  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate({ to: '/' })
  }
  const queryClient = useQueryClient()
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      // invalidate user query
      queryClient.invalidateQueries({ queryKey: ['user'] })
    })
    return () => listener.subscription.unsubscribe()
  }, [queryClient])

  return (
    <header className="flex gap-5 pl-40 h-10 items-center bg-green-400 text-lg font-bold">
      <Link to="/">Home</Link>
      <Link to="/reports">Reports</Link>
      <Button
        className="ml-auto mr-10 bg-transparent hover:bg-transparent hover:underline text-lg font-bold text-black cursor-pointer"
        onClick={handleLogout}
      >
        Log out
      </Button>
    </header>
  )
}
