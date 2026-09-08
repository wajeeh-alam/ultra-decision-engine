import { ScoreBadge } from '@/components/shared/ScoreBadge';
import type { ActivityEvaluation } from '@/schemas/evaluation';

export function AlternativeCard({
  alternative,
  rank,
}: {
  alternative: ActivityEvaluation['betterVersions'][number];
  rank: number;
}) {
  return (
    <article
      className={`flex h-full flex-col rounded-xl border bg-black p-5 text-white ${rank === 1 ? 'border-[#41c969]' : 'border-white/35'}`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`text-xs font-medium uppercase tracking-[0.16em] ${rank === 1 ? 'text-[#41c969]' : 'text-zinc-500'}`}
        >
          {rank === 0 ? 'Better' : rank === 1 ? 'Best fit' : 'Alternative'}
        </span>
        <ScoreBadge score={alternative.estimatedScore} />
      </div>
      <h3 className="mt-5 text-lg font-semibold leading-snug tracking-tight">
        {alternative.title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-zinc-400">
        {alternative.whyBetter}
      </p>
      <div className="mt-4 divide-y divide-white/15 border-y border-white/20">
        {alternative.newDimensionsAdded.map((item) => (
          <span key={item} className="block py-2 text-xs text-zinc-500">
            + {item}
          </span>
        ))}
      </div>
      <p className="mt-auto pt-5 text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
        Adds {alternative.newDimensionsAdded.length} new evidence dimensions
      </p>
    </article>
  );
}
