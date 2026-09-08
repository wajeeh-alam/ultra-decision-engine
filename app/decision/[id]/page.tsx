'use client';
/* oxlint-disable react/react-compiler */

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AlternativeCard } from '@/components/decision/AlternativeCard';
import { DecisionScore } from '@/components/decision/DecisionScore';
import { ProfileOverlapCard } from '@/components/decision/ProfileOverlapCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { getDecision } from '@/lib/storage/decisions';
import type { ActivityEvaluation } from '@/schemas/evaluation';

export default function DecisionPage() {
  const { id } = useParams<{ id: string }>();
  const [evaluation, setEvaluation] = useState<ActivityEvaluation>();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setEvaluation(getDecision(id));
    setReady(true);
  }, [id]);
  if (!ready) return <main className="min-h-screen bg-black p-8" />;
  if (!evaluation)
    return (
      <main className="min-h-[calc(100vh-72px)] bg-black px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <EmptyState
            title="Decision not found"
            body="This evaluation may have been cleared from this browser."
          />
        </div>
      </main>
    );
  return (
    <main className="min-h-[calc(100vh-72px)] bg-black px-4 py-8 text-white sm:px-6 sm:py-12">
      <div className="mx-auto max-w-[1050px]">
        <div className="mb-7">
          <div>
            <Link
              href="/"
              className="mb-3 inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white"
            >
              <ArrowLeft className="size-4" /> New decision
            </Link>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-600">
              02 / The proposed bet
            </p>
            <h1 className="mt-1 max-w-3xl text-2xl font-semibold tracking-[-0.03em]">
              {evaluation.proposal.title}
            </h1>
          </div>
        </div>
        <div className="space-y-8">
          <DecisionScore evaluation={evaluation} />
          <ProfileOverlapCard overlap={evaluation.profileOverlap} />
          <section>
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#41c969]">
                  06 / Higher-leverage alternatives
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">
                  Fill a gap instead.
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-zinc-500">
                Same ambition. More new evidence per hour invested.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {evaluation.betterVersions.map((item, index) => (
                <AlternativeCard
                  key={item.id}
                  alternative={item}
                  rank={index}
                />
              ))}
            </div>
          </section>
          <div className="flex justify-center border-t border-white/25 pt-7">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-zinc-200"
            >
              Evaluate another decision <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
