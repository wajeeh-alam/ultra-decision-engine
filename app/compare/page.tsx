'use client';
/* oxlint-disable react/react-compiler */

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Crown } from 'lucide-react';
import { EmptyState } from '@/components/shared/EmptyState';
import { ScoreBadge } from '@/components/shared/ScoreBadge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { rankEvaluations } from '@/lib/decision-engine/compare';
import { getDecisions } from '@/lib/storage/decisions';
import type { ActivityEvaluation } from '@/schemas/evaluation';

export default function ComparePage() {
  const [items, setItems] = useState<ActivityEvaluation[]>([]);
  useEffect(() => setItems(rankEvaluations(getDecisions())), []);
  return (
    <main className="min-h-[calc(100vh-72px)] bg-black px-4 py-10 text-white sm:px-6">
      <div className="mx-auto max-w-[1180px]">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-600">
          Decision portfolio
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em]">
          Compare your best bets.
        </h1>
        <p className="mb-8 mt-3 max-w-2xl text-lg text-zinc-400">
          Ranked by strategic leverage. Up to five recent decisions are shown.
        </p>
        {items.length === 0 ? (
          <EmptyState
            title="Nothing to compare yet"
            body="Analyze two or more activities to see which one adds the most new value."
          />
        ) : (
          <div className="overflow-hidden rounded-xl border border-white/35 bg-black">
            <Table>
              <TableHeader>
                <TableRow className="border-white/30 bg-[#0a0a0a] hover:bg-[#0a0a0a]">
                  <TableHead className="min-w-64 text-zinc-500">
                    Decision
                  </TableHead>
                  <TableHead className="text-zinc-500">Leverage</TableHead>
                  <TableHead className="text-zinc-500">
                    Marginal value
                  </TableHead>
                  <TableHead className="text-zinc-500">Time required</TableHead>
                  <TableHead className="min-w-56 text-zinc-500">
                    Key new evidence
                  </TableHead>
                  <TableHead className="text-zinc-500">
                    Recommendation
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow
                    key={item.id}
                    className={`border-white/20 hover:bg-white/5 ${index === 0 ? 'bg-[#41c969]/5' : ''}`}
                  >
                    <TableCell>
                      <Link
                        href={`/decision/${item.id}`}
                        className="group font-medium text-white"
                      >
                        {index === 0 && (
                          <Crown className="mr-2 inline size-4 text-[#41c969]" />
                        )}
                        {item.proposal.title}
                        <ArrowUpRight className="ml-2 inline size-3.5 opacity-0 transition group-hover:opacity-100" />
                      </Link>
                    </TableCell>
                    <TableCell>
                      <ScoreBadge score={item.overallScore} />
                    </TableCell>
                    <TableCell className="font-semibold tabular-nums">
                      {item.scores.marginalProfileValue}
                    </TableCell>
                    <TableCell className="text-zinc-500">
                      {item.proposal.estimatedHoursPerWeek ?? 10}h/wk ·{' '}
                      {item.proposal.durationWeeks ?? 12} wk
                    </TableCell>
                    <TableCell className="text-sm text-zinc-500">
                      {item.missingDimensionsAddressed
                        .slice(0, 2)
                        .join(' · ') || 'Limited new evidence'}
                    </TableCell>
                    <TableCell>
                      <span className="rounded-md border border-white/30 px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-zinc-300">
                        {item.recommendation}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </main>
  );
}
