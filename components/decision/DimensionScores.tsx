import type { ActivityEvaluation } from '@/schemas/evaluation';

const labels: Record<keyof ActivityEvaluation['scores'], string> = {
  goalAlignment: 'Goal alignment',
  skillGrowth: 'Skill growth',
  marginalProfileValue: 'Marginal profile value',
  differentiation: 'Differentiation',
  evidencePotential: 'Evidence potential',
  timeEfficiency: 'Time efficiency',
};

export function DimensionScores({ scores }: { scores: ActivityEvaluation['scores'] }) {
  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-6">
      <div className="mb-5 flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Score anatomy</p><h2 className="mt-1 text-xl font-black tracking-tight">Six dimensions of leverage</h2></div><span className="text-xs text-slate-400">Weighted, not averaged</span></div>
      <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
        {(Object.entries(scores) as [keyof typeof scores, number][]).map(([key, value]) => <div key={key}><div className="mb-2 flex justify-between text-sm"><span className={key === 'marginalProfileValue' ? 'font-black text-[#3c5b05]' : 'font-semibold text-slate-600'}>{labels[key]}</span><span className="font-black tabular-nums text-slate-950">{value}</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className={key === 'marginalProfileValue' ? 'h-full rounded-full bg-[#84b52a]' : 'h-full rounded-full bg-[#26394f]'} style={{ width: `${value}%` }} /></div></div>)}
      </div>
    </section>
  );
}
