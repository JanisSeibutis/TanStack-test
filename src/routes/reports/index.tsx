import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/supabaseClient'

import { TestForm } from '@/components/forms/Test-form'
import { Login } from '@/components/Login'

export const Route = createFileRoute('/reports/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser()
      return data.user
    },
    staleTime: Infinity,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Login />
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <TestForm />
    </div>
  )
}
