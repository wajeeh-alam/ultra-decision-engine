import { Check, CopyCheck } from 'lucide-react';
import type { ActivityEvaluation } from '@/schemas/evaluation';

export function ProfileOverlapCard({ overlap }: { overlap: ActivityEvaluation['profileOverlap'] }) {
  return <section className="rounded-[24px] border border-rose-200 bg-[#fff8f6] p-6"><div className="flex items-start gap-4"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-rose-100 text-rose-700"><CopyCheck className="size-5" /></span><div className="min-w-0"><p className="text-xs font-bold uppercase tracking-[0.14em] text-rose-600">Profile overlap · {overlap.score}/100</p><h2 className="mt-1 text-xl font-black tracking-tight text-[#111d2c]">You’re already proving this.</h2><p className="mt-3 leading-7 text-slate-600">{overlap.explanation}</p>{overlap.overlappingEvidence.length > 0 && <div className="mt-5 flex flex-wrap gap-2">{overlap.overlappingEvidence.map((item) => <span key={item} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-bold text-slate-700 shadow-sm"><Check className="size-3.5 text-rose-600" />{item}</span>)}</div>}</div></div></section>;
}
