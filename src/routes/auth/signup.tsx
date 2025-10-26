import { createFileRoute } from '@tanstack/react-router'
import { SingupForm } from '@/components/forms/SignupForm'

export const Route = createFileRoute('/auth/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SingupForm />
    </div>
  )
}
