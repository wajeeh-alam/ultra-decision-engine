'use client';
/* oxlint-disable jsx-a11y/label-has-associated-control, react/react-compiler */

import { useEffect, useMemo, useState } from 'react';
import { RotateCcw, Save, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { beginnerProfile, demoProfile } from '@/data/demo-profile';
import {
  getStoredProfile,
  resetProfile,
  saveProfile,
} from '@/lib/storage/profile';
import type { StudentProfile } from '@/schemas/student';

const splitLines = (value: string) =>
  value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
const evidenceDimensions = [
  ['Technical depth', 76],
  ['Leadership', 46],
  ['Research', 18],
  ['Product building', 91],
  ['Collaboration', 52],
  ['Real-world impact', 68],
  ['Open source', 14],
  ['Communication', 43],
] as const;
const fieldClass =
  'border-white/25 bg-[#0a0a0a] text-white placeholder:text-zinc-700 focus-visible:border-[#35c9f2] focus-visible:ring-1 focus-visible:ring-[#35c9f2]';

export function ProfileEditor() {
  const [profile, setProfile] = useState<StudentProfile>(demoProfile);
  const [saved, setSaved] = useState(false);
  useEffect(() => setProfile(getStoredProfile()), []);
  const isBeginner = profile.projects.length === 0;
  const dimensions = useMemo(
    () =>
      isBeginner
        ? evidenceDimensions.map(
            ([label, score]) =>
              [
                label,
                label === 'Technical depth'
                  ? 18
                  : label === 'Product building'
                    ? 8
                    : Math.min(score, 25),
              ] as const,
          )
        : evidenceDimensions,
    [isBeginner],
  );
  const update = <K extends keyof StudentProfile>(
    key: K,
    value: StudentProfile[K],
  ) => setProfile((current) => ({ ...current, [key]: value }));
  const commit = () => {
    saveProfile(profile);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="grid gap-0 overflow-hidden rounded-xl border border-white/35 lg:grid-cols-[1fr_360px]">
      <section className="space-y-6 bg-black p-5 text-white sm:p-7 lg:border-r lg:border-white/35">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-zinc-300">
            Name
            <Input
              value={profile.name}
              onChange={(e) => update('name', e.target.value)}
              className={fieldClass}
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-zinc-300">
            Stage
            <Input
              value={profile.grade ?? ''}
              onChange={(e) => update('grade', e.target.value)}
              className={fieldClass}
            />
          </label>
        </div>
        <label className="block space-y-2 text-sm font-medium text-zinc-300">
          Goals <span className="font-normal text-zinc-600">one per line</span>
          <Textarea
            value={profile.goals.join('\n')}
            onChange={(e) => update('goals', splitLines(e.target.value))}
            className={`min-h-28 ${fieldClass}`}
          />
        </label>
        <label className="block space-y-2 text-sm font-medium text-zinc-300">
          Skills <span className="font-normal text-zinc-600">one per line</span>
          <Textarea
            value={profile.skills.map((s) => s.name).join('\n')}
            onChange={(e) =>
              update(
                'skills',
                splitLines(e.target.value).map((name) => ({ name })),
              )
            }
            className={`min-h-32 ${fieldClass}`}
          />
        </label>
        <label className="block space-y-2 text-sm font-medium text-zinc-300">
          Projects{' '}
          <span className="font-normal text-zinc-600">one per line</span>
          <Textarea
            value={profile.projects.map((p) => p.title).join('\n')}
            onChange={(e) =>
              update(
                'projects',
                splitLines(e.target.value).map((title, index) => ({
                  id: `edited-project-${index}`,
                  title,
                  description: title,
                })),
              )
            }
            className={`min-h-28 ${fieldClass}`}
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block space-y-2 text-sm font-medium text-zinc-300">
            Activities
            <Textarea
              value={profile.activities.map((a) => a.title).join('\n')}
              onChange={(e) =>
                update(
                  'activities',
                  splitLines(e.target.value).map((title, index) => ({
                    id: `edited-activity-${index}`,
                    title,
                    category: 'Activity',
                    description: title,
                  })),
                )
              }
              className={fieldClass}
            />
          </label>
          <label className="block space-y-2 text-sm font-medium text-zinc-300">
            Achievements
            <Textarea
              value={profile.achievements.join('\n')}
              onChange={(e) =>
                update('achievements', splitLines(e.target.value))
              }
              className={fieldClass}
            />
          </label>
        </div>
        <label className="block max-w-xs space-y-2 text-sm font-medium text-zinc-300">
          Hours available per week
          <Input
            type="number"
            min={0}
            value={profile.constraints?.hoursAvailablePerWeek ?? 10}
            onChange={(e) =>
              update('constraints', {
                ...profile.constraints,
                hoursAvailablePerWeek: Number(e.target.value),
              })
            }
            className={fieldClass}
          />
        </label>
        <div className="flex flex-wrap gap-3 border-t border-white/20 pt-6">
          <Button
            onClick={commit}
            className="rounded-lg bg-white font-semibold text-black hover:bg-zinc-200"
          >
            <Save className="size-4" /> {saved ? 'Saved' : 'Save profile'}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              resetProfile();
              setProfile(demoProfile);
            }}
            className="rounded-lg border-white/40 bg-transparent text-white hover:bg-white hover:text-black"
          >
            <RotateCcw className="size-4" /> Reset Wajeeh
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setProfile(beginnerProfile);
              saveProfile(beginnerProfile);
            }}
            className="rounded-lg border-white/40 bg-transparent text-white hover:bg-white hover:text-black"
          >
            <Sparkles className="size-4" /> Test beginner profile
          </Button>
        </div>
      </section>
      <aside className="bg-black p-6 text-white">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#35c9f2]">
          Your current evidence
        </p>
        <h2 className="mt-2 text-xl font-semibold">Evidence map</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-500">
          Directional, based on the evidence in your profile.
        </p>
        <div className="mt-6 space-y-4">
          {dimensions.map(([label, score]) => (
            <div key={label}>
              <div className="mb-1.5 flex justify-between text-sm">
                <span className="text-zinc-400">{label}</span>
                <span className="font-medium tabular-nums">{score}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/15">
                <div
                  className="h-full rounded-full bg-[#35c9f2]"
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-7 border-t border-white/25 pt-4">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-600">
            Best next gap
          </p>
          <p className="mt-1 font-semibold">
            {isBeginner
              ? 'Ship a complete product'
              : 'Operate in a production codebase'}
          </p>
        </div>
      </aside>
    </div>
  );
}
