import { CircleCheck } from 'lucide-react';
import { DecisionInput } from '@/components/decision/DecisionInput';
import { ProfileSnapshot } from '@/components/profile/ProfileSnapshot';

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#f5f7f8]">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div>
          <div className="mb-8 max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d9edb1] bg-[#effbd8] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#49650e]"><CircleCheck className="size-3.5" /> Strategy, not prestige</div>
            <h1 className="max-w-2xl text-4xl font-black leading-[1.04] tracking-[-0.05em] text-[#111d2c] sm:text-6xl">Make better bets on your time.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">See how much an activity actually adds to your trajectory before spending weeks or months on it.</p>
          </div>
          <DecisionInput />
        </div>
        <ProfileSnapshot />
      </div>
    </main>
  );
}
