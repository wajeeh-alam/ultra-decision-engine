import { DecisionInput } from '@/components/decision/DecisionInput';
import { ProfileSnapshot } from '@/components/profile/ProfileSnapshot';

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-72px)] bg-black text-white">
      <div className="mx-auto grid max-w-[1180px] gap-0 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        <div>
          <div className="mb-8 max-w-3xl lg:pr-12">
            <p className="mb-3 text-sm font-medium text-zinc-500">
              Ultra / Decision engine
            </p>
            <h1 className="max-w-2xl text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-white sm:text-5xl">
              Make a better bet on what you do next.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-400">
              Measure what an activity adds to your trajectory—not how
              impressive it sounds.
            </p>
          </div>
          <div className="lg:pr-12">
            <DecisionInput />
          </div>
        </div>
        <ProfileSnapshot />
      </div>
    </main>
  );
}
