-- Create enum for physician roles
CREATE TYPE public.physician_role AS ENUM ('physician', 'admin');

-- Create enum for e-consult status
CREATE TYPE public.econsult_status AS ENUM ('submitted', 'under_review', 'awaiting_info', 'completed');

-- Create enum for condition categories
CREATE TYPE public.condition_category AS ENUM ('obesity', 'growth', 'diabetes', 'puberty', 'thyroid', 'pcos', 'other');

-- Create physician_roles table (separate from profiles for security)
CREATE TABLE public.physician_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role physician_role NOT NULL DEFAULT 'physician',
  practice_name TEXT,
  npi_number TEXT,
  specialty TEXT,
  phone TEXT,
  state TEXT,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Create e_consults table
CREATE TABLE public.e_consults (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  physician_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  patient_initials TEXT NOT NULL,
  patient_age INTEGER NOT NULL,
  patient_dob DATE,
  patient_gender TEXT,
  height_cm NUMERIC,
  weight_kg NUMERIC,
  bmi NUMERIC,
  condition_category condition_category NOT NULL,
  clinical_question TEXT NOT NULL,
  additional_notes TEXT,
  status econsult_status NOT NULL DEFAULT 'submitted',
  response_notes TEXT,
  responded_at TIMESTAMP WITH TIME ZONE,
  responded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create e_consult_attachments table for lab uploads
CREATE TABLE public.e_consult_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  e_consult_id UUID REFERENCES public.e_consults(id) ON DELETE CASCADE NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT,
  file_size INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create e_consult_messages table
CREATE TABLE public.e_consult_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  e_consult_id UUID REFERENCES public.e_consults(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.physician_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.e_consults ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.e_consult_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.e_consult_messages ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_physician_role(_user_id UUID, _role physician_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.physician_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to check if user is a physician
CREATE OR REPLACE FUNCTION public.is_physician(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.physician_roles
    WHERE user_id = _user_id
  )
$$;

-- RLS Policies for physician_roles
CREATE POLICY "Users can view their own role"
ON public.physician_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own role"
ON public.physician_roles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own role"
ON public.physician_roles
FOR UPDATE
USING (auth.uid() = user_id);

-- Admins can view all physician roles
CREATE POLICY "Admins can view all roles"
ON public.physician_roles
FOR SELECT
TO authenticated
USING (public.has_physician_role(auth.uid(), 'admin'));

-- RLS Policies for e_consults
CREATE POLICY "Physicians can view their own consults"
ON public.e_consults
FOR SELECT
TO authenticated
USING (physician_id = auth.uid() OR public.has_physician_role(auth.uid(), 'admin'));

CREATE POLICY "Physicians can insert their own consults"
ON public.e_consults
FOR INSERT
TO authenticated
WITH CHECK (physician_id = auth.uid() AND public.is_physician(auth.uid()));

CREATE POLICY "Physicians can update their own consults"
ON public.e_consults
FOR UPDATE
TO authenticated
USING (physician_id = auth.uid() OR public.has_physician_role(auth.uid(), 'admin'));

-- RLS Policies for e_consult_attachments
CREATE POLICY "Users can view attachments for their consults"
ON public.e_consult_attachments
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.e_consults 
    WHERE e_consults.id = e_consult_id 
    AND (e_consults.physician_id = auth.uid() OR public.has_physician_role(auth.uid(), 'admin'))
  )
);

CREATE POLICY "Users can insert attachments for their consults"
ON public.e_consult_attachments
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.e_consults 
    WHERE e_consults.id = e_consult_id 
    AND e_consults.physician_id = auth.uid()
  )
);

-- RLS Policies for e_consult_messages
CREATE POLICY "Users can view messages for their consults"
ON public.e_consult_messages
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.e_consults 
    WHERE e_consults.id = e_consult_id 
    AND (e_consults.physician_id = auth.uid() OR public.has_physician_role(auth.uid(), 'admin'))
  )
);

CREATE POLICY "Users can insert messages for their consults"
ON public.e_consult_messages
FOR INSERT
TO authenticated
WITH CHECK (
  sender_id = auth.uid() AND
  EXISTS (
    SELECT 1 FROM public.e_consults 
    WHERE e_consults.id = e_consult_id 
    AND (e_consults.physician_id = auth.uid() OR public.has_physician_role(auth.uid(), 'admin'))
  )
);

-- Create triggers for updated_at
CREATE TRIGGER update_physician_roles_updated_at
BEFORE UPDATE ON public.physician_roles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_e_consults_updated_at
BEFORE UPDATE ON public.e_consults
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for e-consult attachments
INSERT INTO storage.buckets (id, name, public) VALUES ('econsult-attachments', 'econsult-attachments', false);

-- Storage policies for e-consult attachments
CREATE POLICY "Physicians can upload attachments"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'econsult-attachments' AND public.is_physician(auth.uid()));

CREATE POLICY "Physicians can view their attachments"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'econsult-attachments' AND public.is_physician(auth.uid()));