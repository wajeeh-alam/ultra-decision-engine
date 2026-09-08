'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Clock3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { seededProposals } from '@/data/demo-opportunities';
import { saveDecision } from '@/lib/storage/decisions';
import { LoadingAnalysis } from '@/components/shared/LoadingAnalysis';
import { requestEvaluation } from '@/lib/client/evaluate';

export function DecisionInput() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [hours, setHours] = useState(10);
  const [weeks, setWeeks] = useState(12);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function analyze() {
    if (title.trim().length < 3) {
      setError('Describe the activity you want to evaluate.');
      return;
    }
    setLoading(true);
    setError('');
    const started = Date.now();
    try {
      const evaluation = await requestEvaluation(title.trim(), hours, weeks);
      await new Promise((resolve) =>
        setTimeout(resolve, Math.max(0, 1650 - (Date.now() - started))),
      );
      saveDecision(evaluation);
      router.push(`/decision/${evaluation.id}`);
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : 'We could not analyze that idea. Please try again.',
      );
      setLoading(false);
    }
  }

  useEffect(() => {
    type ToolContext = {
      registerTool?: (
        tool: Record<string, unknown>,
        options?: { signal?: AbortSignal },
      ) => void | Promise<void>;
    };
    const context = (document as Document & { modelContext?: ToolContext })
      .modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    void Promise.resolve(
      context.registerTool(
        {
          name: 'evaluate_activity',
          title: 'Evaluate activity',
          description:
            'Evaluate the strategic leverage and marginal profile value of a proposed student activity, save it to decision history, and open the result.',
          inputSchema: {
            type: 'object',
            properties: {
              title: { type: 'string', minLength: 3 },
              hoursPerWeek: { type: 'number', minimum: 1, maximum: 80 },
              durationWeeks: { type: 'number', minimum: 1, maximum: 260 },
            },
            required: ['title'],
            additionalProperties: false,
          },
          annotations: { readOnlyHint: false, untrustedContentHint: false },
          async execute(input: unknown) {
            const value = input as {
              title?: string;
              hoursPerWeek?: number;
              durationWeeks?: number;
            };
            if (!value.title || value.title.trim().length < 3)
              throw new Error('title must be at least 3 characters');
            const evaluation = await requestEvaluation(
              value.title.trim(),
              value.hoursPerWeek ?? 10,
              value.durationWeeks ?? 12,
            );
            saveDecision(evaluation);
            router.push(`/decision/${evaluation.id}`);
            return {
              id: evaluation.id,
              score: evaluation.overallScore,
              recommendation: evaluation.recommendation,
            };
          },
        },
        { signal: lifecycle.signal },
      ),
    ).catch(() => undefined);
    return () => lifecycle.abort();
  }, [router]);

  return (
    <section className="overflow-hidden rounded-2xl border border-white/60 bg-black">
      <div className="border-b border-white/25 p-5 sm:p-7">
        <div className="mb-4 text-lg font-semibold text-white">
          What are you thinking about doing?
        </div>
        <Textarea
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="e.g. Spend 3 months building another SaaS app…"
          className="min-h-36 resize-none rounded-xl border-white/30 bg-[#0b0b0b] p-4 text-base text-white shadow-none placeholder:text-zinc-600 focus-visible:border-[#35c9f2] focus-visible:ring-1 focus-visible:ring-[#35c9f2]"
          aria-label="Activity idea"
        />
        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
          <label
            htmlFor="hours-per-week"
            className="flex items-center gap-3 rounded-xl border border-white/25 px-3 py-2 text-sm text-zinc-400"
          >
            <Clock3 className="size-4" />
            <span className="whitespace-nowrap">Hours / week</span>
            <Input
              id="hours-per-week"
              type="number"
              min={1}
              max={80}
              value={hours}
              onChange={(event) => setHours(Number(event.target.value))}
              className="ml-auto h-8 w-16 border-0 bg-transparent text-right font-semibold text-white shadow-none"
            />
          </label>
          <label
            htmlFor="duration-weeks"
            className="flex items-center gap-3 rounded-xl border border-white/25 px-3 py-2 text-sm text-zinc-400"
          >
            <span className="whitespace-nowrap">Duration</span>
            <Input
              id="duration-weeks"
              type="number"
              min={1}
              max={260}
              value={weeks}
              onChange={(event) => setWeeks(Number(event.target.value))}
              className="ml-auto h-8 w-16 border-0 bg-transparent text-right font-semibold text-white shadow-none"
            />
            <span>weeks</span>
          </label>
          <Button
            onClick={analyze}
            disabled={loading}
            className="h-12 rounded-xl bg-white px-6 font-semibold text-black hover:bg-zinc-200"
          >
            Analyze <ArrowRight className="size-4" />
          </Button>
        </div>
        {error && (
          <p className="mt-3 text-sm font-medium text-red-600">{error}</p>
        )}
      </div>
      {loading ? (
        <div className="p-5 sm:p-7">
          <LoadingAnalysis />
        </div>
      ) : (
        <div className="p-5 sm:p-7">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
            Try an example
          </p>
          <div className="flex flex-wrap gap-2">
            {seededProposals.map((proposal) => (
              <button
                key={proposal}
                onClick={() => setTitle(proposal)}
                className="rounded-lg border border-white/25 bg-black px-3 py-2 text-left text-sm text-zinc-400 transition hover:border-white hover:text-white"
              >
                {proposal.replace(/[.]$/, '')}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
