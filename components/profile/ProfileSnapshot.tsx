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
  return (
    <aside className="border-t border-white/30 py-7 text-white lg:mt-24 lg:border-l lg:border-t-0 lg:py-2 lg:pl-8">
      <div className="mb-7 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Layers3 className="size-5 text-[#35c9f2]" />
          <span className="text-sm text-zinc-500">
            {profile.name.split(' ')[0]}’s profile
          </span>
        </div>
        <span className="text-xs text-zinc-600">CURRENT EVIDENCE</span>
      </div>
      <p className="text-xl font-semibold tracking-[-0.02em]">
        {beginner
          ? 'Your next project can create a new foundation.'
          : 'You already have strong product-building evidence.'}
      </p>
      <p className="mt-3 text-sm leading-6 text-zinc-400">
        {beginner
          ? 'Prioritize finishing, shipping, and getting feedback from a real user.'
          : 'The next useful bet should add a new operating environment—not just another familiar codebase.'}
      </p>
      <div className="mt-7 divide-y divide-white/15 border-y border-white/30 text-sm">
        <div className="flex items-center justify-between py-3">
          <span className="text-zinc-400">Product building</span>
          <span className="font-semibold text-[#41c969]">
            {beginner ? 'Gap' : 'Strong'}
          </span>
        </div>
        <div className="flex items-center justify-between py-3">
          <span className="text-zinc-400">Open source</span>
          <span>Gap</span>
        </div>
        <div className="flex items-center justify-between py-3">
          <span className="text-zinc-400">Research depth</span>
          <span>Gap</span>
        </div>
      </div>
      <Link
        href="/profile"
        className="mt-6 flex items-center gap-2 text-sm font-medium text-white underline underline-offset-4"
      >
        View evidence map <ArrowDownRight className="size-4" />
      </Link>
    </aside>
  );
}
