"use client";

import  { useState, useEffect } from "react";

type ProgressEntry = {
    id: number;
    part: number;
    episode: number | null;
    chapter: number | null;
    notes: string | null;
    updatedAt: string;
};

export default function TrackerPage() {
    const [history, setHistory] = useState<ProgressEntry[]>([]);
    const [part, setPart] = useState<number>(1);
    const [episode, setEpisode] = useState<number| null >(1);
    const [chapter, setChapter] = useState<number| null>(79 );
    const [notes, setNotes] = useState<string>("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchHistory();
    }, []);

    async function fetchHistory() {
        const res = await fetch("/api/progress");
        const data = await res.json();
        setHistory(data);
        if (data.length > 0) {
            setPart(data[0].part);
            setEpisode(data[0].episode);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        const newEntry = {
            part,
            episode,
            notes: notes || null,
        };

        // Optimistic update
        const optimisticEntry: ProgressEntry = {
            id: Date.now(),
            part,
            episode: episode|| null,
            chapter: chapter || null,
            notes: notes || null,
            updatedAt: new Date().toISOString(),
        };
        setHistory([optimisticEntry, ...history]);

        try {
            const res = await fetch("/api/progress", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newEntry),
            });
            if (res.ok) {
                setNotes("");
                fetchHistory();
            }
        } catch (error) {
            console.error("Failed to save progress", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden pb-24" style={{ fontFamily: "'Georgia', serif" }}>
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
                    <a href="/tracker" className="text-red-600">Tracker</a>
                    <a href="/sins" className="hover:text-red-400 transition-colors">Sin Archive</a>
                    <a href="/rachel" className="hover:text-red-400 transition-colors">The Rachel File</a>
                </nav>
            </header>

            <div className="max-w-4xl mx-auto px-8 pt-16">
                <div className="mb-12">
                    <p className="text-xs tracking-[0.4em] text-red-700 uppercase mb-2">Subject Location Log</p>
                    <h1 className="text-4xl font-black uppercase tracking-tighter">Progress Tracker</h1>
                    <p className="text-zinc-500 text-sm mt-2 italic">Monitoring the ascent through the Tower.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="md:col-span-1">
                        <form onSubmit={handleSubmit} className="border border-zinc-800 bg-[#0d0d0d] p-6 space-y-6">
                            <p className="text-xs tracking-[0.2em] text-red-400 uppercase border-b border-red-900/30 pb-2">Update Status</p>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Part</label>
                                    <input 
                                        type="number" 
                                        value={part}
                                        min={1}
                                        onChange={(e) => setPart(Math.max(parseInt(e.target.value),1) || 1)}
                                        className="w-full bg-black border border-zinc-800 p-2 text-white focus:border-red-600 outline-none transition-colors"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Episode (Anime) </label>
                                    <input 
                                        type="number" 
                                        value={episode??""}
                                        min={1}
                                        onChange={(e) => setEpisode(e.target.value === "" ? null : Math.max(1, parseInt(e.target.value) || 1))}
                                        className="w-full bg-black border border-zinc-800 p-2 text-white focus:border-red-600 outline-none transition-colors"
                                        placeholder="e.g. 12"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] text-zinc-500 uppercase tracking-widest mb-1" >Chapter (Manhwa)</label>
                                <input
                                    type="number"
                                    value={chapter??""}
                                    min={79}
                                    onChange={(e) => setChapter(e.target.value === "" ? null : Math.max(79, parseInt(e.target.value) || 79))}
                                    placeholder="e.g. 79"
                                    className="w-full bg-black border border-zinc-800 p-2 text-white focus:border-red-600 outline-none transition-colors"
                                />
                            </div>
                                <div>
                                    <label className="block text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Field Notes</label>
                                    <textarea 
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="Observations..."
                                        className="w-full bg-black border border-zinc-800 p-2 text-white focus:border-red-600 outline-none transition-colors min-h-25 text-sm"
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit"
                                disabled={loading}
                                className="w-full border border-red-800 text-red-400 text-xs tracking-widest uppercase py-3 hover:bg-red-900 hover:text-red-200 transition-all duration-200 disabled:opacity-50"
                            >
                                {loading ? "Recording..." : "Log Progress"}
                            </button>
                        </form>
                    </div>

                    <div className="md:col-span-2 space-y-4">
                        <p className="text-xs tracking-[0.2em] text-zinc-500 uppercase">Mission History</p>
                        
                        <div className="space-y-4">
                            {history.length > 0 ? (
                                history.map((entry, index) => (
                                    <div key={entry.id} className={`border ${index === 0 ? 'border-red-900/50 bg-[#120505]' : 'border-zinc-800 bg-[#0d0d0d]'} p-6 transition-all`}>
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex gap-6">
                                                <div>
                                                    <p className="text-2xl font-black text-white leading-none">{entry.part}</p>
                                                    <p className="text-[10px] text-zinc-600 mt-1 tracking-wider uppercase">Part</p>
                                                </div>
                                                <div className="w-px bg-zinc-800" />
                                                <div>
                                                    <p className="text-2xl font-black text-white leading-none">{entry.episode}</p>
                                                    <p className="text-[10px] text-zinc-600 mt-1 tracking-wider uppercase">Episode</p>
                                                </div>
                                            </div>
                                            <span className="text-[10px] text-zinc-700 font-mono">
                                                {new Date(entry.updatedAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        {entry.notes && (
                                            <div className="border-t border-zinc-800/50 pt-4 mt-2">
                                                <p className="text-zinc-400 text-sm leading-relaxed italic">
                                                    "{entry.notes}"
                                                </p>
                                            </div>
                                        )}
                                        {index === 0 && (
                                            <div className="mt-4 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                                                <span className="text-[9px] text-red-900 uppercase tracking-[0.2em] font-bold">Latest Entry</span>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="border border-dashed border-zinc-800 p-12 text-center">
                                    <p className="text-zinc-600 text-xs uppercase tracking-widest">No logs found</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
