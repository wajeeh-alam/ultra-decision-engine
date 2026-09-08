import { Hourglass } from 'lucide-react';
import type { ActivityEvaluation } from '@/schemas/evaluation';

export function OpportunityCostCard({
  cost,
}: {
  cost: ActivityEvaluation['opportunityCost'];
}) {
  const color =
    cost.severity === 'high'
      ? 'border-red-500/60 text-red-400'
      : cost.severity === 'medium'
        ? 'border-amber-400/60 text-amber-400'
        : 'border-[#41c969]/60 text-[#41c969]';
  return (
    <section className="border-y border-white/30 bg-black py-6 text-white">
      <div className="flex gap-4">
        <Hourglass className="mt-1 size-5 shrink-0 text-zinc-500" />
        <div>
          <div className="flex items-center gap-3">
            <h2 className="font-semibold">Opportunity cost</h2>
            <span
              className={`rounded-md border px-2.5 py-1 text-xs font-semibold uppercase tracking-wider ${color}`}
            >
              {cost.severity}
            </span>
          </div>
          <p className="mt-2 leading-7 text-zinc-400">{cost.explanation}</p>
        </div>
      </div>
    </section>
  );
}
