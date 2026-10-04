import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
export function PolicyPage({ title, children }: { title: string; children: React.ReactNode }) {
  return <main className="min-h-screen bg-[#f7f4eb] text-[#173a29] px-5 py-12"><div className="max-w-3xl mx-auto"><Link href="/" className="inline-flex items-center gap-2 text-sm font-bold mb-10"><ArrowLeft size={17} />Back to AI Creator Kit</Link><p className="text-xs font-bold uppercase tracking-widest mb-3">AI Creator Kit</p><h1 className="font-serif text-4xl font-bold mb-8">{title}</h1><div className="space-y-7 text-sm leading-7 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:mb-2 [&_a]:underline">{children}</div></div></main>;
}
