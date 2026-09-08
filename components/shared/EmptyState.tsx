import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-dashed border-white/35 bg-black p-10 text-center">
      <h2 className="text-xl font-semibold tracking-tight text-white">
        {title}
      </h2>
      <p className="mx-auto mt-2 max-w-md text-zinc-500">{body}</p>
      <Link
        href="/"
        className="mt-6 inline-flex h-10 items-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-black hover:bg-zinc-200"
      >
        Evaluate an idea <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}
