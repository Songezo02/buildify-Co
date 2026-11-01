CREATE TABLE public.enquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  business TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  services TEXT[] NOT NULL DEFAULT '{}',
  budget TEXT,
  description TEXT NOT NULL,
  contact_method TEXT NOT NULL CHECK (contact_method IN ('email', 'phone', 'whatsapp')),
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.enquiries TO anon;
GRANT INSERT ON public.enquiries TO authenticated;
GRANT ALL ON public.enquiries TO service_role;

ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an enquiry"
ON public.enquiries FOR INSERT
WITH CHECK (true);