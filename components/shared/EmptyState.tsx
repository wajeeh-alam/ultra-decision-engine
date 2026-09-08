import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function EmptyState({ title, body }: { title: string; body: string }) {
  return <div className="rounded-[24px] border border-dashed border-slate-300 bg-white p-10 text-center"><h2 className="text-xl font-black tracking-tight text-[#111d2c]">{title}</h2><p className="mx-auto mt-2 max-w-md text-slate-500">{body}</p><Link href="/" className="mt-6 inline-flex h-10 items-center gap-2 rounded-xl bg-[#111d2c] px-4 text-sm font-bold text-white hover:bg-[#203148]">Evaluate an idea <ArrowRight className="size-4" /></Link></div>;
}
