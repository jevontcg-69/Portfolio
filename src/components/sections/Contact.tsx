"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Send } from "lucide-react";
import { useState } from "react";

export function Contact() {
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        // This is a placeholder for actual email logic (e.g., Formspree or a Server Action)
        setTimeout(() => {
            setStatus("sent");
        }, 1500);
    };

    return (
        <section id="contact" className="py-24 bg-muted/30">
            <div className="container px-4 md:px-6 mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Get in Touch</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        I'm always open to discussing new opportunities, data challenges, or technical collaborations.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                            <div className="space-y-6">
                                <a href="mailto:contact@jevon.tech" className="flex items-center group">
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mr-4 group-hover:bg-primary transition-colors">
                                        <Mail className="h-5 w-5 text-primary group-hover:text-primary-foreground" />
                                    </div>
                                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">contact@jevon.tech</span>
                                </a>
                                <a href="https://linkedin.com/in/jevon" target="_blank" className="flex items-center group">
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mr-4 group-hover:bg-primary transition-colors">
                                        <Linkedin className="h-5 w-5 text-primary group-hover:text-primary-foreground" />
                                    </div>
                                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">linkedin.com/in/jevon</span>
                                </a>
                                <a href="https://github.com/jevon" target="_blank" className="flex items-center group">
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mr-4 group-hover:bg-primary transition-colors">
                                        <Github className="h-5 w-5 text-primary group-hover:text-primary-foreground" />
                                    </div>
                                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">github.com/jevon</span>
                                </a>
                            </div>
                        </div>

                        <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
                            <h4 className="text-lg font-semibold mb-2">Available for roles</h4>
                            <p className="text-sm text-muted-foreground">
                                Currently seeking opportunities as a Business Analyst, Data Analyst, or Junior Developer.
                            </p>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <form onSubmit={handleSubmit} className="p-8 rounded-2xl border border-border/50 bg-card space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Name</label>
                                    <input
                                        required
                                        className="w-full h-10 px-3 rounded-md bg-background border border-border focus:ring-2 focus:ring-primary outline-none transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email</label>
                                    <input
                                        required
                                        type="email"
                                        className="w-full h-10 px-3 rounded-md bg-background border border-border focus:ring-2 focus:ring-primary outline-none transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Subject</label>
                                <input
                                    required
                                    className="w-full h-10 px-3 rounded-md bg-background border border-border focus:ring-2 focus:ring-primary outline-none transition-all"
                                    placeholder="Collaboration Inquiry"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Message</label>
                                <textarea
                                    required
                                    className="w-full h-32 p-3 rounded-md bg-background border border-border focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                                    placeholder="Tell me more about your project..."
                                />
                            </div>
                            <button
                                disabled={status === "sending" || status === "sent"}
                                className="w-full h-12 bg-primary text-primary-foreground rounded-lg font-semibold flex items-center justify-center transition-all hover:bg-primary/90 disabled:opacity-70"
                            >
                                {status === "sent" ? (
                                    "Message Sent!"
                                ) : status === "sending" ? (
                                    "Sending..."
                                ) : (
                                    <>
                                        Send Message
                                        <Send className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </button>
                            {status === "sent" && (
                                <p className="text-xs text-center text-green-500 mt-2">
                                    Thank you! I'll get back to you soon.
                                </p>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
