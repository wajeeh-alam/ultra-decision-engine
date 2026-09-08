import { ArrowRight, Check } from 'lucide-react';
import type { ActivityEvaluation } from '@/schemas/evaluation';

export function ProfileOverlapCard({
  overlap,
}: {
  overlap: ActivityEvaluation['profileOverlap'];
}) {
  return (
    <section className="grid overflow-hidden rounded-xl border border-white/35 bg-black text-white md:grid-cols-2">
      <div className="p-6 md:border-r md:border-white/20">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-amber-400">
          Evidence already on the profile
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">
          This is repetition, not range.
        </h2>
        <p className="mt-3 leading-7 text-zinc-400">{overlap.explanation}</p>
        {overlap.overlappingEvidence.length > 0 && (
          <div className="mt-5 divide-y divide-white/15 border-y border-white/20">
            {overlap.overlappingEvidence.map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 py-2.5 text-sm text-zinc-300"
              >
                <Check className="size-3.5 text-[#41c969]" />
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="bg-[#080808] p-6">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#35c9f2]">
          What this bet leaves untouched
        </p>
        <div className="mt-5 space-y-4">
          {[
            'Open-source collaboration',
            'ML infrastructure depth',
            'Production codebase experience',
          ].map((gap) => (
            <div
              key={gap}
              className="flex items-center justify-between border-b border-white/15 pb-3 text-sm"
            >
              <span>{gap}</span>
              <ArrowRight className="size-4 text-zinc-600" />
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm leading-6 text-zinc-500">
          The best next move should convert one of these gaps into externally
          validated evidence.
        </p>
      </div>
    </section>
  );
}
