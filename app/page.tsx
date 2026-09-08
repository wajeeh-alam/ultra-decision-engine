import { DecisionInput } from '@/components/decision/DecisionInput';
import { ProfileSnapshot } from '@/components/profile/ProfileSnapshot';

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-72px)] bg-black text-white">
      <div className="mx-auto max-w-[1180px] px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-7 border-b border-white/25 pb-7">
          <p className="mb-3 text-sm font-medium text-zinc-500">
            Ultra / Decision engine
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.06] tracking-[-0.045em] text-white sm:text-5xl">
            What will this add that you haven’t already proven?
          </h1>
        </div>
        <div className="grid gap-0 lg:grid-cols-[360px_minmax(0,1fr)]">
          <ProfileSnapshot />
          <div className="border-t border-white/30 pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
              02 / The next bet
            </p>
            <DecisionInput />
          </div>
        </div>
      </div>
    </main>
  );
}
