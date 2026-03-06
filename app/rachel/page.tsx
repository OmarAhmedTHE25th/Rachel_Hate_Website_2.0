"use client";

import { useState, useEffect } from "react";

type Sin = {
    id: number;
    title: string;
    description: string;
    episode: string | null;
    createdAt: string;
};

export default function RachelPage() {
    const [sins, setSins] = useState<Sin[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSins();
    }, []);

    async function fetchSins() {
        try {
            const res = await fetch("/api/sins/all");
            const data = await res.json();
            setSins(data);
        } catch (error) {
            console.error("Failed to fetch sins", error);
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
                    <a href="/tracker" className="hover:text-red-400 transition-colors">Tracker</a>
                    <a href="/sins" className="hover:text-red-400 transition-colors">Sin Archive</a>
                    <a href="/rachel" className="text-red-600">The Rachel File</a>
                </nav>
            </header>

            <div className="max-w-5xl mx-auto px-8 pt-16">
                <div className="mb-16 border-l-4 border-red-600 pl-8">
                    <p className="text-xs tracking-[0.4em] text-red-700 uppercase mb-2">Target Identification: R-001</p>
                    <h1 className="text-6xl font-black uppercase tracking-tighter mb-4">The Rachel Dossier</h1>
                    <p className="text-zinc-500 text-lg max-w-2xl leading-relaxed italic">
                        "I was afraid of the dark... but I was even more afraid of the light. Because the light always ends."
                    </p>
                </div>

                <div className="grid grid-cols-12 gap-12">
                    {/* Character Profile */}
                    <div className="col-span-12 lg:col-span-7 space-y-12">
                        <section>
                            <h2 className="text-xs tracking-[0.3em] text-red-500 uppercase mb-6 flex items-center gap-4">
                                <span>Character Profile</span>
                                <div className="h-px bg-red-900/50 flex-1" />
                            </h2>
                            <div className="bg-[#0d0d0d] border border-zinc-800 p-8 space-y-6">
                                <p className="text-zinc-300 leading-relaxed">
                                    Rachel is an Irregular who entered the Tower to see the stars. Despite her lack of innate talent, she has manipulated her way through numerous floors using deception, betrayal, and the exploitation of others' kindness—most notably Twenty-Fifth Baam's.
                                </p>
                                <div className="grid grid-cols-2 gap-4 text-xs">
                                    <div className="border border-zinc-900 bg-black p-3">
                                        <p className="text-zinc-600 uppercase mb-1">Status</p>
                                        <p className="text-red-400 font-bold">ACTIVE THREAT</p>
                                    </div>
                                    <div className="border border-zinc-900 bg-black p-3">
                                        <p className="text-zinc-600 uppercase mb-1">Classification</p>
                                        <p className="text-zinc-300">Irregular / Light Bearer</p>
                                    </div>
                                    <div className="border border-zinc-900 bg-black p-3">
                                        <p className="text-zinc-600 uppercase mb-1">Psych Evaluation</p>
                                        <p className="text-zinc-300">Extreme Narcissism</p>
                                    </div>
                                    <div className="border border-zinc-900 bg-black p-3">
                                        <p className="text-zinc-600 uppercase mb-1">Known Associates</p>
                                        <p className="text-zinc-300">FUG, Yura Ha</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Ugliness Assessment */}
                        <section>
                            <h2 className="text-xs tracking-[0.3em] text-red-500 uppercase mb-6 flex items-center gap-4">
                                <span>Ugliness Assessment</span>
                                <div className="h-px bg-red-900/50 flex-1" />
                            </h2>
                            <div className="bg-[#0d0404] border border-red-950 p-8">
                                <p className="text-[10px] text-red-900 font-mono mb-4">INTERNAL MEMO // EYES ONLY</p>
                                <div className="space-y-4 text-zinc-400 text-sm leading-relaxed">
                                    <p>
                                        <span className="text-red-400 font-bold">SUBJECT R-001</span> exhibits a unique form of spiritual and physical asymmetry. Analysis indicates that the "ugliness" reported by observers is not merely aesthetic but a manifestation of her core instability.
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-zinc-500 italic">
                                        <li>Soul-depth transparency: 0.04% (Near opaque)</li>
                                        <li>Betrayal potential: 99.9%</li>
                                        <li>Aesthetic value: Insufficient for Tower standards</li>
                                        <li>Moral compass: Non-functional</li>
                                    </ul>
                                    <p className="mt-4 border-t border-red-900/30 pt-4">
                                        <span className="text-zinc-600">Conclusion:</span> The subject is objectively and scientifically unpleasant. Her presence causes a 15% drop in local Shinsu quality.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Crime Log */}
                    <div className="col-span-12 lg:col-span-5">
                        <h2 className="text-xs tracking-[0.3em] text-red-500 uppercase mb-6 flex items-center gap-4">
                            <span>Crime Log</span>
                            <div className="h-px bg-red-900/50 flex-1" />
                        </h2>
                        <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                            {loading ? (
                                <div className="text-center py-12 text-zinc-700 uppercase tracking-widest text-xs">Scanning database...</div>
                            ) : sins.length > 0 ? (
                                sins.map((sin) => (
                                    <div key={sin.id} className="border border-zinc-800 bg-[#0d0d0d] p-5 hover:border-red-900/50 transition-colors group">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-red-500 font-bold uppercase tracking-tighter group-hover:text-red-400 transition-colors">{sin.title}</h3>
                                            <span className="text-[9px] text-zinc-700 font-mono uppercase">#{sin.id.toString().padStart(4, '0')}</span>
                                        </div>
                                        <p className="text-zinc-500 text-xs leading-relaxed mb-3">{sin.description}</p>
                                        <div className="flex justify-between items-center text-[10px] text-zinc-700 uppercase tracking-widest">
                                            <span>{sin.episode ? `EP: ${sin.episode}` : "N/A"}</span>
                                            <span>{new Date(sin.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 text-zinc-700 uppercase tracking-widest text-xs">No crimes recorded. For now.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #0a0a0a;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #1a1a1a;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #2a0a0a;
                }
            `}</style>
        </main>
    );
}
