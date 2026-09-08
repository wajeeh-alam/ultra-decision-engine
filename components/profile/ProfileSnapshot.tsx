'use client';

import Link from 'next/link';
import { ArrowDownRight } from 'lucide-react';
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
  const totalUsers = profile.projects.reduce(
    (sum, project) => sum + (project.users ?? 0),
    0,
  );
  return (
    <aside className="pb-8 text-white lg:pr-10">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
          01 / Existing profile
        </p>
        <span className="text-xs text-zinc-600">CURRENT EVIDENCE</span>
      </div>
      <h2 className="text-2xl font-semibold tracking-[-0.03em]">
        {profile.name}
      </h2>
      <p className="mt-1 text-sm text-zinc-500">{profile.grade}</p>
      <div className="mt-6 grid grid-cols-2 border-y border-white/30">
        <div className="border-r border-white/20 py-4">
          <span className="block text-3xl font-semibold tabular-nums">
            {profile.projects.length}
          </span>
          <span className="text-xs uppercase tracking-wider text-zinc-500">
            Shipped products
          </span>
        </div>
        <div className="py-4 pl-5">
          <span className="block text-3xl font-semibold tabular-nums">
            {totalUsers || '—'}
          </span>
          <span className="text-xs uppercase tracking-wider text-zinc-500">
            Users reached
          </span>
        </div>
      </div>
      <div className="mt-5">
        <p className="text-xs uppercase tracking-[0.16em] text-zinc-600">
          Already demonstrated
        </p>
        <div className="mt-2 divide-y divide-white/15 text-sm">
          {[
            ['Full-stack product building', beginner ? 'Gap' : 'Strong'],
            ['Independent shipping', beginner ? 'Gap' : 'Strong'],
            ['Real-user adoption', totalUsers ? 'Strong' : 'Gap'],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between py-2.5"
            >
              <span className="text-zinc-400">{label}</span>
              <span
                className={value === 'Strong' ? 'text-[#41c969]' : 'text-white'}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-5 text-sm leading-6 text-zinc-400">
        The next bet should fill a gap—not produce a fifth version of the same
        evidence.
      </p>
      <Link
        href="/profile"
        className="mt-4 flex items-center gap-2 text-sm font-medium text-white underline underline-offset-4"
      >
        See the full profile <ArrowDownRight className="size-4" />
      </Link>
    </aside>
  );
}
