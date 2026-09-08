import { Lightbulb, Route } from 'lucide-react';
import type { ActivityEvaluation } from '@/schemas/evaluation';

export function EvaluationSummary({
  evaluation,
}: {
  evaluation: ActivityEvaluation;
}) {
  return (
    <section className="grid gap-px overflow-hidden rounded-xl border border-white/35 bg-white/35 md:grid-cols-2">
      <div className="bg-black p-6 text-white">
        <Lightbulb className="size-5 text-[#35c9f2]" />
        <h2 className="mt-4 font-semibold">Why this score</h2>
        <ol className="mt-3 divide-y divide-white/15">
          {evaluation.reasoning.map((item, index) => (
            <li
              key={item}
              className="flex gap-3 py-3 text-sm leading-6 text-zinc-400"
            >
              <span className="font-medium text-zinc-600">0{index + 1}</span>
              {item}
            </li>
          ))}
        </ol>
      </div>
      <div className="bg-black p-6 text-white">
        <Route className="size-5 text-[#41c969]" />
        <h2 className="mt-4 font-semibold">Three next moves</h2>
        <ol className="mt-3 divide-y divide-white/15">
          {evaluation.nextSteps.map((item, index) => (
            <li
              key={item}
              className="flex gap-3 py-3 text-sm leading-6 text-zinc-400"
            >
              <span className="shrink-0 font-medium text-[#41c969]">
                0{index + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
