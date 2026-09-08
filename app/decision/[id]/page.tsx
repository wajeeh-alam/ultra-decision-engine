'use client';
/* oxlint-disable react/react-compiler */

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Database, Plus, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AlternativeCard } from '@/components/decision/AlternativeCard';
import { DecisionScore } from '@/components/decision/DecisionScore';
import { DimensionScores } from '@/components/decision/DimensionScores';
import { EvaluationSummary } from '@/components/decision/EvaluationSummary';
import { OpportunityCostCard } from '@/components/decision/OpportunityCostCard';
import { ProfileOverlapCard } from '@/components/decision/ProfileOverlapCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { ScoreBadge } from '@/components/shared/ScoreBadge';
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
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link
              href="/"
              className="mb-3 inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white"
            >
              <ArrowLeft className="size-4" /> New decision
            </Link>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-600">
              Evaluation
            </p>
            <h1 className="mt-1 max-w-3xl text-2xl font-semibold tracking-[-0.03em]">
              {evaluation.proposal.title}
            </h1>
          </div>
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 rounded-lg border border-white/60 px-4 py-2.5 text-sm font-medium text-white hover:bg-white hover:text-black"
          >
            <Plus className="size-4" /> Compare decisions
          </Link>
        </div>
        <div className="space-y-7">
          <DecisionScore evaluation={evaluation} />
          <DimensionScores scores={evaluation.scores} />
          <div className="grid gap-5 md:grid-cols-[1.35fr_.65fr]">
            <ProfileOverlapCard overlap={evaluation.profileOverlap} />
            <div className="rounded-xl border border-[#41c969] bg-black p-6">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#41c969]">
                Marginal profile value
              </p>
              <p className="mt-2 text-5xl font-semibold tracking-[-0.06em]">
                {evaluation.scores.marginalProfileValue}
                <span className="text-lg text-zinc-600"> / 100</span>
              </p>
              <p className="mt-4 text-sm leading-6 text-zinc-400">
                How much new evidence this adds beyond what you’ve already
                demonstrated.
              </p>
            </div>
          </div>
          <OpportunityCostCard cost={evaluation.opportunityCost} />
          <section>
            <div className="mb-4 flex items-center gap-3">
              <Sparkles className="size-5 text-[#41c969]" />
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-600">
                  Higher leverage
                </p>
                <h2 className="text-2xl font-semibold tracking-[-0.03em]">
                  Make this idea 2× better
                </h2>
              </div>
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
          <section className="rounded-xl border border-white/35 bg-black p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Database className="size-5 text-[#35c9f2]" />
                <h2 className="text-xl font-semibold tracking-tight">
                  Better opportunities for this goal
                </h2>
              </div>
              <span className="text-xs text-zinc-600">
                DEMO OPPORTUNITY DATA
              </span>
            </div>
            <div className="mt-5 divide-y divide-white/20 border-t border-white/20">
              {evaluation.alternativeOpportunities.map((item) => (
                <div
                  key={item.opportunityId}
                  className="grid gap-3 py-4 sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-zinc-500">
                      {item.whyBetter}
                    </p>
                  </div>
                  <ScoreBadge score={item.estimatedScore} />
                </div>
              ))}
            </div>
          </section>
          <EvaluationSummary evaluation={evaluation} />
        </div>
      </div>
    </main>
  );
}
