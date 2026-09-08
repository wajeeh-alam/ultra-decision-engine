'use client';
/* oxlint-disable react/react-compiler */

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/shared/EmptyState';
import { ScoreBadge } from '@/components/shared/ScoreBadge';
import { clearDecisions, getDecisions } from '@/lib/storage/decisions';
import type { ActivityEvaluation } from '@/schemas/evaluation';

export default function HistoryPage() {
  const [items, setItems] = useState<ActivityEvaluation[]>([]);
  useEffect(() => setItems(getDecisions()), []);
  return (
    <main className="min-h-[calc(100vh-72px)] bg-black px-4 py-10 text-white sm:px-6">
      <div className="mx-auto max-w-[980px]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-600">
              My decisions
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em]">
              Your decision trail.
            </h1>
            <p className="mt-3 text-lg text-zinc-400">
              Revisit what you considered and how the tradeoffs changed.
            </p>
          </div>
          {items.length > 0 && (
            <Button
              variant="outline"
              onClick={() => {
                clearDecisions();
                setItems([]);
              }}
              className="rounded-lg border-white/40 bg-transparent text-zinc-400 hover:bg-white hover:text-black"
            >
              <Trash2 className="size-4" /> Clear history
            </Button>
          )}
        </div>
        {items.length === 0 ? (
          <EmptyState
            title="No decisions yet"
            body="Your analyzed activities will be saved here on this device."
          />
        ) : (
          <div className="divide-y divide-white/25 border-y border-white/35">
            {items.map((item) => (
              <Link
                key={item.id}
                href={`/decision/${item.id}`}
                className="group grid gap-4 py-5 transition hover:bg-white/5 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:px-4"
              >
                <ScoreBadge score={item.overallScore} />
                <div>
                  <h2 className="text-lg font-semibold leading-snug tracking-tight">
                    {item.proposal.title}
                  </h2>
                  <span className="mt-1 block text-sm text-zinc-600">
                    {new Date(item.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                    {item.recommendation}
                  </span>
                  <ArrowUpRight className="size-5 text-zinc-600 transition group-hover:text-white" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
