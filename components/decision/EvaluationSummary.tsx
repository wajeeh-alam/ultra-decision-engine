import { Lightbulb, Route } from 'lucide-react';
import type { ActivityEvaluation } from '@/schemas/evaluation';

export function EvaluationSummary({ evaluation }: { evaluation: ActivityEvaluation }) {
  return <section className="grid gap-4 md:grid-cols-2"><div className="rounded-[24px] border border-slate-200 bg-white p-6"><Lightbulb className="size-5 text-[#6f9822]" /><h2 className="mt-4 font-black">Why this score</h2><ol className="mt-3 space-y-3">{evaluation.reasoning.map((item, index) => <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600"><span className="font-black text-slate-300">0{index + 1}</span>{item}</li>)}</ol></div><div className="rounded-[24px] border border-slate-200 bg-white p-6"><Route className="size-5 text-[#6f9822]" /><h2 className="mt-4 font-black">Three next moves</h2><ol className="mt-3 space-y-3">{evaluation.nextSteps.map((item, index) => <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600"><span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#effbd8] text-xs font-black text-[#4f700d]">{index + 1}</span>{item}</li>)}</ol></div></section>;
}
