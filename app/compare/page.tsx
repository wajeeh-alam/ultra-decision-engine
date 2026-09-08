'use client';
/* oxlint-disable react/react-compiler */

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Crown } from 'lucide-react';
import { EmptyState } from '@/components/shared/EmptyState';
import { ScoreBadge } from '@/components/shared/ScoreBadge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { rankEvaluations } from '@/lib/decision-engine/compare';
import { getDecisions } from '@/lib/storage/decisions';
import type { ActivityEvaluation } from '@/schemas/evaluation';

export default function ComparePage() {
  const [items, setItems] = useState<ActivityEvaluation[]>([]);
  useEffect(() => setItems(rankEvaluations(getDecisions())), []);
  return <main className="min-h-[calc(100vh-64px)] bg-[#f5f7f8] px-4 py-10 sm:px-6"><div className="mx-auto max-w-[1180px]"><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#62851f]">Decision portfolio</p><h1 className="mt-2 text-4xl font-black tracking-[-0.045em] text-[#111d2c]">Compare your best bets.</h1><p className="mb-8 mt-3 max-w-2xl text-lg text-slate-600">Ranked by strategic leverage. Up to five recent decisions are shown.</p>{items.length === 0 ? <EmptyState title="Nothing to compare yet" body="Analyze two or more activities to see which one adds the most new value." /> : <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white"><Table><TableHeader><TableRow className="bg-slate-50"><TableHead className="min-w-64">Decision</TableHead><TableHead>Leverage</TableHead><TableHead>Marginal value</TableHead><TableHead>Time required</TableHead><TableHead className="min-w-56">Key new evidence</TableHead><TableHead>Recommendation</TableHead></TableRow></TableHeader><TableBody>{items.map((item, index) => <TableRow key={item.id} className={index === 0 ? 'bg-[#f7ffe9]' : ''}><TableCell><Link href={`/decision/${item.id}`} className="group font-bold text-[#111d2c]">{index === 0 && <Crown className="mr-2 inline size-4 text-[#6f9822]" />}{item.proposal.title}<ArrowUpRight className="ml-2 inline size-3.5 opacity-0 transition group-hover:opacity-100" /></Link></TableCell><TableCell><ScoreBadge score={item.overallScore} /></TableCell><TableCell className="font-black tabular-nums">{item.scores.marginalProfileValue}</TableCell><TableCell className="text-slate-500">{item.proposal.estimatedHoursPerWeek ?? 10}h/wk · {item.proposal.durationWeeks ?? 12} wk</TableCell><TableCell className="text-sm text-slate-500">{item.missingDimensionsAddressed.slice(0, 2).join(' · ') || 'Limited new evidence'}</TableCell><TableCell><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-black uppercase tracking-wider text-slate-600">{item.recommendation}</span></TableCell></TableRow>)}</TableBody></Table></div>}</div></main>;
}
