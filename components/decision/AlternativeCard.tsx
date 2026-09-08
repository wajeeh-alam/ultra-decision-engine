'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScoreBadge } from '@/components/shared/ScoreBadge';
import { requestEvaluation } from '@/lib/client/evaluate';
import { saveDecision } from '@/lib/storage/decisions';
import type { ActivityEvaluation } from '@/schemas/evaluation';

export function AlternativeCard({ alternative, rank }: { alternative: ActivityEvaluation['betterVersions'][number]; rank: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function evaluate() {
    setLoading(true);
    try { const item = await requestEvaluation(alternative.title); saveDecision(item); router.push(`/decision/${item.id}`); }
    finally { setLoading(false); }
  }
  return <article className={`flex h-full flex-col rounded-[22px] border p-5 ${rank === 1 ? 'border-[#9acb3b] bg-[#f5ffe4]' : 'border-slate-200 bg-white'}`}><div className="flex items-center justify-between"><span className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">{rank === 0 ? 'Better' : rank === 1 ? 'Best fit' : 'Alternative'}</span><ScoreBadge score={alternative.estimatedScore} /></div><h3 className="mt-5 text-lg font-black leading-snug tracking-tight text-[#111d2c]">{alternative.title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{alternative.whyBetter}</p><div className="mt-4 flex flex-wrap gap-1.5">{alternative.newDimensionsAdded.map((item) => <span key={item} className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-500">{item}</span>)}</div><Button onClick={evaluate} disabled={loading} variant="outline" className="mt-5 rounded-xl border-slate-300 bg-transparent font-bold">{loading ? 'Evaluating…' : 'Evaluate this instead'} <ArrowUpRight className="size-4" /></Button></article>;
}
