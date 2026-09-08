import { ProfileEditor } from '@/components/profile/ProfileEditor';

export default function ProfilePage() {
  return <main className="min-h-[calc(100vh-64px)] bg-[#f5f7f8] px-4 py-10 sm:px-6"><div className="mx-auto max-w-[1100px]"><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#62851f]">Student context</p><h1 className="mt-2 text-4xl font-black tracking-[-0.045em] text-[#111d2c]">The evidence you already have.</h1><p className="mb-8 mt-3 max-w-2xl text-lg leading-7 text-slate-600">Every decision changes when this context changes. Edit it, then evaluate the same idea again.</p><ProfileEditor /></div></main>;
}
