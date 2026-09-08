'use client';
/* oxlint-disable jsx-a11y/label-has-associated-control, react/react-compiler */

import { useEffect, useMemo, useState } from 'react';
import { RotateCcw, Save, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { beginnerProfile, demoProfile } from '@/data/demo-profile';
import { getStoredProfile, resetProfile, saveProfile } from '@/lib/storage/profile';
import type { StudentProfile } from '@/schemas/student';

const splitLines = (value: string) => value.split('\n').map((item) => item.trim()).filter(Boolean);
const evidenceDimensions = [
  ['Technical depth', 76], ['Leadership', 46], ['Research', 18], ['Product building', 91],
  ['Collaboration', 52], ['Real-world impact', 68], ['Open source', 14], ['Communication', 43],
] as const;

export function ProfileEditor() {
  const [profile, setProfile] = useState<StudentProfile>(demoProfile);
  const [saved, setSaved] = useState(false);
  useEffect(() => setProfile(getStoredProfile()), []);
  const isBeginner = profile.projects.length === 0;
  const dimensions = useMemo(() => isBeginner ? evidenceDimensions.map(([label, score]) => [label, label === 'Technical depth' ? 18 : label === 'Product building' ? 8 : Math.min(score, 25)] as const) : evidenceDimensions, [isBeginner]);
  const update = <K extends keyof StudentProfile>(key: K, value: StudentProfile[K]) => setProfile((current) => ({ ...current, [key]: value }));
  const commit = () => { saveProfile(profile); setSaved(true); window.setTimeout(() => setSaved(false), 1500); };
  return <div className="grid gap-6 lg:grid-cols-[1fr_360px]"><section className="space-y-5 rounded-[26px] border border-slate-200 bg-white p-5 sm:p-7"><div className="grid gap-4 sm:grid-cols-2"><label className="space-y-2 text-sm font-bold">Name<Input value={profile.name} onChange={(e) => update('name', e.target.value)} /></label><label className="space-y-2 text-sm font-bold">Stage<Input value={profile.grade ?? ''} onChange={(e) => update('grade', e.target.value)} /></label></div><label className="block space-y-2 text-sm font-bold">Goals <span className="font-normal text-slate-400">one per line</span><Textarea value={profile.goals.join('\n')} onChange={(e) => update('goals', splitLines(e.target.value))} className="min-h-28" /></label><label className="block space-y-2 text-sm font-bold">Skills <span className="font-normal text-slate-400">one per line</span><Textarea value={profile.skills.map((s) => s.name).join('\n')} onChange={(e) => update('skills', splitLines(e.target.value).map((name) => ({ name })))} className="min-h-32" /></label><label className="block space-y-2 text-sm font-bold">Projects <span className="font-normal text-slate-400">one per line</span><Textarea value={profile.projects.map((p) => p.title).join('\n')} onChange={(e) => update('projects', splitLines(e.target.value).map((title, index) => ({ id: `edited-project-${index}`, title, description: title })))} className="min-h-28" /></label><div className="grid gap-4 sm:grid-cols-2"><label className="block space-y-2 text-sm font-bold">Activities<Textarea value={profile.activities.map((a) => a.title).join('\n')} onChange={(e) => update('activities', splitLines(e.target.value).map((title, index) => ({ id: `edited-activity-${index}`, title, category: 'Activity', description: title })))} /></label><label className="block space-y-2 text-sm font-bold">Achievements<Textarea value={profile.achievements.join('\n')} onChange={(e) => update('achievements', splitLines(e.target.value))} /></label></div><label className="block max-w-xs space-y-2 text-sm font-bold">Hours available per week<Input type="number" min={0} value={profile.constraints?.hoursAvailablePerWeek ?? 10} onChange={(e) => update('constraints', { ...profile.constraints, hoursAvailablePerWeek: Number(e.target.value) })} /></label><div className="flex flex-wrap gap-3 pt-2"><Button onClick={commit} className="rounded-xl bg-[#111d2c] font-bold"><Save className="size-4" /> {saved ? 'Saved' : 'Save profile'}</Button><Button variant="outline" onClick={() => { resetProfile(); setProfile(demoProfile); }} className="rounded-xl"><RotateCcw className="size-4" /> Reset Wajeeh</Button><Button variant="outline" onClick={() => { setProfile(beginnerProfile); saveProfile(beginnerProfile); }} className="rounded-xl"><Sparkles className="size-4" /> Test beginner profile</Button></div></section><aside className="h-fit rounded-[26px] bg-[#111d2c] p-6 text-white"><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#c8ff5a]">Your current evidence</p><h2 className="mt-2 text-xl font-black">Evidence map</h2><p className="mt-2 text-sm leading-6 text-slate-400">A directional view inferred from your profile—not an objective rating.</p><div className="mt-6 space-y-4">{dimensions.map(([label, score]) => <div key={label}><div className="mb-1.5 flex justify-between text-sm"><span className="text-slate-300">{label}</span><span className="font-bold tabular-nums">{score}</span></div><div className="h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-[#c8ff5a]" style={{ width: `${score}%` }} /></div></div>)}</div><div className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Best next gap</p><p className="mt-1 font-bold">{isBeginner ? 'Ship a complete product' : 'Operate in a production codebase'}</p></div></aside></div>;
}
