"use client";

import { motion } from "framer-motion";

export default function ProjectsPage() {
    return (
        <div className="container px-4 md:px-6 mx-auto py-24">
            <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">All Projects</h1>
                <p className="text-xl text-muted-foreground max-w-3xl">
                    A complete collection of my work, ranging from data analysis scripts to full-stack web applications.
                </p>
            </motion.div>

            {/* Grid Placeholder */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((_, i) => (
                    <motion.div
                        key={i}
                        className="group relative h-96 rounded-xl overflow-hidden bg-card border border-border/50 hover:border-primary/50 transition-colors shadow-sm hover:shadow-md flex flex-col"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                    >
                        {/* Image Placeholder */}
                        <div className="h-48 bg-muted w-full relative">
                            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-muted/50">
                                <span className="text-sm">Project Thumbnail</span>
                            </div>
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                            <div className="flex gap-2 mb-3">
                                <span className="px-2 py-1 rounded bg-secondary/10 text-secondary text-xs font-medium">
                                    Category
                                </span>
                            </div>

                            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                                Project Title {i + 1}
                            </h3>

                            <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-grow">
                                This is a brief description of the project. It highlights the key problem solved
                                and the technologies used to build it.
                            </p>

                            <div className="flex gap-3 text-sm font-medium pt-4 mt-auto border-t border-border/40">
                                <button className="text-primary hover:underline">View Details</button>
                                <button className="text-muted-foreground hover:text-foreground">GitHub</button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
