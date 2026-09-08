'use client';

import Link from 'next/link';
import { ArrowDownRight, Layers3 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { demoProfile } from '@/data/demo-profile';
import { getStoredProfile } from '@/lib/storage/profile';
import type { StudentProfile } from '@/schemas/student';

export function ProfileSnapshot() {
  const [profile, setProfile] = useState<StudentProfile>(demoProfile);
  useEffect(() => {
    const update = () => setProfile(getStoredProfile());
    update();
    window.addEventListener('ultra-profile-change', update);
    return () => window.removeEventListener('ultra-profile-change', update);
  }, []);
  const beginner = profile.projects.length === 0;
  return <aside className="rounded-[24px] bg-[#111d2c] p-6 text-white lg:mt-24"><div className="mb-8 flex items-start justify-between"><div className="grid size-10 place-items-center rounded-xl bg-white/10"><Layers3 className="size-5 text-[#c8ff5a]" /></div><span className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">{profile.name.split(' ')[0]}’s profile</span></div><p className="text-xl font-bold tracking-[-0.025em]">{beginner ? 'Your next project can create a new foundation.' : 'You already have strong product-building evidence.'}</p><p className="mt-3 text-sm leading-6 text-slate-300">{beginner ? 'Prioritize finishing, shipping, and getting feedback from a real user.' : 'The next useful bet should add a new operating environment—not just another familiar codebase.'}</p><div className="mt-7 space-y-3 border-t border-white/10 pt-6 text-sm"><div className="flex items-center justify-between"><span className="text-slate-400">Product building</span><span className="font-bold text-[#c8ff5a]">{beginner ? 'Gap' : 'Strong'}</span></div><div className="flex items-center justify-between"><span className="text-slate-400">Open source</span><span className="font-bold">Gap</span></div><div className="flex items-center justify-between"><span className="text-slate-400">Research depth</span><span className="font-bold">Gap</span></div></div><Link href="/profile" className="mt-7 flex items-center gap-2 text-sm font-bold text-[#c8ff5a]">View evidence map <ArrowDownRight className="size-4" /></Link></aside>;
}
