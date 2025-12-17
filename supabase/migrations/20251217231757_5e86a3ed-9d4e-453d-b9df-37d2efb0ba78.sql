-- Add 'admin_staff' to the physician_role enum for clinic admin staff
ALTER TYPE public.physician_role ADD VALUE IF NOT EXISTS 'admin_staff';