import { Check, CopyCheck } from 'lucide-react';
import type { ActivityEvaluation } from '@/schemas/evaluation';

export function ProfileOverlapCard({
  overlap,
}: {
  overlap: ActivityEvaluation['profileOverlap'];
}) {
  return (
    <section className="rounded-xl border border-white/35 bg-black p-6 text-white">
      <div className="flex items-start gap-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-red-500/15 text-red-400">
          <CopyCheck className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-red-400">
            Profile overlap · {overlap.score}/100
          </p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight">
            You’re already proving this.
          </h2>
          <p className="mt-3 leading-7 text-zinc-400">{overlap.explanation}</p>
          {overlap.overlappingEvidence.length > 0 && (
            <div className="mt-5 divide-y divide-white/15 border-y border-white/20">
              {overlap.overlappingEvidence.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-2 py-2.5 text-sm text-zinc-300"
                >
                  <Check className="size-3.5 text-red-400" />
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
