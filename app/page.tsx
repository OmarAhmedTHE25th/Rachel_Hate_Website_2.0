"use client";

import { useState, useEffect } from "react";

export default function Home() {
    const [sinCount, setSinCount] = useState(0);
    const [latestSin, setLatestSin] = useState<string | null>(null);
    const [progress, setProgress] = useState({ part: 1, episode: 1, chapter: 79 });
    const [glitching, setGlitching] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const [sinsRes, progressRes] = await Promise.all([
                fetch("/api/sins"),
                fetch("/api/progress"),
            ]);
            const sins = await sinsRes.json();
            const progData = await progressRes.json();
            setSinCount(sins.count ?? 0);
            setLatestSin(sins.latest ?? null);
            if (progData && Array.isArray(progData) && progData.length > 0) {
                const latestProg = progData[0];
                setProgress({ 
                    part: latestProg.part ?? 1, 
                    episode: latestProg.episode ?? 1,
                    chapter: latestProg.chapter ?? null
                });
            }
        } catch {}
    }

    async function incrementSin() {
        setSinCount(prev => prev + 1); // optimistic
        setGlitching(true);
        setTimeout(() => setGlitching(false), 600);
        await fetch("/api/sins/quick", { method: "POST" });
        fetchData(); // sync with real DB after
    }

    async function decrementSin() {
        setSinCount(prev => Math.max(0, prev - 1)); // optimistic, floor at 0
        await fetch("/api/sins/quick", { method: "DELETE" });
        fetchData();
    }

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden" style={{ fontFamily: "'Georgia', serif" }}>
            {/* Noise overlay */}
            <div className="fixed inset-0 pointer-events-none z-50" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
                opacity: 0.4
            }} />

            {/* Header */}
            <header className="border-b border-[#2a0a0a] px-8 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                    <span className="text-xs tracking-[0.3em] text-red-400 uppercase">Tower of God — Field Archive</span>
                </div>
                <nav className="flex gap-8 text-xs tracking-widest text-zinc-500 uppercase">
                    <a href="/tracker" className="hover:text-red-400 transition-colors">Tracker</a>
                    <a href="/sins" className="hover:text-red-400 transition-colors">Sin Archive</a>
                    <a href="/rachel" className="hover:text-red-400 transition-colors">The Rachel File</a>
                </nav>
            </header>

            {/* Hero */}
            <section className="relative px-8 pt-24 pb-16 max-w-6xl mx-auto">
                {/* Background text */}
                <div className="absolute top-8 left-0 right-0 flex justify-center pointer-events-none select-none">
                    <span className="text-[12vw] font-black text-[#1a0505] leading-none tracking-tighter">RACHEL</span>
                </div>

                <div className="relative z-10">
                    <p className="text-xs tracking-[0.4em] text-red-700 uppercase mb-4">Document Classification: Ongoing</p>
                    <h1 className="text-5xl font-black leading-tight mb-2" style={{ fontFamily: "'Georgia', serif" }}>
                        The Tower of God<br />
                        <span className="text-red-600">Companion Archive</span>
                    </h1>
                    <p className="text-zinc-500 text-sm max-w-md mt-4 leading-relaxed">
                        A personal record of sins committed, floors climbed, and betrayals endured.
                        All evidence meticulously documented. All crimes remembered.
                    </p>
                </div>
            </section>

            {/* Main grid */}
            <section className="px-8 max-w-6xl mx-auto grid grid-cols-12 gap-4 pb-24">

                {/* Sin Counter — big feature */}
                <div className="col-span-5 border border-red-900 bg-[#0d0404] p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-900 rounded-full blur-3xl opacity-20 pointer-events-none" />
                    <p className="text-xs tracking-[0.3em] text-red-700 uppercase mb-2">Rachel Sin Counter</p>
                    <div
                        className={`text-8xl font-black text-red-500 leading-none my-4 transition-all duration-100 ${glitching ? "translate-x-1 opacity-70 scale-105" : ""}`}
                        style={{ fontFamily: "monospace", textShadow: "0 0 40px rgba(239,68,68,0.4)" }}
                    >
                        {String(sinCount).padStart(3, "0")}
                    </div>
                    <p className="text-zinc-600 text-xs mb-6">confirmed acts of treachery</p>

                    {latestSin && (
                        <div className="border-l-2 border-red-800 pl-3 mb-6">
                            <p className="text-xs text-zinc-500 mb-1">Latest sin on record:</p>
                            <p className="text-sm text-zinc-300 italic">"{latestSin}"</p>
                        </div>
                    )}

                    <button
                        onClick={incrementSin}
                        className="w-full border border-red-800 text-red-400 text-xs tracking-widest uppercase py-3 hover:bg-red-900 hover:text-red-200 transition-all duration-200 active:scale-95"
                    >
                        + Record New Sin
                    </button>
                    <button
                        onClick={decrementSin}
                        className="w-full text-zinc-700 text-[10px] tracking-widest uppercase py-1 hover:text-zinc-500 transition-all duration-200 mt-1 opacity-50 hover:opacity-100"
                    >
                        − mistake. probably.
                    </button>
                </div>

                {/* Right column */}
                <div className="col-span-7 flex flex-col gap-4">

                    {/* Progress tracker */}
                    <div className="border border-zinc-800 bg-[#0d0d0d] p-6">
                        <p className="text-xs tracking-[0.3em] text-zinc-500 uppercase mb-4">Current Progress</p>
                        <div className="flex gap-8">
                            <div>
                                <p className="text-4xl font-black text-white">{progress.part}</p>
                                <p className="text-[10px] text-zinc-600 mt-1 tracking-wider uppercase">PART</p>
                            </div>
                            <div className="w-px bg-zinc-800" />
                            <div>
                                <p className="text-4xl font-black text-white">{progress.episode ?? "—"}</p>
                                <p className="text-[10px] text-zinc-600 mt-1 tracking-wider uppercase">EPISODE (ANIME)</p>
                            </div>
                            <div className="w-px bg-zinc-800" />
                            <div>
                                <p className="text-4xl font-black text-white">{progress.chapter ?? "—"}</p>
                                <p className="text-[10px] text-zinc-600 mt-1 tracking-wider uppercase">CHAPTER (MANHWA)</p>
                            </div>
                            <div className="ml-auto flex items-end">
                                <a href="/tracker" className="text-xs text-red-600 hover:text-red-400 tracking-wider uppercase transition-colors">
                                    Update →
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Rachel File teaser */}
                    <div className="border border-zinc-800 bg-[#0d0d0d] p-6 flex-1 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-linear-to-br from-red-950/20 to-transparent pointer-events-none" />
                        <p className="text-xs tracking-[0.3em] text-zinc-500 uppercase mb-2">Classified File</p>
                        <h2 className="text-2xl font-black text-red-500 mb-2">The Rachel Dossier</h2>
                        <p className="text-zinc-500 text-sm leading-relaxed mb-4">
                            A comprehensive indictment. Evidence gathered. Witnesses interviewed.
                            Verdict already decided.
                        </p>
                        <div className="flex gap-4 text-xs text-zinc-600">
                            <span>◆ Character Profile</span>
                            <span>◆ Ugliness Assessment</span>
                            <span>◆ Crime Log</span>
                        </div>
                        <a href="/rachel" className="absolute bottom-4 right-6 text-xs text-red-700 group-hover:text-red-400 tracking-wider uppercase transition-colors">
                            Open File →
                        </a>
                    </div>

                    {/* Quote */}
                    <div className="border border-zinc-800 bg-[#0d0d0d] p-6">
                        <p className="text-zinc-400 text-sm italic leading-relaxed">
                            "She acts like a friend. And when you're not looking... She stabs you in the back."
                        </p>
                        <p className="text-zinc-700 text-xs mt-2 tracking-wider">— Field Observer Notes</p>
                    </div>
                </div>

                {/* Bottom strip */}
                <div className="col-span-12 border border-zinc-800 bg-[#0d0d0d] p-4 flex justify-between items-center">
                    <div className="flex gap-8 text-xs text-zinc-600">
                        <span>Tower of God — SIU</span>
                        <span className="text-zinc-800">|</span>
                        <span>Archive initialized by OmarAhmedTHE25th</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
                        <span className="text-xs text-zinc-600">DB Connected</span>
                    </div>
                </div>
            </section>
        </main>
    );
}