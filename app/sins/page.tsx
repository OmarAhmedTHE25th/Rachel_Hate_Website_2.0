"use client";

import { useState, useEffect } from "react";

interface Sin {
    id: number;
    title: string;
    description: string;
    episode: string | null;
    createdAt: string;
}

export default function SinsPage() {
    const [sins, setSins] = useState<Sin[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({ title: "", description: "", episode: "" });
    const [deletingId, setDeletingId] = useState<number | null>(null);

    useEffect(() => {
        fetchSins();
    }, []);

    async function fetchSins() {
        setLoading(true);
        const res = await fetch("/api/sins/all");
        const data = await res.json();
        setSins(data);
        setLoading(false);
    }

    async function addSin() {
        if (!form.title.trim() || !form.description.trim()) return;
        setSubmitting(true);
        const optimistic: Sin = {
            id: Date.now(),
            title: form.title,
            description: form.description,
            episode: form.episode || null,
            createdAt: new Date().toISOString(),
        };
        setSins(prev => [optimistic, ...prev]);
        setForm({ title: "", description: "", episode: "" });
        await fetch("/api/sins/all", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        setSubmitting(false);
        fetchSins();
    }

    async function deleteSin(id: number) {
        setDeletingId(id);
        setSins(prev => prev.filter(s => s.id !== id));
        await fetch(`/api/sins/${id}`, { method: "DELETE" });
        setDeletingId(null);
    }

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white" style={{ fontFamily: "'Georgia', serif" }}>
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
                    <a href="/" className="hover:text-red-400 transition-colors">Home</a>
                    <a href="/tracker" className="hover:text-red-400 transition-colors">Tracker</a>
                    <a href="/sins" className="text-red-400">Sin Archive</a>
                    <a href="/rachel" className="hover:text-red-400 transition-colors">The Rachel File</a>
                </nav>
            </header>

            <div className="max-w-6xl mx-auto px-8 py-16">
                {/* Page title */}
                <div className="mb-12 relative">
                    <div className="absolute -top-4 left-0 text-[8vw] font-black text-[#1a0505] leading-none tracking-tighter pointer-events-none select-none">SINS</div>
                    <div className="relative z-10">
                        <p className="text-xs tracking-[0.4em] text-red-700 uppercase mb-2">Archive Section 02</p>
                        <h1 className="text-4xl font-black">The Sin Archive</h1>
                        <p className="text-zinc-500 text-sm mt-2">Every crime. Every betrayal. Documented for eternity.</p>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-8">
                    {/* Add sin form */}
                    <div className="col-span-4">
                        <div className="border border-red-900 bg-[#0d0404] p-6 sticky top-8">
                            <p className="text-xs tracking-[0.3em] text-red-700 uppercase mb-6">Log New Sin</p>

                            <div className="flex flex-col gap-4">
                                <div>
                                    <label className="text-xs text-zinc-500 tracking-wider uppercase block mb-2">Sin Title *</label>
                                    <input
                                        type="text"
                                        value={form.title}
                                        onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                                        placeholder="e.g. Pushed Bam off the bubble"
                                        className="w-full bg-[#0a0a0a] border border-zinc-800 text-white text-sm px-3 py-2 focus:outline-none focus:border-red-800 placeholder-zinc-700 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs text-zinc-500 tracking-wider uppercase block mb-2">Description *</label>
                                    <textarea
                                        value={form.description}
                                        onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                                        placeholder="Describe the crime in detail..."
                                        rows={4}
                                        className="w-full bg-[#0a0a0a] border border-zinc-800 text-white text-sm px-3 py-2 focus:outline-none focus:border-red-800 placeholder-zinc-700 transition-colors resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs text-zinc-500 tracking-wider uppercase block mb-2">Episode / Chapter</label>
                                    <input
                                        type="text"
                                        value={form.episode}
                                        onChange={e => setForm(p => ({ ...p, episode: e.target.value }))}
                                        placeholder="e.g. S1E10 or Ch.78"
                                        className="w-full bg-[#0a0a0a] border border-zinc-800 text-white text-sm px-3 py-2 focus:outline-none focus:border-red-800 placeholder-zinc-700 transition-colors"
                                    />
                                </div>

                                <button
                                    onClick={addSin}
                                    disabled={submitting || !form.title.trim() || !form.description.trim()}
                                    className="w-full border border-red-800 text-red-400 text-xs tracking-widest uppercase py-3 hover:bg-red-900 hover:text-red-200 transition-all duration-200 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed mt-2"
                                >
                                    {submitting ? "Logging..." : "+ Add to Archive"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sins list */}
                    <div className="col-span-8">
                        {loading ? (
                            <div className="flex items-center justify-center h-48">
                                <div className="text-xs text-zinc-600 tracking-widest uppercase animate-pulse">Loading archive...</div>
                            </div>
                        ) : sins.length === 0 ? (
                            <div className="border border-zinc-800 p-12 text-center">
                                <p className="text-zinc-600 text-sm">No sins logged yet.</p>
                                <p className="text-zinc-700 text-xs mt-1">She will commit one soon enough.</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {sins.map((sin, index) => (
                                    <div
                                        key={sin.id}
                                        className="border border-zinc-800 bg-[#0d0d0d] p-5 group hover:border-red-900 transition-colors relative"
                                    >
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="flex gap-4 items-start flex-1">
                                                {/* Sin number */}
                                                <span className="text-2xl font-black text-[#2a0a0a] leading-none mt-1 select-none" style={{ fontFamily: "monospace" }}>
                          {String(sins.length - index).padStart(2, "0")}
                        </span>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <h3 className="text-sm font-bold text-red-400">{sin.title}</h3>
                                                        {sin.episode && (
                                                            <span className="text-xs text-zinc-600 border border-zinc-800 px-2 py-0.5">{sin.episode}</span>
                                                        )}
                                                    </div>
                                                    <p className="text-zinc-400 text-sm leading-relaxed">{sin.description}</p>
                                                    <p className="text-zinc-700 text-xs mt-2">
                                                        {new Date(sin.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Delete button */}
                                            <button
                                                onClick={() => deleteSin(sin.id)}
                                                disabled={deletingId === sin.id}
                                                className="opacity-0 group-hover:opacity-100 text-zinc-700 hover:text-red-600 text-xs tracking-wider uppercase transition-all duration-200 shrink-0 mt-1"
                                            >
                                                remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}