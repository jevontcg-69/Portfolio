"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { ExternalLink, Github, Code2 } from "lucide-react";
import Link from "next/link";

export function Projects() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        async function fetchProjects() {
            try {
                const { data, error } = await supabase
                    .from("projects")
                    .select("*")
                    .order("display_order", { ascending: true })
                    .limit(6);

                if (error) throw error;
                setProjects(data || []);
            } catch (err) {
                console.error("Error fetching projects:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchProjects();
    }, [supabase]);

    if (loading) {
        return (
            <section id="projects" className="py-24 bg-muted/30">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="text-center mb-16">
                        <div className="h-10 w-64 bg-muted rounded mx-auto mb-4 animate-pulse"></div>
                        <div className="h-6 w-96 bg-muted rounded mx-auto animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="h-80 rounded-xl bg-card border border-border/50 animate-pulse flex flex-col p-6">
                                <div className="w-full h-40 bg-muted rounded-lg mb-4"></div>
                                <div className="w-3/4 h-6 bg-muted rounded mb-2"></div>
                                <div className="w-1/2 h-4 bg-muted rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

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

                {projects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, i) => (
                            <motion.div
                                key={project.id}
                                className="group relative flex flex-col h-full rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 overflow-hidden"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                            >
                                <div className="aspect-video bg-muted relative overflow-hidden">
                                    {project.image_url ? (
                                        <img
                                            src={project.image_url}
                                            alt={project.title}
                                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
                                            <Code2 className="h-12 w-12 text-primary/20" />
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-background/80 backdrop-blur-md border border-border">
                                            {project.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tech_stack?.map((tech: string) => (
                                            <span key={tech} className="px-2 py-1 text-[10px] font-medium rounded-md bg-secondary/10 text-secondary border border-secondary/20">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-auto flex items-center gap-4">
                                        {project.github_link && (
                                            <Link
                                                href={project.github_link}
                                                target="_blank"
                                                className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                                            >
                                                <Github className="mr-2 h-4 w-4" />
                                                Code
                                            </Link>
                                        )}
                                        {project.demo_link && (
                                            <Link
                                                href={project.demo_link}
                                                target="_blank"
                                                className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                                            >
                                                <ExternalLink className="mr-2 h-4 w-4" />
                                                Live Demo
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 px-6 rounded-2xl border-2 border-dashed border-border/50 bg-muted/10">
                        <p className="text-muted-foreground">No projects found. Add them in the admin dashboard!</p>
                        <Link href="/login" className="mt-4 inline-block text-primary hover:underline text-sm font-medium">
                            Go to Dashboard
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
