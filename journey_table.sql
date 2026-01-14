-- Create the journey table
CREATE TABLE IF NOT EXISTS public.journey (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    year TEXT NOT NULL,
    "order" INTEGER DEFAULT 0 NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.journey ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON public.journey
    FOR SELECT USING (true);

-- Allow authenticated users (admin) to perform all actions
CREATE POLICY "Allow authenticated users all access" ON public.journey
    FOR ALL USING (auth.role() = 'authenticated');
