'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Clock3, GitCompareArrows, Sparkles, UserRound } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getStoredProfile } from '@/lib/storage/profile';

const links = [
  { href: '/', label: 'Decide', icon: Sparkles },
  { href: '/compare', label: 'Compare', icon: GitCompareArrows },
  { href: '/history', label: 'History', icon: Clock3 },
  { href: '/profile', label: 'Profile', icon: UserRound },
];

export function Navbar() {
  const pathname = usePathname();
  const [name, setName] = useState('Wajeeh Alam');
  useEffect(() => {
    const update = () => setName(getStoredProfile().name);
    update();
    window.addEventListener('ultra-profile-change', update);
    return () => window.removeEventListener('ultra-profile-change', update);
  }, []);
  return (
    <header className="sticky top-0 z-40 border-b border-white/30 bg-black/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1180px] items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="Ultra Decision Engine home"
        >
          <div className="leading-none text-white">
            <span className="block text-2xl font-light tracking-[-0.06em]">
              Ultr<span className="font-normal">a</span>
            </span>
            <span className="mt-1 hidden text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500 sm:block">
              Decision engine
            </span>
          </div>
        </Link>
        <nav
          className="flex h-full items-center gap-1 sm:gap-3"
          aria-label="Primary navigation"
        >
          {links.map(({ href, label, icon: Icon }) => {
            const active =
              href === '/' ? pathname === '/' : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'relative flex h-full items-center gap-2 px-2 text-sm font-medium transition-colors sm:px-3',
                  active
                    ? 'text-white after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:bg-white'
                    : 'text-zinc-500 hover:text-white',
                )}
              >
                <Icon className="size-4" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
        </nav>
        <Link
          href="/profile"
          className="hidden text-sm text-zinc-500 hover:text-white md:block"
        >
          {name}
        </Link>
      </div>
    </header>
  );
}
