import { Hourglass } from 'lucide-react';
import type { ActivityEvaluation } from '@/schemas/evaluation';

export function OpportunityCostCard({ cost }: { cost: ActivityEvaluation['opportunityCost'] }) {
  const color = cost.severity === 'high' ? 'text-rose-700 bg-rose-100' : cost.severity === 'medium' ? 'text-amber-800 bg-amber-100' : 'text-emerald-700 bg-emerald-100';
  return <section className="rounded-[24px] border border-slate-200 bg-white p-6"><div className="flex gap-4"><Hourglass className="mt-1 size-5 shrink-0 text-slate-400" /><div><div className="flex items-center gap-3"><h2 className="font-black">Opportunity cost</h2><span className={`rounded-full px-2.5 py-1 text-xs font-black uppercase tracking-wider ${color}`}>{cost.severity}</span></div><p className="mt-2 leading-7 text-slate-600">{cost.explanation}</p></div></div></section>;
}
