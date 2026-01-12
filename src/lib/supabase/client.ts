import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    try {
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
            throw new Error("Missing env vars");
        }
        return createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        )
    } catch (e) {
        // Return a mock object to prevent build crashes
        return {
            auth: {
                signInWithPassword: async () => ({ error: { message: "Supabase not configured" } }),
                getUser: async () => ({ data: { user: null } }),
                signOut: async () => { },
            }
        } as any
    }
}
