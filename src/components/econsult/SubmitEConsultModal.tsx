import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  ChevronLeft, 
  ChevronRight, 
  Loader2, 
  Upload,
  CheckCircle2,
  User,
  Ruler,
  Stethoscope,
  FileText,
  ClipboardCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SubmitEConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

type ConditionCategory = 'obesity' | 'growth' | 'diabetes' | 'puberty' | 'thyroid' | 'pcos' | 'other';

interface FormData {
  patientInitials: string;
  patientAge: string;
  patientDob: string;
  patientGender: string;
  heightCm: string;
  weightKg: string;
  conditionCategory: ConditionCategory | '';
  clinicalQuestion: string;
  additionalNotes: string;
}

const steps = [
  { id: 1, title: "Patient Info", icon: User },
  { id: 2, title: "Measurements", icon: Ruler },
  { id: 3, title: "Condition", icon: Stethoscope },
  { id: 4, title: "Clinical Details", icon: FileText },
  { id: 5, title: "Review", icon: ClipboardCheck },
];

const SubmitEConsultModal = ({ isOpen, onClose, onSuccess }: SubmitEConsultModalProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    patientInitials: "",
    patientAge: "",
    patientDob: "",
    patientGender: "",
    heightCm: "",
    weightKg: "",
    conditionCategory: "",
    clinicalQuestion: "",
    additionalNotes: "",
  });

  const calculateBMI = () => {
    const height = parseFloat(formData.heightCm);
    const weight = parseFloat(formData.weightKg);
    if (height && weight && height > 0) {
      const heightM = height / 100;
      return (weight / (heightM * heightM)).toFixed(1);
    }
    return null;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.patientInitials && formData.patientAge);
      case 2:
        return true; // Optional
      case 3:
        return !!formData.conditionCategory;
      case 4:
        return !!formData.clinicalQuestion;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    } else {
      toast({
        title: "Required fields missing",
        description: "Please fill in all required fields before continuing.",
        variant: "destructive",
      });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!user) return;

    setIsSubmitting(true);
    const bmi = calculateBMI();

    const { error } = await supabase.from('e_consults').insert({
      physician_id: user.id,
      patient_initials: formData.patientInitials,
      patient_age: parseInt(formData.patientAge),
      patient_dob: formData.patientDob || null,
      patient_gender: formData.patientGender || null,
      height_cm: formData.heightCm ? parseFloat(formData.heightCm) : null,
      weight_kg: formData.weightKg ? parseFloat(formData.weightKg) : null,
      bmi: bmi ? parseFloat(bmi) : null,
      condition_category: formData.conditionCategory as ConditionCategory,
      clinical_question: formData.clinicalQuestion,
      additional_notes: formData.additionalNotes || null,
      status: 'submitted',
    });

    setIsSubmitting(false);

    if (error) {
      console.error('Error submitting e-consult:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your e-consult. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "E-Consult Submitted",
        description: "Your consultation request has been submitted successfully.",
      });
      // Reset form
      setFormData({
        patientInitials: "",
        patientAge: "",
        patientDob: "",
        patientGender: "",
        heightCm: "",
        weightKg: "",
        conditionCategory: "",
        clinicalQuestion: "",
        additionalNotes: "",
      });
      setCurrentStep(1);
      onSuccess();
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    onClose();
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      obesity: "Obesity / Weight Management",
      growth: "Growth Problems / Short Stature",
      diabetes: "Diabetes / Blood Sugar",
      puberty: "Puberty Concerns",
      thyroid: "Thyroid Disorders",
      pcos: "PCOS",
      other: "Other Endocrine",
    };
    return labels[category] || category;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Submit E-Consult Request</DialogTitle>
          <DialogDescription>
            Complete all steps to submit your consultation request.
          </DialogDescription>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-6 px-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                    currentStep > step.id
                      ? "bg-green-500 text-white"
                      : currentStep === step.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-gray-100 text-gray-400"
                  )}
                >
                  {currentStep > step.id ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                <span className={cn(
                  "text-xs mt-1 hidden sm:block",
                  currentStep >= step.id ? "text-gray-900" : "text-gray-400"
                )}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-8 sm:w-12 h-0.5 mx-2",
                    currentStep > step.id ? "bg-green-500" : "bg-gray-200"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="py-4">
          {/* Step 1: Patient Demographics */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="initials">Patient Initials *</Label>
                  <Input
                    id="initials"
                    placeholder="e.g., JD"
                    value={formData.patientInitials}
                    onChange={(e) => handleInputChange("patientInitials", e.target.value.toUpperCase())}
                    maxLength={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Patient Age (years) *</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="e.g., 12"
                    min="0"
                    max="21"
                    value={formData.patientAge}
                    onChange={(e) => handleInputChange("patientAge", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth (optional)</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={formData.patientDob}
                    onChange={(e) => handleInputChange("patientDob", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender (optional)</Label>
                  <Select
                    value={formData.patientGender}
                    onValueChange={(value) => handleInputChange("patientGender", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Measurements */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="e.g., 145"
                    value={formData.heightCm}
                    onChange={(e) => handleInputChange("heightCm", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="e.g., 40"
                    value={formData.weightKg}
                    onChange={(e) => handleInputChange("weightKg", e.target.value)}
                  />
                </div>
              </div>
              {calculateBMI() && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-800 font-medium">Calculated BMI</span>
                    <span className="text-2xl font-bold text-blue-900">{calculateBMI()}</span>
                  </div>
                </div>
              )}
              <p className="text-sm text-muted-foreground">
                Measurements are optional but help provide more accurate guidance.
              </p>
            </div>
          )}

          {/* Step 3: Condition Category */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <Label>Select Primary Concern *</Label>
              <div className="grid grid-cols-2 gap-3">
                {['obesity', 'growth', 'diabetes', 'puberty', 'thyroid', 'pcos', 'other'].map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleInputChange("conditionCategory", category)}
                    className={cn(
                      "p-4 rounded-lg border-2 text-left transition-all hover:border-primary/50",
                      formData.conditionCategory === category
                        ? "border-primary bg-primary/5"
                        : "border-gray-200"
                    )}
                  >
                    <span className="font-medium">{getCategoryLabel(category)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Clinical Question */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="question">Clinical Question *</Label>
                <Textarea
                  id="question"
                  placeholder="Describe your clinical question or the guidance you're seeking..."
                  rows={4}
                  value={formData.clinicalQuestion}
                  onChange={(e) => handleInputChange("clinicalQuestion", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes (optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional context, history, or information..."
                  rows={3}
                  value={formData.additionalNotes}
                  onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                />
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start gap-3">
                  <Upload className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Lab & Document Upload</p>
                    <p className="text-xs text-gray-500">
                      File upload feature coming soon. For now, include relevant lab values in your notes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-gray-900">Review Your Submission</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Patient:</span>
                    <span className="ml-2 font-medium">{formData.patientInitials}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Age:</span>
                    <span className="ml-2 font-medium">{formData.patientAge} years</span>
                  </div>
                  {formData.patientGender && (
                    <div>
                      <span className="text-gray-500">Gender:</span>
                      <span className="ml-2 font-medium capitalize">{formData.patientGender}</span>
                    </div>
                  )}
                  {calculateBMI() && (
                    <div>
                      <span className="text-gray-500">BMI:</span>
                      <span className="ml-2 font-medium">{calculateBMI()}</span>
                    </div>
                  )}
                  <div className="col-span-2">
                    <span className="text-gray-500">Condition:</span>
                    <span className="ml-2 font-medium">{getCategoryLabel(formData.conditionCategory)}</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <span className="text-gray-500 text-sm">Clinical Question:</span>
                  <p className="mt-1 text-sm text-gray-900">{formData.clinicalQuestion}</p>
                </div>
                {formData.additionalNotes && (
                  <div className="pt-3 border-t border-gray-200">
                    <span className="text-gray-500 text-sm">Additional Notes:</span>
                    <p className="mt-1 text-sm text-gray-900">{formData.additionalNotes}</p>
                  </div>
                )}
              </div>
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-800">
                  <strong>Reminder:</strong> Ensure you have obtained patient/family consent for this consultation and any associated billing.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={currentStep === 1 ? handleClose : handleBack}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            {currentStep === 1 ? "Cancel" : "Back"}
          </Button>
          
          {currentStep < 5 ? (
            <Button onClick={handleNext}>
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Submit E-Consult
                </>
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitEConsultModal;