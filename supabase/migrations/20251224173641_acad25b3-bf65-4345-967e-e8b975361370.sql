-- Add next_step column to e_consults table for specialist next step selection
ALTER TABLE public.e_consults 
ADD COLUMN next_step text;

-- Add a check constraint for valid next step values
ALTER TABLE public.e_consults 
ADD CONSTRAINT e_consults_next_step_check 
CHECK (next_step IS NULL OR next_step IN (
  'schedule_virtual_visit',
  'schedule_in_person_visit',
  'continue_monitoring',
  'obtain_further_labs',
  'refer_different_specialty'
));