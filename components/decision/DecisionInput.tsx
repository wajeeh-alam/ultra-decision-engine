'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Clock3, Sparkles } from 'lucide-react';
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
      await new Promise((resolve) => setTimeout(resolve, Math.max(0, 1650 - (Date.now() - started))));
      saveDecision(evaluation);
      router.push(`/decision/${evaluation.id}`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'We could not analyze that idea. Please try again.');
      setLoading(false);
    }
  }

  useEffect(() => {
    type ToolContext = { registerTool?: (tool: Record<string, unknown>, options?: { signal?: AbortSignal }) => void | Promise<void> };
    const context = (document as Document & { modelContext?: ToolContext }).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    void Promise.resolve(context.registerTool({
      name: 'evaluate_activity',
      title: 'Evaluate activity',
      description: 'Evaluate the strategic leverage and marginal profile value of a proposed student activity, save it to decision history, and open the result.',
      inputSchema: { type: 'object', properties: { title: { type: 'string', minLength: 3 }, hoursPerWeek: { type: 'number', minimum: 1, maximum: 80 }, durationWeeks: { type: 'number', minimum: 1, maximum: 260 } }, required: ['title'], additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      async execute(input: unknown) {
        const value = input as { title?: string; hoursPerWeek?: number; durationWeeks?: number };
        if (!value.title || value.title.trim().length < 3) throw new Error('title must be at least 3 characters');
        const evaluation = await requestEvaluation(value.title.trim(), value.hoursPerWeek ?? 10, value.durationWeeks ?? 12);
        saveDecision(evaluation);
        router.push(`/decision/${evaluation.id}`);
        return { id: evaluation.id, score: evaluation.overallScore, recommendation: evaluation.recommendation };
      },
    }, { signal: lifecycle.signal })).catch(() => undefined);
    return () => lifecycle.abort();
  }, [router]);

  return (
    <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,29,45,0.10)]">
      <div className="border-b border-slate-100 p-5 sm:p-7">
        <div className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-950"><Sparkles className="size-4 text-[#6a8f16]" /> What are you thinking about doing?</div>
        <Textarea value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Spend 3 months building another SaaS app…" className="min-h-32 resize-none border-0 bg-slate-50 p-4 text-base shadow-none focus-visible:ring-2 focus-visible:ring-[#b7eb51]" aria-label="Activity idea" />
        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
          <label htmlFor="hours-per-week" className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-500"><Clock3 className="size-4" /><span className="whitespace-nowrap">Hours / week</span><Input id="hours-per-week" type="number" min={1} max={80} value={hours} onChange={(event) => setHours(Number(event.target.value))} className="ml-auto h-8 w-16 border-0 bg-slate-50 text-right font-bold shadow-none" /></label>
          <label htmlFor="duration-weeks" className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-500"><span className="whitespace-nowrap">Duration</span><Input id="duration-weeks" type="number" min={1} max={260} value={weeks} onChange={(event) => setWeeks(Number(event.target.value))} className="ml-auto h-8 w-16 border-0 bg-slate-50 text-right font-bold shadow-none" /><span>weeks</span></label>
          <Button onClick={analyze} disabled={loading} className="h-12 rounded-xl bg-[#111d2c] px-6 font-bold text-white hover:bg-[#203148]">Analyze <ArrowRight className="size-4" /></Button>
        </div>
        {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}
      </div>
      {loading ? <div className="p-5 sm:p-7"><LoadingAnalysis /></div> : (
        <div className="p-5 sm:p-7">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Try an example</p>
          <div className="flex flex-wrap gap-2">
            {seededProposals.map((proposal) => <button key={proposal} onClick={() => setTitle(proposal)} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-left text-sm font-medium text-slate-600 transition hover:-translate-y-0.5 hover:border-slate-400 hover:text-slate-950">{proposal.replace(/[.]$/, '')}</button>)}
          </div>
        </div>
      )}
    </section>
  );
}
