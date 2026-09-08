import { cn } from '@/lib/utils';

export function ScoreBadge({ score, className }: { score: number; className?: string }) {
  const tone = score >= 80 ? 'bg-[#eaffc1] text-[#385207]' : score >= 60 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800';
  return <span className={cn('inline-flex min-w-12 items-center justify-center rounded-full px-2.5 py-1 text-sm font-black tabular-nums', tone, className)}>{score}</span>;
}
