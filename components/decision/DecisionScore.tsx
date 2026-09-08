import type { ActivityEvaluation } from '@/schemas/evaluation';

export function DecisionScore({
  evaluation,
}: {
  evaluation: ActivityEvaluation;
}) {
  const marginal = evaluation.scores.marginalProfileValue;
  const overlap = evaluation.profileOverlap.score;
  return (
    <section className="border-y border-white/40 bg-black py-7 text-white sm:py-9">
      <div className="grid border border-white/30 md:grid-cols-3">
        <div className="border-b border-white/20 p-5 md:border-b-0 md:border-r">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
            03 / Sounds good
          </p>
          <div className="mt-5 flex items-end justify-between gap-4">
            <span className="text-lg font-semibold">Goal alignment</span>
            <span className="text-4xl font-semibold tabular-nums text-[#41c969]">
              {evaluation.scores.goalAlignment}
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-zinc-500">
            It fits your software, ML, and startup goals.
          </p>
        </div>
        <div className="border-b border-white/20 p-5 md:border-b-0 md:border-r">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
            04 / But already proven
          </p>
          <div className="mt-5 flex items-end justify-between gap-4">
            <span className="text-lg font-semibold">Profile overlap</span>
            <span className="text-4xl font-semibold tabular-nums text-amber-400">
              {overlap}
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-zinc-500">
            Most of the signal already exists in your profile.
          </p>
        </div>
        <div className="bg-white p-5 text-black">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
            05 / Net-new value
          </p>
          <div className="mt-5 flex items-end justify-between gap-4">
            <span className="text-lg font-semibold">Marginal value</span>
            <span className="text-4xl font-semibold tabular-nums">
              {marginal}
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Low return on your next twelve weeks.
          </p>
        </div>
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-[auto_1fr] sm:items-start">
        <span className="w-fit rounded-md border border-white/50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">
          {evaluation.recommendation}
        </span>
        <div>
          <h1 className="text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-3xl">
            {evaluation.verdict}
          </h1>
          <p className="mt-2 max-w-3xl text-base leading-7 text-zinc-400">
            {evaluation.summary}
          </p>
        </div>
      </div>
    </section>
  );
}
