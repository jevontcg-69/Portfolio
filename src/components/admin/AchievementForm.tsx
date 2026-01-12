"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, X } from "lucide-react";

interface AchievementFormProps {
    onClose: () => void;
    onSuccess: () => void;
}

export function AchievementForm({ onClose, onSuccess }: AchievementFormProps) {
    const [loading, setLoading] = useState(false);
    const supabase = createClient();

    // Form States
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("milestone");
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase.from("achievements").insert({
                title,
                description,
                type,
                date,
            });

            if (error) throw error;
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Error adding achievement:", error);
            alert("Failed to add achievement.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-lg border bg-card p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Add New Achievement</h2>
                    <button onClick={onClose}><X className="h-5 w-5" /></button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full rounded-md border border-input bg-background px-3 py-2"
                            placeholder="Won Hackathon 2024"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Type</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full rounded-md border border-input bg-background px-3 py-2"
                        >
                            <option value="milestone">Milestone</option>
                            <option value="award">Award</option>
                            <option value="certification">Certification</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Date</label>
                        <input
                            type="date"
                            required
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full rounded-md border border-input bg-background px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 min-h-[100px]"
                            placeholder="Describe this achievement..."
                        />
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
                            className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-md flex items-center"
                        >
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Achievement
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
