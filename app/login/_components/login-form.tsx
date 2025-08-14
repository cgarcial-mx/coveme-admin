'use client';

import { useTransition } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { login } from '@/app/login/actions/login.server';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useForm } from '@tanstack/react-form';
import { loginSchema } from '@/schemas/auth/login.schema';
import { useLogin } from '../hooks/mutations/useLogin';

export function LoginForm() {
  const [pending, start] = useTransition();
  const { toast } = useToast();
  const router = useRouter();
  const { mutateAsync: login, isPending } = useLogin();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await login(value);
        if (res?.ok) {
          toast({
            title: 'Welcome back!',
            description: 'You are now signed in.',
          });
          router.push('/dashboard');
          return;
        }
        toast({
          title: 'Error',
          description: res?.message || 'Invalid credentials',
          variant: 'destructive',
        });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'An error occurred';
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });
      }
    },
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Login to MarchanteMX Admin</CardTitle>
        <CardDescription>
          {
            'Sign in to manage marketplaces, review listing comments and ratings, and receive notifications for products, orders, and comments.'
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form
          onSubmit={(e) => {
            console.log('submit');
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="grid gap-4"
        >
          <form.Field
            name="email"
            validators={{
              onBlur: ({ value }) => {
                if (!value) return 'Email is required';
                if (!value.includes('@')) return 'Email must contain @';
                if (!value.includes('.')) return 'Email must contain a domain';
                if (value.indexOf('@') === 0)
                  return 'Email cannot start with @';
                if (value.indexOf('@') === value.length - 1)
                  return 'Email cannot end with @';
                return undefined;
              },
            }}
          >
            {(field) => (
              <div className="grid gap-2">
                <Label htmlFor={field.name}>Email</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  placeholder="you@company.com"
                  required
                  autoComplete="email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className={
                    field.state.meta.errors.length > 0 &&
                    field.state.meta.isTouched
                      ? 'border-destructive'
                      : ''
                  }
                />
                {field.state.meta.errors && field.state.meta.isTouched && (
                  <div className="text-sm text-red-500">
                    {field.state.meta.errors}
                  </div>
                )}
              </div>
            )}
          </form.Field>

          <form.Field
            name="password"
            validators={{
              onBlur: ({ value }) => {
                console.log('onBlur', value);
                if (!value) return 'Password is required';
                if (value.length < 6)
                  return 'Password must be at least 6 characters';
                return undefined;
              },
            }}
          >
            {(field) => (
              <div className="grid gap-2">
                <Label htmlFor={field.name}>Password</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  required
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className={
                    field.state.meta.errors.length > 0 &&
                    field.state.meta.isTouched
                      ? 'border-destructive'
                      : ''
                  }
                />
                {field.state.meta.errors && field.state.meta.isTouched && (
                  <div className="text-sm text-red-500">
                    {field.state.meta.errors}
                  </div>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="remember">
            {(field) => (
              <div className="flex items-center gap-2">
                <Checkbox
                  id={field.name}
                  name={field.name}
                  checked={field.state.value}
                  onCheckedChange={(checked) =>
                    field.handleChange(checked === true)
                  }
                />
                <Label htmlFor={field.name}>Remember me</Label>
              </div>
            )}
          </form.Field>

          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
            Sign in
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex w-full items-center justify-between text-sm text-muted-foreground">
        <Link href="#" className="underline hover:text-foreground">
          Forgot password?
        </Link>
        <span>© {new Date().getFullYear()} MarchanteMX</span>
      </CardFooter>
    </Card>
  );
}
