"use client";

import { motion } from "framer-motion";
import { Award, Briefcase, GraduationCap } from "lucide-react";

export default function AchievementsPage() {
    const steps = [
        {
            date: "2024 - Present",
            title: "Transition to Tech",
            description: "Successfully pivoted from a pure Physics background to software development and business analysis, leveraging analytical skills to solve business problems.",
            icon: <Briefcase className="w-6 h-6 text-primary" />,
            type: "milestone"
        },
        {
            date: "2023",
            title: "Physics Degree Graduate",
            description: "Completed rigorous training in theoretical and applied physics, mastering complex mathematical modeling and data analysis.",
            icon: <GraduationCap className="w-6 h-6 text-secondary" />,
            type: "certification"
        },
        // Add more placeholder items
    ];

    return (
        <div className="container px-4 md:px-6 mx-auto py-24">
            <motion.div
                className="mb-16 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Achievements & Journey</h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    A timeline of my academic background, professional milestones, and technical certifications.
                </p>
            </motion.div>

            <div className="relative max-w-3xl mx-auto">
                {/* Vertical Line */}
                <div className="absolute left-9 top-0 bottom-0 w-0.5 bg-border/50 md:left-1/2 md:-ml-0.5"></div>

                <div className="space-y-12">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className={`relative flex items-start md:items-center ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                                }`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            {/* Icon Bubble */}
                            <div className="absolute left-0 md:left-1/2 md:-ml-10 flex items-center justify-center w-20 h-20 rounded-full bg-background border-4 border-muted z-10">
                                <div className="w-12 h-12 rounded-full bg-muted/30 flex items-center justify-center">
                                    {step.icon}
                                </div>
                            </div>

                            {/* Content Card */}
                            <div className={`ml-24 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pl-16" : "md:pr-16 md:text-right"}`}>
                                <div className="p-6 bg-card border border-border/50 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
                                        {step.date}
                                    </span>
                                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
