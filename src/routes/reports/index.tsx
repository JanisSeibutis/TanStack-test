import { createFileRoute } from '@tanstack/react-router'
import { TestForm } from '@/components/forms/Test-form'

export const Route = createFileRoute('/reports/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <TestForm />
    </div>
  )
}
