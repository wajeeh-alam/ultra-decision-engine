import type { ActivityEvaluation } from '@/schemas/evaluation';

const labels: Record<keyof ActivityEvaluation['scores'], string> = {
  goalAlignment: 'Goal alignment',
  skillGrowth: 'Skill growth',
  marginalProfileValue: 'Marginal profile value',
  differentiation: 'Differentiation',
  evidencePotential: 'Evidence potential',
  timeEfficiency: 'Time efficiency',
};

export function DimensionScores({
  scores,
}: {
  scores: ActivityEvaluation['scores'];
}) {
  return (
    <section className="rounded-xl border border-white/35 bg-black p-6 text-white">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
            Score anatomy
          </p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight">
            Six dimensions of leverage
          </h2>
        </div>
        <span className="text-xs text-zinc-600">Weighted, not averaged</span>
      </div>
      <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
        {(Object.entries(scores) as [keyof typeof scores, number][]).map(
          ([key, value]) => (
            <div key={key}>
              <div className="mb-2 flex justify-between text-sm">
                <span
                  className={
                    key === 'marginalProfileValue'
                      ? 'font-semibold text-[#41c969]'
                      : 'font-medium text-zinc-400'
                  }
                >
                  {labels[key]}
                </span>
                <span className="font-semibold tabular-nums text-white">
                  {value}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/15">
                <div
                  className={
                    key === 'marginalProfileValue'
                      ? 'h-full rounded-full bg-[#41c969]'
                      : 'h-full rounded-full bg-[#35c9f2]'
                  }
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
