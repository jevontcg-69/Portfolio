"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { Briefcase, GraduationCap } from "lucide-react";

export function Timeline() {
    const [journey, setJourney] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        async function fetchJourney() {
            try {
                const { data, error } = await supabase
                    .from("journey")
                    .select("*")
                    .order("order", { ascending: true });

                if (error) throw error;
                setJourney(data || []);
            } catch (err: any) {
                console.error("Error fetching journey details:", err.message || err);
            } finally {
                setLoading(false);
            }
        }

        fetchJourney();
    }, [supabase]);

    if (loading && journey.length === 0) {
        return (
            <section id="journey" className="py-24 bg-background/50">
                <div className="container px-4 mx-auto">
                    <div className="max-w-3xl mx-auto space-y-12">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-32 bg-muted/50 animate-pulse rounded-2xl" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (journey.length === 0) return null;

    return (
        <section id="journey" className="py-24 relative overflow-hidden bg-background/50">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-10 pointer-events-none">
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-primary/20 blur-[120px] rounded-full" />
            </div>

            <div className="container px-4 md:px-6 mx-auto">
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">My Journey</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        A chronological voyage through my professional highlights and academic milestones.
                    </p>
                </motion.div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Central Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/50 via-primary/20 to-transparent md:-translate-x-1/2" />

                    <div className="space-y-12">
                        {journey.map((item, i) => (
                            <motion.div
                                key={item.id}
                                className={`relative flex flex-col md:flex-row items-center ${i % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                                initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7, delay: i * 0.1 }}
                            >
                                {/* Dot */}
                                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(var(--primary),0.5)]" />

                                {/* Content Card */}
                                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"
                                    }`}>
                                    <div className={`p-6 rounded-2xl border border-border/50 bg-card/50 hover:bg-card hover:border-primary/30 transition-all hover:shadow-2xl hover:-translate-y-1 group ${i % 2 === 0 ? "md:text-right" : "text-left"
                                        }`}>
                                        <div className={`flex items-center gap-2 mb-4 ${i % 2 === 0 ? "md:justify-end" : "justify-start"
                                            }`}>
                                            <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-xs font-semibold">
                                                {item.year}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed">{item.subtitle}</p>
                                    </div>
                                </div>

                                {/* Spacer for desktop staggered layout */}
                                <div className="hidden md:block w-1/2" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
