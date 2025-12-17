-- Add 'specialist' to the physician_role enum
ALTER TYPE public.physician_role ADD VALUE IF NOT EXISTS 'specialist';