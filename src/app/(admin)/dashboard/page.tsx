"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Plus, LogOut, LayoutDashboard, FolderKanban, Award } from "lucide-react";
import { cn } from "@/lib/utils";

// Placeholder tabs
type Tab = "projects" | "achievements";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState<Tab>("projects");
    const router = useRouter();
    const supabase = createClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    return (
        <div className="space-y-6 px-4 md:px-0">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <LayoutDashboard className="h-6 w-6 text-primary" />
                    <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
                </div>
                <button
                    onClick={handleSignOut}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-destructive-foreground bg-destructive rounded-md hover:bg-destructive/90 transition-colors"
                >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                </button>
            </div>

            <div className="flex space-x-1 rounded-lg bg-muted p-1 w-fit">
                <button
                    onClick={() => setActiveTab("projects")}
                    className={cn(
                        "inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all",
                        activeTab === "projects"
                            ? "bg-background shadow text-foreground"
                            : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
                    )}
                >
                    <FolderKanban className="h-4 w-4 mr-2" />
                    Projects
                </button>
                <button
                    onClick={() => setActiveTab("achievements")}
                    className={cn(
                        "inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all",
                        activeTab === "achievements"
                            ? "bg-background shadow text-foreground"
                            : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
                    )}
                >
                    <Award className="h-4 w-4 mr-2" />
                    Achievements
                </button>
            </div>

            <div className="bg-card rounded-lg border border-border/50 shadow-sm min-h-[500px] p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">
                        {activeTab === "projects" ? "Manage Projects" : "Manage Achievements"}
                    </h2>
                    <button className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                        <Plus className="h-4 w-4 mr-2" />
                        Add New
                    </button>
                </div>

                {/* Content Placeholder */}
                <div className="flex flex-col items-center justify-center h-64 text-muted-foreground border-2 border-dashed border-border/50 rounded-lg bg-muted/10">
                    <p>No {activeTab} found. Connect Supabase to fetch data.</p>
                </div>
            </div>
        </div>
    );
}
