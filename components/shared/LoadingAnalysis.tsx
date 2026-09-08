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
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % messages.length), 380);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <output className="flex items-center gap-3 text-sm font-medium text-slate-600">
      <span className="relative size-5 rounded-full border-2 border-slate-200 border-t-[#111d2c] motion-safe:animate-spin" />
      <span>{messages[index]}</span>
    </output>
  );
}
