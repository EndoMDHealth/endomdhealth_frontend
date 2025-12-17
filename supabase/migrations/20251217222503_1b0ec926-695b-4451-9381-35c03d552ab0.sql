-- Add RLS policy for specialists to view all e-consults (they need to respond to them)
CREATE POLICY "Specialists can view all consults" 
ON public.e_consults 
FOR SELECT 
USING (has_physician_role(auth.uid(), 'specialist'::physician_role));

-- Allow specialists to update e-consults (to add responses)
CREATE POLICY "Specialists can update consults with responses" 
ON public.e_consults 
FOR UPDATE 
USING (has_physician_role(auth.uid(), 'specialist'::physician_role));