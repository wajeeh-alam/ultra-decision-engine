'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Clock3, GitCompareArrows, Sparkles, UserRound } from 'lucide-react';
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
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Ultra Decision Engine home">
          <span className="grid size-8 place-items-center rounded-[10px] bg-[#111d2c] text-[13px] font-black text-[#c8ff5a]">U</span>
          <div className="leading-none">
            <span className="block text-[15px] font-bold tracking-[-0.02em] text-[#111d2c]">Ultra</span>
            <span className="mt-1 hidden text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400 sm:block">Decision engine</span>
          </div>
        </Link>
        <nav className="flex items-center gap-1" aria-label="Primary navigation">
          {links.map(({ href, label, icon: Icon }) => {
            const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
            return (
              <Link key={href} href={href} className={cn('flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors', active ? 'bg-[#111d2c] text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900')}>
                <Icon className="size-4" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
        </nav>
        <Link href="/profile" className="hidden items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-950 md:flex">
          {name} <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </header>
  );
}
