"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, X } from "lucide-react";

interface JourneyFormProps {
    onClose: () => void;
    onSuccess: () => void;
    initialData?: any;
}

export function JourneyForm({ onClose, onSuccess, initialData }: JourneyFormProps) {
    const [loading, setLoading] = useState(false);
    const supabase = createClient();

    // Form States
    const [title, setTitle] = useState(initialData?.title || "");
    const [subtitle, setSubtitle] = useState(initialData?.subtitle || "");
    const [year, setYear] = useState(initialData?.year || "");
    const [order, setOrder] = useState(initialData?.order || 0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const journeyData = {
                title,
                subtitle,
                year,
                order: Number(order),
            };

            let error;
            if (initialData?.id) {
                // Update existing journey entry
                ({ error } = await supabase
                    .from("journey")
                    .update(journeyData)
                    .eq("id", initialData.id));
            } else {
                // Insert new journey entry
                ({ error } = await supabase.from("journey").insert(journeyData));
            }

            if (error) throw error;
            onSuccess();
            onClose();
        } catch (error: any) {
            console.error("Error saving journey:", error);
            alert(`Failed to save journey milestone: ${error.message || "Unknown error"}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg border bg-card p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">
                        {initialData ? "Edit Journey Milestone" : "Add Journey Milestone"}
                    </h2>
                    <button onClick={onClose} className="hover:bg-accent p-1 rounded">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full rounded-md border border-input bg-background px-3 py-2"
                            placeholder="e.g. Bachelor of Computer Science"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Subtitle</label>
                        <input
                            required
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                            className="w-full rounded-md border border-input bg-background px-3 py-2"
                            placeholder="e.g. University of Technology"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Year</label>
                            <input
                                required
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                className="w-full rounded-md border border-input bg-background px-3 py-2"
                                placeholder="e.g. 2020 - 2024"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Display Order (Higher = Later)</label>
                            <input
                                type="number"
                                required
                                value={order}
                                onChange={(e) => setOrder(Number(e.target.value))}
                                className="w-full rounded-md border border-input bg-background px-3 py-2"
                            />
                        </div>
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-md flex items-center disabled:opacity-50"
                        >
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {loading ? "Saving..." : "Save Milestone"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
