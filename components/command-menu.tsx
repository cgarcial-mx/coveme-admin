'use client';

import * as React from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useRouter } from 'next/navigation';
import {
  Home,
  Package,
  ShoppingBasket,
  ListChecks,
  ListOrdered,
  Search,
  MessageSquare,
  Bell,
  Layers,
  Building,
  Puzzle,
  Key,
} from 'lucide-react';

const items = [
  { label: 'Dashboard', href: '/dashboard', icon: Home },
  { label: 'Productos', href: '/products', icon: Package },
  { label: 'Marcas', href: '/brands', icon: Layers },
  { label: 'Proveedores', href: '/providers', icon: Building },
  { label: 'Listings', href: '/listings', icon: ShoppingBasket },
  { label: 'Reviews', href: '/reviews', icon: MessageSquare },
  { label: 'Coincidencias', href: '/matching', icon: ListChecks },
  { label: 'Pedidos', href: '/orders', icon: ListOrdered },
  { label: 'Notificaciones', href: '/notifications', icon: Bell },
  { label: 'Credentiales', href: '/settings/marketplaces', icon: Key },
  { label: 'Conectores', href: '/integrations/connectors', icon: Puzzle },
];

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        aria-label="Open Command Menu"
      >
        <Search className="size-4" />
        <span className="hidden md:inline">
          Ir a (
          {typeof window !== 'undefined' &&
          navigator.platform.toLowerCase().includes('mac')
            ? '⌘ + K'
            : 'Ctrl + K'}
          )
        </span>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Navegar a..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigate">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <CommandItem
                  key={item.href}
                  onSelect={() => {
                    setOpen(false);
                    router.replace(item.href);
                  }}
                >
                  <Icon className="mr-2 size-4" />
                  <span>{item.label}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
