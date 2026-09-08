import type { ActivityEvaluation } from '@/schemas/evaluation';

export function DecisionScore({ evaluation }: { evaluation: ActivityEvaluation }) {
  const angle = Math.round(evaluation.overallScore * 3.6);
  return (
    <section className="rounded-[28px] bg-[#111d2c] p-6 text-white sm:p-8">
      <div className="grid gap-7 md:grid-cols-[180px_1fr] md:items-center">
        <div className="relative mx-auto grid size-40 place-items-center rounded-full" style={{ background: `conic-gradient(#c8ff5a ${angle}deg, rgba(255,255,255,.09) 0deg)` }}>
          <div className="grid size-[132px] place-items-center rounded-full bg-[#111d2c] text-center"><div><span className="block text-5xl font-black tracking-[-0.06em] tabular-nums">{evaluation.overallScore}</span><span className="text-sm font-semibold text-slate-400">out of 100</span></div></div>
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-3"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#c8ff5a]">Strategic leverage</p><span className="rounded-full border border-white/15 px-2.5 py-1 text-xs font-black uppercase tracking-wider">{evaluation.recommendation}</span></div>
          <h1 className="mt-3 text-2xl font-black leading-tight tracking-[-0.035em] sm:text-3xl">{evaluation.verdict}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">{evaluation.summary}</p>
        </div>
      </div>
    </section>
  );
}
