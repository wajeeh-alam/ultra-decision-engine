import { ProfileEditor } from '@/components/profile/ProfileEditor';

export default function ProfilePage() {
  return (
    <main className="min-h-[calc(100vh-72px)] bg-black px-4 py-10 text-white sm:px-6">
      <div className="mx-auto max-w-[1100px]">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-600">
          Student context
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em]">
          The evidence you already have.
        </h1>
        <p className="mb-8 mt-3 max-w-2xl text-lg leading-7 text-zinc-400">
          Every decision changes when this context changes. Edit it, then
          evaluate the same idea again.
        </p>
        <ProfileEditor />
      </div>
    </main>
  );
}
