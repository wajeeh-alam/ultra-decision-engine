import { cn } from '@/lib/utils';

export function ScoreBadge({
  score,
  className,
}: {
  score: number;
  className?: string;
}) {
  const tone =
    score >= 80
      ? 'border-[#41c969] text-[#41c969]'
      : score >= 60
        ? 'border-amber-400 text-amber-400'
        : 'border-red-500 text-red-400';
  return (
    <span
      className={cn(
        'inline-flex min-w-12 items-center justify-center rounded-md border px-2.5 py-1 text-sm font-semibold tabular-nums',
        tone,
        className,
      )}
    >
      {score}
    </span>
  );
}
