-- Create clinics table for practice grouping
CREATE TABLE public.clinics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  invite_code TEXT UNIQUE NOT NULL DEFAULT substring(md5(random()::text), 1, 8),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS on clinics
ALTER TABLE public.clinics ENABLE ROW LEVEL SECURITY;

-- Add clinic_id to physician_roles
ALTER TABLE public.physician_roles
ADD COLUMN clinic_id UUID REFERENCES public.clinics(id);

-- Add submission attribution fields to e_consults
ALTER TABLE public.e_consults
ADD COLUMN submitted_by_user_id UUID REFERENCES auth.users(id);

-- Backfill submitted_by_user_id with physician_id for existing records
UPDATE public.e_consults SET submitted_by_user_id = physician_id WHERE submitted_by_user_id IS NULL;

-- Create function to get user's clinic_id
CREATE OR REPLACE FUNCTION public.get_user_clinic_id(_user_id uuid)
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT clinic_id
  FROM public.physician_roles
  WHERE user_id = _user_id
  LIMIT 1
$$;

-- Create function to check if user belongs to same clinic as another user
CREATE OR REPLACE FUNCTION public.is_same_clinic(_user_id uuid, _other_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.physician_roles pr1
    JOIN public.physician_roles pr2 ON pr1.clinic_id = pr2.clinic_id
    WHERE pr1.user_id = _user_id
      AND pr2.user_id = _other_user_id
      AND pr1.clinic_id IS NOT NULL
  )
$$;

-- RLS Policies for clinics table
CREATE POLICY "Users can view their own clinic"
ON public.clinics
FOR SELECT
USING (id = public.get_user_clinic_id(auth.uid()) OR created_by = auth.uid());

CREATE POLICY "Users can create clinics"
ON public.clinics
FOR INSERT
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Clinic creator can update"
ON public.clinics
FOR UPDATE
USING (created_by = auth.uid());

-- Update e_consults RLS to allow admin_staff to view clinic-wide consults
CREATE POLICY "Admin staff can view clinic consults"
ON public.e_consults
FOR SELECT
USING (
  has_physician_role(auth.uid(), 'admin_staff'::physician_role)
  AND public.is_same_clinic(auth.uid(), physician_id)
);

-- Allow admin staff to insert consults on behalf of providers
CREATE POLICY "Admin staff can insert consults for clinic providers"
ON public.e_consults
FOR INSERT
WITH CHECK (
  has_physician_role(auth.uid(), 'admin_staff'::physician_role)
  AND public.is_same_clinic(auth.uid(), physician_id)
  AND submitted_by_user_id = auth.uid()
);

-- Trigger for clinics updated_at
CREATE TRIGGER update_clinics_updated_at
BEFORE UPDATE ON public.clinics
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();