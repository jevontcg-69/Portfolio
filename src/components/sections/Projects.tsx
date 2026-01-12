"use client";

import { motion } from "framer-motion";

export function Projects() {
    return (
        <section id="projects" className="py-24 bg-muted/30">
            <div className="container px-4 md:px-6 mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Featured Projects</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        A selection of work demonstrating data analysis, automation, and web development capabilities.
                    </p>
                </motion.div>

                {/* Placeholder Grid until DB Connection is Live */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((_, i) => (
                        <motion.div
                            key={i}
                            className="h-80 rounded-xl bg-card border border-border/50 animate-pulse flex items-center justify-center flex-col p-6"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                        >
                            <div className="w-full h-40 bg-muted rounded-lg mb-4 opacity-50"></div>
                            <div className="w-3/4 h-6 bg-muted rounded mb-2 opacity-50"></div>
                            <div className="w-1/2 h-4 bg-muted rounded opacity-50"></div>
                            <p className="mt-4 text-xs text-muted-foreground">Database connection required to load projects.</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
