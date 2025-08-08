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
import { login } from '@/components/login.server';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export function LoginForm() {
  const [pending, start] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

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
          action={(formData) =>
            start(async () => {
              const res = await login(formData);
              if (res?.ok) {
                toast({
                  title: 'Welcome back!',
                  description: 'You are now signed in.',
                });
                router.push('/dashboard');
              } else {
                toast({
                  title: 'Login failed',
                  description: res?.message || 'Invalid credentials',
                  variant: 'destructive',
                });
              }
            })
          }
          className="grid gap-4"
        >
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@company.com"
              required
              defaultValue="admin@example.com"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              defaultValue="password"
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" name="remember" defaultChecked />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Button type="submit" disabled={pending}>
            {pending && <Loader2 className="mr-2 size-4 animate-spin" />}
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
