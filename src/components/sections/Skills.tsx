"use client";

import { motion } from "framer-motion";
import { Database, Code2, LineChart, Wrench } from "lucide-react";

const skillCategories = [
    {
        title: "Data Analysis",
        icon: <LineChart className="h-6 w-6 text-blue-400" />,
        skills: ["Python (Pandas, NumPy)", "SQL", "Looker Studio", "Data Visualization", "Statistical Analysis"],
    },
    {
        title: "Development",
        icon: <Code2 className="h-6 w-6 text-purple-400" />,
        skills: ["JavaScript / TypeScript", "Next.js & React", "HTML5 & CSS3", "Tailwind CSS", "API Integration"],
    },
    {
        title: "Business Analysis",
        icon: <Database className="h-6 w-6 text-green-400" />,
        skills: ["Requirements Gathering", "Process Optimization", "Stakeholder Management", "Agile Methodologies"],
    },
    {
        title: "Tools & Platforms",
        icon: <Wrench className="h-6 w-6 text-orange-400" />,
        skills: ["Git & GitHub", "Google Workspace Automation", "Jupyter Notebooks", "Supabase / Firebase", "Vercel"],
    },
];

export function Skills() {
    return (
        <section id="skills" className="py-24 bg-background relative overflow-hidden">
            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Technical Expertise</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        A diverse toolkit built on rigorous scientific training and practical development experience.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={category.title}
                            className="group p-6 rounded-xl border border-border/50 bg-card hover:border-primary/50 transition-colors shadow-sm hover:shadow-md"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <div className="mb-4 p-3 rounded-lg bg-background w-fit group-hover:bg-primary/10 transition-colors">
                                {category.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
                            <ul className="space-y-2">
                                {category.skills.map((skill) => (
                                    <li key={skill} className="text-sm text-muted-foreground flex items-center">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mr-2" />
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
