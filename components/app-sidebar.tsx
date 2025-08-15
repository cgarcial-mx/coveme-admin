'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarRail,
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import {
  Activity,
  BarChart2,
  Boxes,
  Bot,
  Building,
  CheckSquare,
  Cog,
  Database,
  FileCode2,
  Globe,
  HelpCircle,
  Home,
  Key,
  Layers,
  ListChecks,
  ListOrdered,
  Network,
  Package,
  PackageOpen,
  Plug,
  Puzzle,
  Settings,
  ShoppingBasket,
  Siren,
  Users,
  Bell,
  MessageSquare,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import useUser from '@/hooks/useUser';
import { useEffect } from 'react';

const primaryItems = [
  { title: 'Dashboard', href: '/dashboard', icon: Home },
  { title: 'Clients', href: '/clients', icon: Users },
  { title: 'Products', href: '/products', icon: Package },
  { title: 'Brands', href: '/brands', icon: Layers },
  { title: 'Providers', href: '/providers', icon: Building },
  { title: 'Listings', href: '/listings', icon: ShoppingBasket },
  { title: 'Reviews', href: '/reviews', icon: MessageSquare },
  { title: 'Matching', href: '/matching', icon: ListChecks },
  { title: 'Orders', href: '/orders', icon: ListOrdered },
  { title: 'Notifications', href: '/notifications', icon: Bell },
  { title: 'Analytics', href: '/analytics', icon: BarChart2 },
];

const operationsItems = [
  { title: 'Credentials', href: '/settings/marketplaces', icon: Key },
  { title: 'Connectors', href: '/integrations/connectors', icon: Puzzle },
  // { title: 'Sync Center', href: '/settings/sync', icon: Network },
  // { title: 'Webhooks', href: '/integrations/webhooks', icon: Siren },
  // { title: 'Data', href: '/integrations/data', icon: Database },
];

const adminItems = [
  { title: 'Settings', href: '/settings', icon: Settings },
  { title: 'Integrations', href: '/integrations', icon: Plug },
  { title: 'Monitoring', href: '/monitoring', icon: Activity },
  { title: 'Help & Support', href: '/support', icon: HelpCircle },
  { title: 'API', href: '/integrations/api', icon: FileCode2 },
];

export function AppSidebar() {
  const pathname = usePathname() || '/dashboard';

  const { data } = useUser();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-2">
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5">
          <Package className="size-5" />
          <div className="flex-1">
            <div className="text-sm font-semibold leading-tight">
              Marchante MX Admin
            </div>
            <div className="text-xs text-muted-foreground leading-tight">
              {data?.user?.client_name || 'Cargando...'}
            </div>
          </div>
          <Badge variant="secondary" className="rounded-sm">
            v1
          </Badge>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {primaryItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-2"
                      >
                        <Icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Operations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {operationsItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-2"
                      >
                        <Icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-2"
                      >
                        <Icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Market Intelligence">
                  <Link href="/analytics/market-intelligence">
                    <Globe />
                    <span>Market Intelligence</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Predictive Analytics">
                  <Link href="/analytics/predictive">
                    <Bot />
                    <span>Predictive Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-2 pb-2">
        <div className="rounded-md border px-2 py-1.5 text-xs">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Cog className="size-3.5" />
            <span>System</span>
          </div>
          <div className="mt-1 grid grid-cols-2 gap-1 text-muted-foreground">
            <span>Uptime</span>
            <span className="text-right">99.98%</span>
            <span>Latency</span>
            <span className="text-right">120ms</span>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
