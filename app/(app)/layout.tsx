import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { ThemeToggle } from '@/components/theme-toggle';
import { CommandMenu } from '@/components/command-menu';
import { Bell, ChevronRight, LogOut, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { UserNav } from '@/components/user-nav';
import { logout } from './server-actions';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { UserHydrationWrapper } from '@/components/user-hydration-wrapper';

export default async function AppLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) {
    redirect('/login');
  }

  return (
    <UserHydrationWrapper token={token}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b bg-background px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mx-2 h-6" />
            <Breadcrumbs />
            <div className="ml-auto flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2">
                <Search className="size-4 text-muted-foreground" />
                <CommandMenu />
                <Input
                  placeholder="Search anything... (⌘K)"
                  className="h-8 w-[220px]"
                />
              </div>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="size-5" />
                <span className="sr-only">Notifications</span>
                <span className="absolute right-1 top-1 size-2 rounded-full bg-emerald-500" />
              </Button>
              <ThemeToggle />
              <UserNav />
              <form action={logout}>
                <Button
                  variant="outline"
                  size="sm"
                  type="submit"
                  className="hidden md:inline-flex"
                >
                  <LogOut className="mr-2 size-4" />
                  Logout
                </Button>
              </form>
            </div>
          </header>
          <main className="p-3 md:p-6">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </UserHydrationWrapper>
  );
}
