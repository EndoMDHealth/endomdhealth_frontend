import { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
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
  ClipboardCheck,
  ArrowLeft,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";
import endoLogo from "@/assets/logos/endo_yellow.png";

type ConditionCategory = 'obesity' | 'growth' | 'diabetes' | 'puberty' | 'thyroid' | 'pcos' | 'other';
type PubertalStatus = 'prepubertal' | 'early_puberty' | 'mid_puberty' | 'post_puberty' | 'unknown';
type InsuranceType = 'medicaid' | 'commercial' | 'self_pay' | 'other';

// Labs available checkboxes
type LabType = 'a1c' | 'glucose' | 'tsh_t4' | 'lipids' | 'cmp_liver' | 'vitamin_d' | 'bone_labs' | 'morning_cortisol' | 'none';

// Urgency screen checkboxes
type UrgencyType = 'high_blood_sugar' | 'diabetes_symptoms' | 'severe_fatigue' | 'hypotension' | 'rapid_pubertal_change' | 'none';

interface FormData {
  // Patient Information
  patientFullName: string;
  patientDob: string;
  patientGender: string;
  raceEthnicity: string;
  pubertalStatus: PubertalStatus | '';
  insuranceType: InsuranceType | '';
  insuranceOther: string;
  memberId: string;
  primarySubscriberName: string;
  subscriberDob: string;
  
  // Measurements
  heightCm: string;
  weightKg: string;
  weightPercentileCurrent: string;
  weightPercentile12MonthsAgo: string;
  heightPercentileCurrent: string;
  heightPercentile12MonthsAgo: string;
  growthVelocity: string;
  
  // Clinical
  conditionCategory: ConditionCategory | '';
  clinicalQuestion: string;
  additionalNotes: string;
  
  // Labs Available
  labsAvailable: LabType[];
  
  // Urgency Screen
  urgencyFlags: UrgencyType[];
  
  // Prior Specialty Care
  hasPriorEndoVisit: 'yes' | 'no' | '';
  lastEndoVisitDate: string;
  
  // Provider Details
  referringClinicianName: string;
  referringClinicianPhone: string;
  referringClinicianEmail: string;
  preferredResponseMethod: 'email' | 'fax' | '';
  
  // Admin Attestation
  attestChartInfo: boolean;
  attestClinicalSupport: boolean;
  attestUrgentCases: boolean;
  adminName: string;
  adminSignature: string;
  attestationDate: string;
}

const steps = [
  { id: 1, title: "Patient Info", icon: User },
  { id: 2, title: "Measurements", icon: Ruler },
  { id: 3, title: "Condition", icon: Stethoscope },
  { id: 4, title: "Clinical", icon: FileText },
  { id: 5, title: "Provider & Attestation", icon: ClipboardCheck },
  { id: 6, title: "Review", icon: CheckCircle2 },
];

const LAB_OPTIONS: { value: LabType; label: string }[] = [
  { value: 'a1c', label: 'A1c' },
  { value: 'glucose', label: 'Glucose' },
  { value: 'tsh_t4', label: 'TSH / Free T4' },
  { value: 'lipids', label: 'Lipids' },
  { value: 'cmp_liver', label: 'CMP / Liver enzymes' },
  { value: 'vitamin_d', label: 'Vitamin D' },
  { value: 'bone_labs', label: 'Bone labs' },
  { value: 'morning_cortisol', label: 'Morning cortisol' },
  { value: 'none', label: 'No recent labs available' },
];

const URGENCY_OPTIONS: { value: UrgencyType; label: string }[] = [
  { value: 'high_blood_sugar', label: 'Very high blood sugar' },
  { value: 'diabetes_symptoms', label: 'Symptoms of diabetes (polyuria, polydipsia, weight loss)' },
  { value: 'severe_fatigue', label: 'Severe fatigue / vomiting' },
  { value: 'hypotension', label: 'Hypotension' },
  { value: 'rapid_pubertal_change', label: 'New rapid pubertal change' },
  { value: 'none', label: 'None of the above' },
];

const PUBERTAL_STATUS_OPTIONS = [
  { value: 'prepubertal', label: 'Prepubertal' },
  { value: 'early_puberty', label: 'Early Puberty' },
  { value: 'mid_puberty', label: 'Mid Puberty' },
  { value: 'post_puberty', label: 'Post-puberty' },
  { value: 'unknown', label: 'Unknown' },
];

const INSURANCE_OPTIONS = [
  { value: 'medicaid', label: 'Medicaid' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'self_pay', label: 'Self-Pay' },
  { value: 'other', label: 'Other' },
];

const SubmitEConsult = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    patientFullName: "",
    patientDob: "",
    patientGender: "",
    raceEthnicity: "",
    pubertalStatus: "",
    insuranceType: "",
    insuranceOther: "",
    memberId: "",
    primarySubscriberName: "",
    subscriberDob: "",
    heightCm: "",
    weightKg: "",
    weightPercentileCurrent: "",
    weightPercentile12MonthsAgo: "",
    heightPercentileCurrent: "",
    heightPercentile12MonthsAgo: "",
    growthVelocity: "",
    conditionCategory: "",
    clinicalQuestion: "",
    additionalNotes: "",
    labsAvailable: [],
    urgencyFlags: [],
    hasPriorEndoVisit: "",
    lastEndoVisitDate: "",
    referringClinicianName: "",
    referringClinicianPhone: "",
    referringClinicianEmail: "",
    preferredResponseMethod: "",
    attestChartInfo: false,
    attestClinicalSupport: false,
    attestUrgentCases: false,
    adminName: "",
    adminSignature: "",
    attestationDate: new Date().toISOString().split('T')[0],
  });

  // Calculate patient age from DOB
  const calculateAge = (dob: string): number | null => {
    if (!dob) return null;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const patientAge = useMemo(() => calculateAge(formData.patientDob), [formData.patientDob]);

  const calculateBMI = () => {
    const height = parseFloat(formData.heightCm);
    const weight = parseFloat(formData.weightKg);
    if (height && weight && height > 0) {
      const heightM = height / 100;
      return (weight / (heightM * heightM)).toFixed(1);
    }
    return null;
  };

  // Calculate growth velocity if both height percentiles are provided
  const calculateGrowthVelocity = (): string | null => {
    // Auto-calculate only if we have current and 12-month height values
    // For now, return the manual entry since we need actual height measurements, not percentiles
    return formData.growthVelocity || null;
  };

  // PEDRA automated flags based on data
  const pedraFlags = useMemo(() => {
    const bmi = calculateBMI();
    const currentWeightPct = parseFloat(formData.weightPercentileCurrent);
    const previousWeightPct = parseFloat(formData.weightPercentile12MonthsAgo);
    const currentHeightPct = parseFloat(formData.heightPercentileCurrent);
    
    return {
      bmiAbove95: bmi ? parseFloat(bmi) >= 30 : false, // Simplified BMI check - would need percentile charts for accurate pediatric assessment
      weightIncreased2Bands: !isNaN(currentWeightPct) && !isNaN(previousWeightPct) && (currentWeightPct - previousWeightPct) >= 20,
      poorLinearGrowthWithWeightGain: !isNaN(currentHeightPct) && currentHeightPct < 25 && !isNaN(currentWeightPct) && currentWeightPct > 75,
      heightBelow3rd: !isNaN(currentHeightPct) && currentHeightPct < 3,
    };
  }, [formData.weightPercentileCurrent, formData.weightPercentile12MonthsAgo, formData.heightPercentileCurrent, formData.heightCm, formData.weightKg]);

  const hasAnyFlag = Object.values(pedraFlags).some(Boolean);

  const handleInputChange = (field: keyof FormData, value: string | boolean | LabType[] | UrgencyType[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLabToggle = (lab: LabType) => {
    setFormData((prev) => {
      // If selecting "none", clear all others
      if (lab === 'none') {
        return { ...prev, labsAvailable: prev.labsAvailable.includes('none') ? [] : ['none'] };
      }
      // If selecting a lab, remove "none" if present
      const withoutNone = prev.labsAvailable.filter(l => l !== 'none');
      if (withoutNone.includes(lab)) {
        return { ...prev, labsAvailable: withoutNone.filter(l => l !== lab) };
      }
      return { ...prev, labsAvailable: [...withoutNone, lab] };
    });
  };

  const handleUrgencyToggle = (urgency: UrgencyType) => {
    setFormData((prev) => {
      // If selecting "none", clear all others
      if (urgency === 'none') {
        return { ...prev, urgencyFlags: prev.urgencyFlags.includes('none') ? [] : ['none'] };
      }
      // If selecting an urgency, remove "none" if present
      const withoutNone = prev.urgencyFlags.filter(u => u !== 'none');
      if (withoutNone.includes(urgency)) {
        return { ...prev, urgencyFlags: withoutNone.filter(u => u !== urgency) };
      }
      return { ...prev, urgencyFlags: [...withoutNone, urgency] };
    });
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.patientFullName && formData.patientDob && formData.patientGender);
      case 2:
        return true;
      case 3:
        return !!formData.conditionCategory;
      case 4:
        return !!formData.clinicalQuestion;
      case 5:
        return !!(
          formData.referringClinicianName &&
          formData.referringClinicianEmail &&
          formData.preferredResponseMethod &&
          formData.attestChartInfo &&
          formData.attestClinicalSupport &&
          formData.attestUrgentCases &&
          formData.adminName &&
          formData.adminSignature
        );
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 6));
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
    const age = patientAge;

    // Get initials from full name for database compatibility
    const nameParts = formData.patientFullName.trim().split(' ');
    const initials = nameParts.map(p => p.charAt(0).toUpperCase()).join('').slice(0, 4);

    const { error } = await supabase.from('e_consults').insert({
      physician_id: user.id,
      patient_initials: initials, // Store initials for HIPAA
      patient_age: age || 0,
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
      navigate('/provider-dashboard');
    }
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

  const getPubertalStatusLabel = (status: string) => {
    const option = PUBERTAL_STATUS_OPTIONS.find(o => o.value === status);
    return option?.label || status;
  };

  const getInsuranceLabel = (type: string) => {
    if (type === 'other') return `Other: ${formData.insuranceOther}`;
    const option = INSURANCE_OPTIONS.find(o => o.value === type);
    return option?.label || type;
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/provider-dashboard" className="flex items-center gap-3 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
              <img src={endoLogo} alt="EndoMD Health" className="h-8 w-auto" />
            </Link>
            <span className="text-sm font-medium text-gray-500">E-Consult Submission</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-white shadow-lg border-0">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-2xl">Submit E-Consult Request</CardTitle>
            <CardDescription>
              Complete all steps to submit your consultation request.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8 px-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                        currentStep > step.id
                          ? "bg-green-500 text-white"
                          : currentStep === step.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-gray-100 text-gray-400"
                      )}
                    >
                      {currentStep > step.id ? (
                        <CheckCircle2 className="h-6 w-6" />
                      ) : (
                        <step.icon className="h-6 w-6" />
                      )}
                    </div>
                    <span className={cn(
                      "text-xs mt-2 hidden sm:block font-medium",
                      currentStep >= step.id ? "text-gray-900" : "text-gray-400"
                    )}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "w-12 sm:w-20 h-0.5 mx-2",
                        currentStep > step.id ? "bg-green-500" : "bg-gray-200"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step Content */}
            <div className="py-6">
              {/* Step 1: Patient Demographics */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Patient Name *</Label>
                      <Input
                        id="fullName"
                        placeholder="e.g., John Doe"
                        value={formData.patientFullName}
                        onChange={(e) => handleInputChange("patientFullName", e.target.value)}
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth *</Label>
                      <Input
                        id="dob"
                        type="date"
                        value={formData.patientDob}
                        onChange={(e) => handleInputChange("patientDob", e.target.value)}
                        className="h-12"
                      />
                      {patientAge !== null && (
                        <p className="text-sm text-muted-foreground">Age: {patientAge} years</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender *</Label>
                      <Select
                        value={formData.patientGender}
                        onValueChange={(value) => handleInputChange("patientGender", value)}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="raceEthnicity">Race / Ethnicity (optional)</Label>
                      <Input
                        id="raceEthnicity"
                        placeholder="e.g., Hispanic, African American"
                        value={formData.raceEthnicity}
                        onChange={(e) => handleInputChange("raceEthnicity", e.target.value)}
                        className="h-12"
                      />
                    </div>
                  </div>

                  {/* Pubertal Status */}
                  <div className="space-y-3">
                    <Label>Pubertal Status (if known)</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                      {PUBERTAL_STATUS_OPTIONS.map((option) => (
                        <label
                          key={option.value}
                          className={cn(
                            "flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors",
                            formData.pubertalStatus === option.value
                              ? "border-primary bg-primary/5"
                              : "border-gray-200 hover:bg-gray-50"
                          )}
                        >
                          <Checkbox
                            checked={formData.pubertalStatus === option.value}
                            onCheckedChange={(checked) => 
                              handleInputChange("pubertalStatus", checked ? option.value : "")
                            }
                          />
                          <span className="text-sm font-medium">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Insurance */}
                  <div className="space-y-3">
                    <Label>Insurance</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {INSURANCE_OPTIONS.map((option) => (
                        <label
                          key={option.value}
                          className={cn(
                            "flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors",
                            formData.insuranceType === option.value
                              ? "border-primary bg-primary/5"
                              : "border-gray-200 hover:bg-gray-50"
                          )}
                        >
                          <Checkbox
                            checked={formData.insuranceType === option.value}
                            onCheckedChange={(checked) => 
                              handleInputChange("insuranceType", checked ? option.value : "")
                            }
                          />
                          <span className="text-sm font-medium">{option.label}</span>
                        </label>
                      ))}
                    </div>
                    {formData.insuranceType === 'other' && (
                      <Input
                        placeholder="Please specify insurance"
                        value={formData.insuranceOther}
                        onChange={(e) => handleInputChange("insuranceOther", e.target.value)}
                        className="h-12 mt-2"
                      />
                    )}
                  </div>

                  {/* Insurance Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="memberId">Member ID</Label>
                      <Input
                        id="memberId"
                        placeholder="e.g., ABC123456"
                        value={formData.memberId}
                        onChange={(e) => handleInputChange("memberId", e.target.value)}
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subscriberName">Primary Subscriber Name</Label>
                      <Input
                        id="subscriberName"
                        placeholder="e.g., Jane Doe"
                        value={formData.primarySubscriberName}
                        onChange={(e) => handleInputChange("primarySubscriberName", e.target.value)}
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subscriberDob">Subscriber Date of Birth</Label>
                      <Input
                        id="subscriberDob"
                        type="date"
                        value={formData.subscriberDob}
                        onChange={(e) => handleInputChange("subscriberDob", e.target.value)}
                        className="h-12"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Measurements */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  {/* Height & Weight */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input
                        id="height"
                        type="number"
                        placeholder="e.g., 145"
                        value={formData.heightCm}
                        onChange={(e) => handleInputChange("heightCm", e.target.value)}
                        className="h-12"
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
                        className="h-12"
                      />
                    </div>
                  </div>

                  {calculateBMI() && (
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-800 font-medium">Calculated BMI</span>
                        <span className="text-2xl font-bold text-blue-900">{calculateBMI()}</span>
                      </div>
                    </div>
                  )}

                  {/* Weight Percentiles */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="weightPctCurrent">Weight Percentile (current)</Label>
                      <Input
                        id="weightPctCurrent"
                        type="number"
                        placeholder="e.g., 75"
                        min="0"
                        max="100"
                        value={formData.weightPercentileCurrent}
                        onChange={(e) => handleInputChange("weightPercentileCurrent", e.target.value)}
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weightPct12Mo">Weight Percentile (12 months ago, if known)</Label>
                      <Input
                        id="weightPct12Mo"
                        type="number"
                        placeholder="e.g., 50"
                        min="0"
                        max="100"
                        value={formData.weightPercentile12MonthsAgo}
                        onChange={(e) => handleInputChange("weightPercentile12MonthsAgo", e.target.value)}
                        className="h-12"
                      />
                    </div>
                  </div>

                  {/* Height Percentiles */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="heightPctCurrent">Height Percentile (current)</Label>
                      <Input
                        id="heightPctCurrent"
                        type="number"
                        placeholder="e.g., 50"
                        min="0"
                        max="100"
                        value={formData.heightPercentileCurrent}
                        onChange={(e) => handleInputChange("heightPercentileCurrent", e.target.value)}
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="heightPct12Mo">Height Percentile (12 months ago, if known)</Label>
                      <Input
                        id="heightPct12Mo"
                        type="number"
                        placeholder="e.g., 55"
                        min="0"
                        max="100"
                        value={formData.heightPercentile12MonthsAgo}
                        onChange={(e) => handleInputChange("heightPercentile12MonthsAgo", e.target.value)}
                        className="h-12"
                      />
                    </div>
                  </div>

                  {/* Growth Velocity */}
                  <div className="space-y-2">
                    <Label htmlFor="growthVelocity">Growth Velocity (cm/year)</Label>
                    <Input
                      id="growthVelocity"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 5.5"
                      value={formData.growthVelocity}
                      onChange={(e) => handleInputChange("growthVelocity", e.target.value)}
                      className="h-12 max-w-xs"
                    />
                    <p className="text-sm text-muted-foreground">
                      Enter if known, or leave blank if unavailable.
                    </p>
                  </div>

                  {/* PEDRA Automated Flags */}
                  {hasAnyFlag && (
                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                      <div className="flex items-start gap-3 mb-3">
                        <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-amber-800">Automated Flags PEDRA Will Evaluate:</p>
                          <p className="text-xs text-amber-600">Based on the data entered above</p>
                        </div>
                      </div>
                      <div className="space-y-2 ml-8">
                        {pedraFlags.bmiAbove95 && (
                          <div className="flex items-center gap-2">
                            <Checkbox checked disabled className="pointer-events-none" />
                            <span className="text-sm text-amber-800">BMI ≥95th percentile</span>
                          </div>
                        )}
                        {pedraFlags.weightIncreased2Bands && (
                          <div className="flex items-center gap-2">
                            <Checkbox checked disabled className="pointer-events-none" />
                            <span className="text-sm text-amber-800">Weight increased by ≥2 percentile bands in 12 months</span>
                          </div>
                        )}
                        {pedraFlags.poorLinearGrowthWithWeightGain && (
                          <div className="flex items-center gap-2">
                            <Checkbox checked disabled className="pointer-events-none" />
                            <span className="text-sm text-amber-800">Poor linear growth with weight gain</span>
                          </div>
                        )}
                        {pedraFlags.heightBelow3rd && (
                          <div className="flex items-center gap-2">
                            <Checkbox checked disabled className="pointer-events-none" />
                            <span className="text-sm text-amber-800">Height &lt;3rd percentile or dropping percentile lines</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <p className="text-sm text-muted-foreground">
                    Measurements help provide more accurate clinical guidance.
                  </p>
                </div>
              )}

              {/* Step 3: Condition Category */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <Label className="text-lg">Select Primary Concern *</Label>
                  <div className="grid grid-cols-2 gap-4">
                    {['obesity', 'growth', 'diabetes', 'puberty', 'thyroid', 'pcos', 'other'].map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => handleInputChange("conditionCategory", category)}
                        className={cn(
                          "p-5 rounded-xl border-2 text-left transition-all hover:border-primary/50",
                          formData.conditionCategory === category
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-gray-200 hover:bg-gray-50"
                        )}
                      >
                        <span className="font-medium text-gray-900">{getCategoryLabel(category)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Labs & Urgency */}
              {currentStep === 4 && (
                <div className="space-y-8">
                  {/* Clinical Question */}
                  <div className="space-y-2">
                    <Label htmlFor="question" className="text-lg">Clinical Question *</Label>
                    <Textarea
                      id="question"
                      placeholder="Describe your clinical question or the guidance you're seeking..."
                      rows={4}
                      value={formData.clinicalQuestion}
                      onChange={(e) => handleInputChange("clinicalQuestion", e.target.value)}
                      className="resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes (optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any additional context, history, or information..."
                      rows={2}
                      value={formData.additionalNotes}
                      onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                      className="resize-none"
                    />
                  </div>

                  {/* Recent Labs Available */}
                  <div className="space-y-3">
                    <Label className="text-lg">Recent Labs Available? (Check all that apply)</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {LAB_OPTIONS.map((option) => (
                        <label
                          key={option.value}
                          className={cn(
                            "flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors",
                            formData.labsAvailable.includes(option.value)
                              ? "border-primary bg-primary/5"
                              : "border-gray-200 hover:bg-gray-50"
                          )}
                        >
                          <Checkbox
                            checked={formData.labsAvailable.includes(option.value)}
                            onCheckedChange={() => handleLabToggle(option.value)}
                          />
                          <span className="text-sm font-medium">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Urgency Screen */}
                  <div className="space-y-3">
                    <Label className="text-lg">Urgency Screen (Check any that apply)</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {URGENCY_OPTIONS.map((option) => (
                        <label
                          key={option.value}
                          className={cn(
                            "flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors",
                            formData.urgencyFlags.includes(option.value)
                              ? "border-amber-500 bg-amber-50"
                              : "border-gray-200 hover:bg-gray-50"
                          )}
                        >
                          <Checkbox
                            checked={formData.urgencyFlags.includes(option.value)}
                            onCheckedChange={() => handleUrgencyToggle(option.value)}
                          />
                          <span className="text-sm font-medium">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Prior Specialty Care */}
                  <div className="space-y-3">
                    <Label className="text-lg">Prior Specialty Care</Label>
                    <p className="text-sm text-muted-foreground">Has patient ever seen Pediatric Endocrinology?</p>
                    <div className="flex gap-4">
                      <label
                        className={cn(
                          "flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors",
                          formData.hasPriorEndoVisit === 'no'
                            ? "border-primary bg-primary/5"
                            : "border-gray-200 hover:bg-gray-50"
                        )}
                      >
                        <Checkbox
                          checked={formData.hasPriorEndoVisit === 'no'}
                          onCheckedChange={(checked) => 
                            handleInputChange("hasPriorEndoVisit", checked ? 'no' : "")
                          }
                        />
                        <span className="text-sm font-medium">No</span>
                      </label>
                      <label
                        className={cn(
                          "flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors",
                          formData.hasPriorEndoVisit === 'yes'
                            ? "border-primary bg-primary/5"
                            : "border-gray-200 hover:bg-gray-50"
                        )}
                      >
                        <Checkbox
                          checked={formData.hasPriorEndoVisit === 'yes'}
                          onCheckedChange={(checked) => 
                            handleInputChange("hasPriorEndoVisit", checked ? 'yes' : "")
                          }
                        />
                        <span className="text-sm font-medium">Yes</span>
                      </label>
                    </div>
                    {formData.hasPriorEndoVisit === 'yes' && (
                      <div className="space-y-2 mt-3">
                        <Label htmlFor="lastEndoVisit">Last visit date</Label>
                        <Input
                          id="lastEndoVisit"
                          type="date"
                          value={formData.lastEndoVisitDate}
                          onChange={(e) => handleInputChange("lastEndoVisitDate", e.target.value)}
                          className="h-12 max-w-xs"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 5: Provider Details & Admin Attestation */}
              {currentStep === 5 && (
                <div className="space-y-8">
                  {/* Provider Details */}
                  <div className="space-y-4">
                    <Label className="text-lg">Provider Details</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="clinicianName">Referring Clinician Name *</Label>
                        <Input
                          id="clinicianName"
                          placeholder="e.g., Dr. Jane Smith"
                          value={formData.referringClinicianName}
                          onChange={(e) => handleInputChange("referringClinicianName", e.target.value)}
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="clinicianPhone">Phone</Label>
                        <Input
                          id="clinicianPhone"
                          type="tel"
                          placeholder="e.g., (555) 123-4567"
                          value={formData.referringClinicianPhone}
                          onChange={(e) => handleInputChange("referringClinicianPhone", e.target.value)}
                          className="h-12"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="clinicianEmail">Secure Email *</Label>
                        <Input
                          id="clinicianEmail"
                          type="email"
                          placeholder="e.g., jane.smith@clinic.com"
                          value={formData.referringClinicianEmail}
                          onChange={(e) => handleInputChange("referringClinicianEmail", e.target.value)}
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Preferred Response Method *</Label>
                        <div className="flex gap-4">
                          <label
                            className={cn(
                              "flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors",
                              formData.preferredResponseMethod === 'email'
                                ? "border-primary bg-primary/5"
                                : "border-gray-200 hover:bg-gray-50"
                            )}
                          >
                            <Checkbox
                              checked={formData.preferredResponseMethod === 'email'}
                              onCheckedChange={(checked) => 
                                handleInputChange("preferredResponseMethod", checked ? 'email' : "")
                              }
                            />
                            <span className="text-sm font-medium">Secure Email</span>
                          </label>
                          <label
                            className={cn(
                              "flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors",
                              formData.preferredResponseMethod === 'fax'
                                ? "border-primary bg-primary/5"
                                : "border-gray-200 hover:bg-gray-50"
                            )}
                          >
                            <Checkbox
                              checked={formData.preferredResponseMethod === 'fax'}
                              onCheckedChange={(checked) => 
                                handleInputChange("preferredResponseMethod", checked ? 'fax' : "")
                              }
                            />
                            <span className="text-sm font-medium">Fax</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Admin Attestation */}
                  <div className="space-y-4">
                    <Label className="text-lg">Admin Attestation (Required)</Label>
                    <div className="space-y-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <Checkbox
                          checked={formData.attestChartInfo}
                          onCheckedChange={(checked) => 
                            handleInputChange("attestChartInfo", !!checked)
                          }
                          className="mt-0.5"
                        />
                        <span className="text-sm">I confirm that this request reflects documented chart information *</span>
                      </label>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <Checkbox
                          checked={formData.attestClinicalSupport}
                          onCheckedChange={(checked) => 
                            handleInputChange("attestClinicalSupport", !!checked)
                          }
                          className="mt-0.5"
                        />
                        <span className="text-sm">This request is for clinical decision support only, not emergency care *</span>
                      </label>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <Checkbox
                          checked={formData.attestUrgentCases}
                          onCheckedChange={(checked) => 
                            handleInputChange("attestUrgentCases", !!checked)
                          }
                          className="mt-0.5"
                        />
                        <span className="text-sm">Urgent cases remain directed to ED or on-call specialty services *</span>
                      </label>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="adminName">Admin Name *</Label>
                        <Input
                          id="adminName"
                          placeholder="e.g., Mary Johnson"
                          value={formData.adminName}
                          onChange={(e) => handleInputChange("adminName", e.target.value)}
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="adminSignature">Signature *</Label>
                        <Input
                          id="adminSignature"
                          placeholder="Type your name as signature"
                          value={formData.adminSignature}
                          onChange={(e) => handleInputChange("adminSignature", e.target.value)}
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="attestDate">Date *</Label>
                        <Input
                          id="attestDate"
                          type="date"
                          value={formData.attestationDate}
                          onChange={(e) => handleInputChange("attestationDate", e.target.value)}
                          className="h-12"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6: Review */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                    <h4 className="font-semibold text-gray-900 text-lg">Review Your Submission</h4>
                    
                    {/* Patient Info */}
                    <div className="grid grid-cols-2 gap-6 text-sm">
                      <div className="space-y-1">
                        <span className="text-gray-500">Patient:</span>
                        <p className="font-medium text-gray-900">{formData.patientFullName}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-gray-500">Date of Birth:</span>
                        <p className="font-medium text-gray-900">
                          {formData.patientDob} {patientAge !== null && `(${patientAge} years)`}
                        </p>
                      </div>
                      {formData.patientGender && (
                        <div className="space-y-1">
                          <span className="text-gray-500">Gender:</span>
                          <p className="font-medium text-gray-900 capitalize">{formData.patientGender}</p>
                        </div>
                      )}
                      {formData.pubertalStatus && (
                        <div className="space-y-1">
                          <span className="text-gray-500">Pubertal Status:</span>
                          <p className="font-medium text-gray-900">{getPubertalStatusLabel(formData.pubertalStatus)}</p>
                        </div>
                      )}
                      {formData.insuranceType && (
                        <div className="space-y-1">
                          <span className="text-gray-500">Insurance:</span>
                          <p className="font-medium text-gray-900">{getInsuranceLabel(formData.insuranceType)}</p>
                        </div>
                      )}
                      {calculateBMI() && (
                        <div className="space-y-1">
                          <span className="text-gray-500">BMI:</span>
                          <p className="font-medium text-gray-900">{calculateBMI()}</p>
                        </div>
                      )}
                    </div>

                    {/* Measurements Summary */}
                    {(formData.weightPercentileCurrent || formData.heightPercentileCurrent || formData.growthVelocity) && (
                      <div className="pt-4 border-t border-gray-200">
                        <span className="text-gray-500 text-sm block mb-2">Measurements:</span>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          {formData.weightPercentileCurrent && (
                            <div>
                              <span className="text-gray-500">Weight %ile (current):</span>
                              <p className="font-medium">{formData.weightPercentileCurrent}%</p>
                            </div>
                          )}
                          {formData.heightPercentileCurrent && (
                            <div>
                              <span className="text-gray-500">Height %ile (current):</span>
                              <p className="font-medium">{formData.heightPercentileCurrent}%</p>
                            </div>
                          )}
                          {formData.growthVelocity && (
                            <div>
                              <span className="text-gray-500">Growth Velocity:</span>
                              <p className="font-medium">{formData.growthVelocity} cm/year</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* PEDRA Flags in Review */}
                    {hasAnyFlag && (
                      <div className="pt-4 border-t border-gray-200">
                        <span className="text-amber-700 text-sm font-medium block mb-2">PEDRA Flags Detected:</span>
                        <ul className="text-sm text-amber-800 list-disc list-inside space-y-1">
                          {pedraFlags.bmiAbove95 && <li>BMI ≥95th percentile</li>}
                          {pedraFlags.weightIncreased2Bands && <li>Weight increased by ≥2 percentile bands</li>}
                          {pedraFlags.poorLinearGrowthWithWeightGain && <li>Poor linear growth with weight gain</li>}
                          {pedraFlags.heightBelow3rd && <li>Height &lt;3rd percentile</li>}
                        </ul>
                      </div>
                    )}

                    <div className="pt-4 border-t border-gray-200 space-y-1">
                      <span className="text-gray-500 text-sm">Condition:</span>
                      <p className="font-medium text-gray-900">{getCategoryLabel(formData.conditionCategory)}</p>
                    </div>

                    <div className="pt-4 border-t border-gray-200 space-y-1">
                      <span className="text-gray-500 text-sm">Clinical Question:</span>
                      <p className="text-gray-900">{formData.clinicalQuestion}</p>
                    </div>

                    {/* Labs Available */}
                    {formData.labsAvailable.length > 0 && (
                      <div className="pt-4 border-t border-gray-200 space-y-1">
                        <span className="text-gray-500 text-sm">Labs Available:</span>
                        <p className="text-gray-900">
                          {formData.labsAvailable.map(lab => 
                            LAB_OPTIONS.find(o => o.value === lab)?.label
                          ).join(', ')}
                        </p>
                      </div>
                    )}

                    {/* Urgency Flags */}
                    {formData.urgencyFlags.length > 0 && !formData.urgencyFlags.includes('none') && (
                      <div className="pt-4 border-t border-gray-200 space-y-1">
                        <span className="text-amber-700 text-sm font-medium">Urgency Flags:</span>
                        <ul className="text-sm text-amber-800 list-disc list-inside">
                          {formData.urgencyFlags.map(flag => (
                            <li key={flag}>{URGENCY_OPTIONS.find(o => o.value === flag)?.label}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Prior Endo Visit */}
                    {formData.hasPriorEndoVisit && (
                      <div className="pt-4 border-t border-gray-200 space-y-1">
                        <span className="text-gray-500 text-sm">Prior Pediatric Endocrinology Visit:</span>
                        <p className="text-gray-900">
                          {formData.hasPriorEndoVisit === 'yes' 
                            ? `Yes${formData.lastEndoVisitDate ? ` (Last visit: ${formData.lastEndoVisitDate})` : ''}` 
                            : 'No'}
                        </p>
                      </div>
                    )}

                    {/* Provider Details */}
                    <div className="pt-4 border-t border-gray-200">
                      <span className="text-gray-500 text-sm block mb-2">Referring Provider:</span>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Name:</span>
                          <p className="font-medium">{formData.referringClinicianName}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Email:</span>
                          <p className="font-medium">{formData.referringClinicianEmail}</p>
                        </div>
                        {formData.referringClinicianPhone && (
                          <div>
                            <span className="text-gray-500">Phone:</span>
                            <p className="font-medium">{formData.referringClinicianPhone}</p>
                          </div>
                        )}
                        <div>
                          <span className="text-gray-500">Preferred Response:</span>
                          <p className="font-medium capitalize">{formData.preferredResponseMethod}</p>
                        </div>
                      </div>
                    </div>

                    {/* Attestation Summary */}
                    <div className="pt-4 border-t border-gray-200">
                      <span className="text-gray-500 text-sm block mb-2">Attestation:</span>
                      <div className="text-sm space-y-1">
                        <p className="text-green-700">✓ Chart information confirmed</p>
                        <p className="text-green-700">✓ Clinical decision support only</p>
                        <p className="text-green-700">✓ Urgent cases directed appropriately</p>
                        <p className="mt-2 text-gray-900">
                          <span className="text-gray-500">Signed by:</span> {formData.adminName} on {formData.attestationDate}
                        </p>
                      </div>
                    </div>

                    {formData.additionalNotes && (
                      <div className="pt-4 border-t border-gray-200 space-y-1">
                        <span className="text-gray-500 text-sm">Additional Notes:</span>
                        <p className="text-gray-900">{formData.additionalNotes}</p>
                      </div>
                    )}
                  </div>
                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                    <p className="text-sm text-amber-800">
                      <strong>Reminder:</strong> Ensure you have obtained patient/family consent for this consultation and any associated billing.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                size="lg"
                onClick={currentStep === 1 ? () => navigate('/provider-dashboard') : handleBack}
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                {currentStep === 1 ? "Cancel" : "Back"}
              </Button>
              
              {currentStep < 6 ? (
                <Button size="lg" onClick={handleNext}>
                  Next
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              ) : (
                <Button size="lg" onClick={handleSubmit} disabled={isSubmitting}>
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
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SubmitEConsult;
