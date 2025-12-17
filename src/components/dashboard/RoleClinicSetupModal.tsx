import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2, Users, Stethoscope, Building2, Plus, UserPlus } from "lucide-react";

type UserRole = 'physician' | 'admin_staff';

interface RoleClinicSetupModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

export const RoleClinicSetupModal = ({ isOpen, onComplete }: RoleClinicSetupModalProps) => {
  const { user } = useAuth();
  const [step, setStep] = useState<'role' | 'clinic'>('role');
  const [selectedRole, setSelectedRole] = useState<UserRole>('physician');
  const [clinicTab, setClinicTab] = useState<'create' | 'join'>('create');
  const [clinicName, setClinicName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSubmit = () => {
    setStep('clinic');
  };

  const handleCreateClinic = async () => {
    if (!user || !clinicName.trim()) {
      toast.error("Please enter a clinic name");
      return;
    }

    setIsLoading(true);
    try {
      // Create the clinic
      const { data: clinic, error: clinicError } = await supabase
        .from('clinics')
        .insert({
          name: clinicName.trim(),
          created_by: user.id,
        })
        .select()
        .single();

      if (clinicError) throw clinicError;

      // Update the user's physician_roles with the clinic_id and role
      const { error: roleError } = await supabase
        .from('physician_roles')
        .update({
          clinic_id: clinic.id,
          role: selectedRole,
        })
        .eq('user_id', user.id);

      if (roleError) throw roleError;

      toast.success("Clinic created successfully!");
      onComplete();
    } catch (error) {
      console.error('Error creating clinic:', error);
      toast.error("Failed to create clinic. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinClinic = async () => {
    if (!user || !inviteCode.trim()) {
      toast.error("Please enter an invite code");
      return;
    }

    setIsLoading(true);
    try {
      // Find the clinic by invite code
      const { data: clinic, error: findError } = await supabase
        .from('clinics')
        .select('id, name')
        .eq('invite_code', inviteCode.trim().toLowerCase())
        .maybeSingle();

      if (findError) throw findError;

      if (!clinic) {
        toast.error("Invalid invite code. Please check and try again.");
        setIsLoading(false);
        return;
      }

      // Update the user's physician_roles with the clinic_id and role
      const { error: roleError } = await supabase
        .from('physician_roles')
        .update({
          clinic_id: clinic.id,
          role: selectedRole,
        })
        .eq('user_id', user.id);

      if (roleError) throw roleError;

      toast.success(`Successfully joined ${clinic.name}!`);
      onComplete();
    } catch (error) {
      console.error('Error joining clinic:', error);
      toast.error("Failed to join clinic. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkipClinic = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      // Update role without clinic
      const { error } = await supabase
        .from('physician_roles')
        .update({ role: selectedRole })
        .eq('user_id', user.id);

      if (error) throw error;

      toast.success("Profile setup complete!");
      onComplete();
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error("Failed to save settings. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[500px]" onInteractOutside={(e) => e.preventDefault()}>
        {step === 'role' ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">Welcome to the Provider Portal</DialogTitle>
              <DialogDescription>
                Please select your role to customize your dashboard experience.
              </DialogDescription>
            </DialogHeader>

            <div className="py-6">
              <RadioGroup
                value={selectedRole}
                onValueChange={(value) => setSelectedRole(value as UserRole)}
                className="space-y-4"
              >
                <div
                  className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedRole === 'physician'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedRole('physician')}
                >
                  <RadioGroupItem value="physician" id="physician" className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="h-5 w-5 text-primary" />
                      <Label htmlFor="physician" className="text-base font-semibold cursor-pointer">
                        Provider (Physician / NP / PA)
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Submit e-Consults under your own name, view your submissions, and clinically close consultations.
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedRole === 'admin_staff'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedRole('admin_staff')}
                >
                  <RadioGroupItem value="admin_staff" id="admin_staff" className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <Label htmlFor="admin_staff" className="text-base font-semibold cursor-pointer">
                        Admin / Clinical Staff
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Submit e-Consults on behalf of providers, view all clinic submissions, and manage referrals.
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleRoleSubmit} className="bg-primary">
                Continue
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Set Up Your Practice
              </DialogTitle>
              <DialogDescription>
                Create a new practice or join an existing one with an invite code.
              </DialogDescription>
            </DialogHeader>

            <Tabs value={clinicTab} onValueChange={(v) => setClinicTab(v as 'create' | 'join')} className="mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="create" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create New
                </TabsTrigger>
                <TabsTrigger value="join" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Join Existing
                </TabsTrigger>
              </TabsList>

              <TabsContent value="create" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="clinic-name">Practice Name</Label>
                  <Input
                    id="clinic-name"
                    placeholder="e.g., Pediatric Associates of Virginia"
                    value={clinicName}
                    onChange={(e) => setClinicName(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    You'll receive an invite code to share with your team.
                  </p>
                </div>

                <div className="flex gap-3 justify-end pt-4">
                  <Button variant="outline" onClick={handleSkipClinic} disabled={isLoading}>
                    Skip for now
                  </Button>
                  <Button onClick={handleCreateClinic} disabled={isLoading || !clinicName.trim()}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      'Create Practice'
                    )}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="join" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="invite-code">Invite Code</Label>
                  <Input
                    id="invite-code"
                    placeholder="Enter 8-character code"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                    maxLength={8}
                    className="uppercase tracking-wider"
                  />
                  <p className="text-xs text-muted-foreground">
                    Ask your practice administrator for the invite code.
                  </p>
                </div>

                <div className="flex gap-3 justify-end pt-4">
                  <Button variant="outline" onClick={handleSkipClinic} disabled={isLoading}>
                    Skip for now
                  </Button>
                  <Button onClick={handleJoinClinic} disabled={isLoading || !inviteCode.trim()}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Joining...
                      </>
                    ) : (
                      'Join Practice'
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
