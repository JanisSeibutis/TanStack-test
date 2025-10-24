import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { supabase } from '@/supabaseClient'

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters long.'),
})

type FormData = {
  email: string
  password: string
}

export const Login = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login')

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }: { value: FormData }) => {
      const { email, password } = value
      if (mode == 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) {
          toast.error(error.message, {
            position: 'top-center',
            classNames: {
              content: 'flex m-auto',
            },
            style: {
              '--border-radius': 'calc(var(--radius)  + 4px)',
            } as React.CSSProperties,
          })
          return
        }
        toast.success('You are now logged in and can create a report.', {
          position: 'top-center',
          classNames: {
            content: 'flex m-auto',
          },
          style: {
            '--border-radius': 'calc(var(--radius)  + 4px)',
          } as React.CSSProperties,
        })
      }
      if (mode == 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        })

        if (error) {
          toast.error(error.message, {
            position: 'top-center',
            classNames: {
              content: 'flex m-auto',
            },
            style: {
              '--border-radius': 'calc(var(--radius)  + 4px)',
            } as React.CSSProperties,
          })
          return
        }

        const user = data.user

        if (user) {
          const { error: insertError } = await supabase.from('user').insert({
            id: user.id,
            email: user.email,
          })
          if (insertError) {
            toast.error(insertError.message)
            return
          }
        }

        toast.success('You are now signed up and can create a report.', {
          position: 'top-center',
          classNames: {
            content: 'flex m-auto',
          },
          style: {
            '--border-radius': 'calc(var(--radius)  + 4px)',
          } as React.CSSProperties,
        })
      }
    },
  })

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>{mode == 'login' ? 'Login' : 'Create account'}</CardTitle>
        <CardDescription>Please provide email and password.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="example@example.com"
                      autoComplete="on"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <FieldDescription>
                      Enter a password (min. 6 characters)
                    </FieldDescription>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      autoComplete="on"
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
            {mode == 'login' && (
              <Button
                type="button"
                variant="link"
                onClick={() => setMode('signup')}
              >
                Dont have account yet? Click here to create one.
              </Button>
            )}
            {mode == 'signup' && (
              <Button
                type="button"
                variant="link"
                onClick={() => setMode('login')}
              >
                Have account? Click here to log in.
              </Button>
            )}
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="login-form">
            {mode == 'login' ? 'Log in' : 'Sign up'}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
