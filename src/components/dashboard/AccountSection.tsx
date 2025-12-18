import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Building2, 
  Phone, 
  Printer, 
  MapPin,
  Save,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  HelpCircle
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface PracticeInfo {
  practice_name: string;
  phone: string;
  state: string;
  npi_number: string;
}

export const AccountSection = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<PracticeInfo>({
    practice_name: "",
    phone: "",
    state: "",
    npi_number: "",
  });
  const [originalData, setOriginalData] = useState<PracticeInfo>({
    practice_name: "",
    phone: "",
    state: "",
    npi_number: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof PracticeInfo, string>>>({});

  useEffect(() => {
    if (user) {
      fetchPracticeInfo();
    }
  }, [user]);

  const fetchPracticeInfo = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('physician_roles')
      .select('practice_name, phone, state, npi_number')
      .eq('user_id', user.id)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching practice info:', error);
      return;
    }
    
    if (data) {
      const info: PracticeInfo = {
        practice_name: data.practice_name || "",
        phone: data.phone || "",
        state: data.state || "",
        npi_number: data.npi_number || "",
      };
      setFormData(info);
      setOriginalData(info);
    }
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  };

  const validatePhone = (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 0 || cleaned.length === 10;
  };

  const handleInputChange = (field: keyof PracticeInfo, value: string) => {
    let formattedValue = value;
    
    if (field === 'phone') {
      formattedValue = formatPhoneNumber(value);
    }
    
    setFormData(prev => ({ ...prev, [field]: formattedValue }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof PracticeInfo, string>> = {};
    
    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors before saving");
      return;
    }
    
    if (!user) return;
    
    setIsSaving(true);
    
    try {
      const { error } = await supabase
        .from('physician_roles')
        .update({
          practice_name: formData.practice_name || null,
          phone: formData.phone || null,
          state: formData.state || null,
          npi_number: formData.npi_number || null,
        })
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      setOriginalData(formData);
      setIsEditing(false);
      toast.success("Practice information saved successfully", {
        icon: <CheckCircle2 className="h-4 w-4 text-green-600" />,
      });
    } catch (error) {
      console.error('Error saving practice info:', error);
      toast.error("Failed to save practice information", {
        icon: <AlertCircle className="h-4 w-4 text-red-600" />,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    setErrors({});
    setIsEditing(false);
  };

  const hasChanges = JSON.stringify(formData) !== JSON.stringify(originalData);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Account Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your practice information and account details
        </p>
      </div>

      <Card className="bg-card border-border shadow-sm">
        <CardHeader className="border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Building2 className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <CardTitle className="text-lg">Practice Information</CardTitle>
                <CardDescription>
                  Update your practice name, address, and contact details
                </CardDescription>
              </div>
            </div>
            {!isEditing && (
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(true)}
                aria-label="Edit practice information"
              >
                Edit
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Practice Name */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="practice-name" className="text-sm font-medium">
                Practice Name
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" aria-label="Help for practice name" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Enter your clinic or practice name as it appears on official documents</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <Input
                id="practice-name"
                value={formData.practice_name}
                onChange={(e) => handleInputChange('practice_name', e.target.value)}
                disabled={!isEditing}
                placeholder="Enter practice name"
                className="pl-10"
                aria-describedby="practice-name-desc"
              />
            </div>
          </div>

          {/* Address / State */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="state" className="text-sm font-medium">
                State / Location
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" aria-label="Help for state" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Enter your practice state or location for regional compliance</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                disabled={!isEditing}
                placeholder="e.g., Virginia"
                className="pl-10"
                aria-describedby="state-desc"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" aria-label="Help for phone" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Enter a 10-digit phone number for practice contact</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={!isEditing}
                placeholder="(555) 555-5555"
                className={`pl-10 ${errors.phone ? 'border-destructive' : ''}`}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : "phone-desc"}
              />
            </div>
            {errors.phone && (
              <p id="phone-error" className="text-sm text-destructive flex items-center gap-1" role="alert">
                <AlertCircle className="h-3 w-3" aria-hidden="true" />
                {errors.phone}
              </p>
            )}
          </div>

          {/* NPI Number */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="npi" className="text-sm font-medium">
                NPI Number
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" aria-label="Help for NPI" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Your National Provider Identifier (10-digit number)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="relative">
              <Printer className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <Input
                id="npi"
                value={formData.npi_number}
                onChange={(e) => handleInputChange('npi_number', e.target.value)}
                disabled={!isEditing}
                placeholder="Enter NPI number"
                className="pl-10"
                aria-describedby="npi-desc"
              />
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
              <Button 
                variant="outline" 
                onClick={handleCancel}
                disabled={isSaving}
                aria-label="Cancel changes"
              >
                <X className="mr-2 h-4 w-4" aria-hidden="true" />
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                disabled={isSaving || !hasChanges}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                aria-label="Save practice information"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" aria-hidden="true" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Success message for screen readers */}
      <div aria-live="polite" aria-atomic="true" className="sr-only" />
    </div>
  );
};
