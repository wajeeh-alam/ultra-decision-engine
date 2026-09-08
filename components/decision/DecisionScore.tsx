import type { ActivityEvaluation } from '@/schemas/evaluation';

export function DecisionScore({
  evaluation,
}: {
  evaluation: ActivityEvaluation;
}) {
  const angle = Math.round(evaluation.overallScore * 3.6);
  return (
    <section className="border-y border-white/40 bg-black py-7 text-white sm:py-9">
      <div className="grid gap-7 md:grid-cols-[180px_1fr] md:items-center">
        <div
          className="relative mx-auto grid size-40 place-items-center rounded-full"
          style={{
            background: `conic-gradient(#41c969 ${angle}deg, rgba(255,255,255,.12) 0deg)`,
          }}
        >
          <div className="grid size-[132px] place-items-center rounded-full bg-black text-center">
            <div>
              <span className="block text-5xl font-semibold tracking-[-0.06em] tabular-nums">
                {evaluation.overallScore}
              </span>
              <span className="text-sm text-zinc-500">out of 100</span>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#41c969]">
              Strategic leverage
            </p>
            <span className="rounded-md border border-white/40 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider">
              {evaluation.recommendation}
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-3xl">
            {evaluation.verdict}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
            {evaluation.summary}
          </p>
        </div>
      </div>
    </section>
  );
}
