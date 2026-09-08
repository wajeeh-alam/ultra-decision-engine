'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScoreBadge } from '@/components/shared/ScoreBadge';
import { requestEvaluation } from '@/lib/client/evaluate';
import { saveDecision } from '@/lib/storage/decisions';
import type { ActivityEvaluation } from '@/schemas/evaluation';

export function AlternativeCard({
  alternative,
  rank,
}: {
  alternative: ActivityEvaluation['betterVersions'][number];
  rank: number;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function evaluate() {
    setLoading(true);
    try {
      const item = await requestEvaluation(alternative.title);
      saveDecision(item);
      router.push(`/decision/${item.id}`);
    } finally {
      setLoading(false);
    }
  }
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
      <Button
        onClick={evaluate}
        disabled={loading}
        variant="outline"
        className="mt-5 rounded-lg border-white/60 bg-transparent font-medium text-white hover:bg-white hover:text-black"
      >
        {loading ? 'Evaluating…' : 'Evaluate this instead'}{' '}
        <ArrowUpRight className="size-4" />
      </Button>
    </article>
  );
}
