CREATE TABLE public.branches (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name text NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    address text NOT NULL,
    zip_code text NOT NULL,
    city text NOT NULL,
    state text NOT NULL,
    country text NOT NULL,
    phone text NOT NULL,
    email text NOT NULL
);  

ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;







