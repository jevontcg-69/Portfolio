"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { Award, GraduationCap, Briefcase, Calendar } from "lucide-react";

export function Achievements() {
    const [achievements, setAchievements] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        async function fetchAchievements() {
            try {
                const { data, error } = await supabase
                    .from("achievements")
                    .select("*")
                    .order("date", { ascending: false });

                if (error) throw error;
                setAchievements(data || []);
            } catch (err) {
                console.error("Error fetching achievements:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchAchievements();
    }, [supabase]);

    const getIcon = (type: string) => {
        switch (type) {
            case "award": return <Award className="h-5 w-5 text-yellow-500" />;
            case "certification": return <GraduationCap className="h-5 w-5 text-blue-500" />;
            case "milestone": return <Briefcase className="h-5 w-5 text-green-500" />;
            default: return <Award className="h-5 w-5" />;
        }
    };

    if (loading) return null; // Or skeleton

    if (achievements.length === 0) return null;

    return (
        <section id="achievements" className="py-24 bg-background">
            <div className="container px-4 md:px-6 mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Milestones & Achievements</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Significant professional and academic achievements throughout my journey.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto space-y-6">
                    {achievements.map((achievement, i) => (
                        <motion.div
                            key={achievement.id}
                            className="flex gap-6 p-6 rounded-xl border border-border/50 bg-card/50 hover:bg-card transition-colors"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                        >
                            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                                {getIcon(achievement.type)}
                            </div>
                            <div className="flex-grow">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                                    <h3 className="text-lg font-bold">{achievement.title}</h3>
                                    <span className="inline-flex items-center text-xs text-muted-foreground">
                                        <Calendar className="mr-1 h-3 w-3" />
                                        {new Date(achievement.date).toLocaleDateString('en-US', {
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </span>
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {achievement.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
