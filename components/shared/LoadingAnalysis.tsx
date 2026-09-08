'use client';

import { useEffect, useState } from 'react';

const messages = [
  'Comparing against your existing profile…',
  'Looking for redundant evidence…',
  'Evaluating skill growth…',
  'Estimating opportunity cost…',
  'Finding higher-leverage alternatives…',
];

export function LoadingAnalysis() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(
      () => setIndex((value) => (value + 1) % messages.length),
      380,
    );
    return () => window.clearInterval(timer);
  }, []);
  return (
    <output className="flex items-center gap-3 text-sm font-medium text-zinc-400">
      <span className="relative size-5 rounded-full border-2 border-white/20 border-t-[#35c9f2] motion-safe:animate-spin" />
      <span>{messages[index]}</span>
    </output>
  );
}
