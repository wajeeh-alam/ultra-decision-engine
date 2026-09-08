'use client';
/* oxlint-disable react/react-compiler */

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/shared/EmptyState';
import { ScoreBadge } from '@/components/shared/ScoreBadge';
import { clearDecisions, getDecisions } from '@/lib/storage/decisions';
import type { ActivityEvaluation } from '@/schemas/evaluation';

export default function HistoryPage() {
  const [items, setItems] = useState<ActivityEvaluation[]>([]);
  useEffect(() => setItems(getDecisions()), []);
  return <main className="min-h-[calc(100vh-64px)] bg-[#f5f7f8] px-4 py-10 sm:px-6"><div className="mx-auto max-w-[980px]"><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#62851f]">My decisions</p><h1 className="mt-2 text-4xl font-black tracking-[-0.045em] text-[#111d2c]">Your decision trail.</h1><p className="mt-3 text-lg text-slate-600">Revisit what you considered and how the tradeoffs changed.</p></div>{items.length > 0 && <Button variant="outline" onClick={() => { clearDecisions(); setItems([]); }} className="rounded-xl text-slate-500"><Trash2 className="size-4" /> Clear history</Button>}</div>{items.length === 0 ? <EmptyState title="No decisions yet" body="Your analyzed activities will be saved here on this device." /> : <div className="grid gap-4 sm:grid-cols-2">{items.map((item) => <Link key={item.id} href={`/decision/${item.id}`} className="group rounded-[22px] border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-lg"><div className="flex items-start justify-between gap-4"><ScoreBadge score={item.overallScore} /><ArrowUpRight className="size-5 text-slate-300 transition group-hover:text-slate-800" /></div><h2 className="mt-5 text-lg font-black leading-snug tracking-tight text-[#111d2c]">{item.proposal.title}</h2><div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4"><span className="text-sm text-slate-400">{new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span><span className="text-xs font-black uppercase tracking-wider text-slate-500">{item.recommendation}</span></div></Link>)}</div>}</div></main>;
}
