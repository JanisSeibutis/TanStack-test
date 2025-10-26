import { createFileRoute, redirect } from '@tanstack/react-router'
import { supabase } from '@/supabaseClient'

import { TestForm } from '@/components/forms/TestForm'

export const Route = createFileRoute('/reports/')({
  beforeLoad: async () => {
    const { data } = await supabase.auth.getUser()
    const user = data.user
    if (!user) {
      throw redirect({ to: '/auth/login' })
    }
    return { user }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <TestForm />
    </div>
  )
}
