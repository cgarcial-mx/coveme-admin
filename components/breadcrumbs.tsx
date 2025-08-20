'use client';

import { useSelectedLayoutSegments } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export function Breadcrumbs() {
  const segments = useSelectedLayoutSegments();
  const parts = [...segments];
  let href = '';
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm">
      {parts.map((part, idx) => {
        href += `/${part}`;
        const label = decodeURIComponent(part).replace(/^$$|$$$/g, '');
        const isLast = idx === parts.length - 1;
        return (
          <span key={href} className="flex items-center capitalize">
            {idx > 0 && (
              <ChevronRight className="mx-1 size-4 text-muted-foreground" />
            )}
            {isLast ? (
              <span aria-current="page" className="font-medium">
                {label}
              </span>
            ) : (
              <Link
                className="text-muted-foreground hover:text-foreground"
                href={href}
              >
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
