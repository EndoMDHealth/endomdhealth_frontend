import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  ArrowLeft, 
  User, 
  Calendar, 
  FileText,
  Send,
  Save,
  Upload,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Search,
  Video,
  Building2,
  Eye,
  FlaskConical,
  UserPlus,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

type EConsultStatus = 'submitted' | 'under_review' | 'awaiting_info' | 'completed';
type ConditionCategory = 'obesity' | 'growth' | 'diabetes' | 'puberty' | 'thyroid' | 'pcos' | 'other';
type NextStepOption = 'schedule_virtual_visit' | 'schedule_in_person_visit' | 'continue_monitoring' | 'obtain_further_labs' | 'refer_different_specialty';

// Backend API URL - update this with your actual backend URL
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

interface EConsult {
  id: string;
  patient_initials: string;
  patient_age: number;
  patient_dob?: string;
  patient_gender?: string;
  height_cm?: number;
  weight_kg?: number;
  bmi?: number;
  condition_category: ConditionCategory;
  status: EConsultStatus;
  created_at: string;
  clinical_question: string;
  additional_notes?: string;
  response_notes?: string;
  responded_at?: string;
  physician_name?: string;
  next_step?: NextStepOption | null;
}

const NEXT_STEP_OPTIONS: { value: NextStepOption; label: string; icon: typeof Video }[] = [
  { value: 'schedule_virtual_visit', label: 'Schedule a virtual visit', icon: Video },
  { value: 'schedule_in_person_visit', label: 'Schedule an in-person visit', icon: Building2 },
  { value: 'continue_monitoring', label: 'Continue monitoring', icon: Eye },
  { value: 'obtain_further_labs', label: 'Obtain further labs', icon: FlaskConical },
  { value: 'refer_different_specialty', label: 'Refer to a different specialty', icon: UserPlus },
];

interface SpecialistDetailViewProps {
  consult: EConsult;
  onBack: () => void;
  onSubmitResponse: (consultId: string, response: string) => Promise<void>;
  onSaveDraft: (consultId: string, draft: string) => Promise<void>;
}

const getStatusBadge = (status: EConsultStatus) => {
  const statusConfig = {
    submitted: { 
      label: 'New Request', 
      icon: Clock,
      className: 'bg-blue-500 text-white' 
    },
    under_review: { 
      label: 'In Progress', 
      icon: FileText,
      className: 'bg-amber-500 text-white' 
    },
    awaiting_info: { 
      label: 'Awaiting Info', 
      icon: AlertCircle,
      className: 'border-orange-500 text-orange-600 bg-orange-50' 
    },
    completed: { 
      label: 'Completed', 
      icon: CheckCircle2,
      className: 'bg-[hsl(187,60%,50%)] text-white' 
    },
  };
  
  const config = statusConfig[status];
  const Icon = config.icon;
  
  return (
    <Badge className={config.className}>
      <Icon className="h-3 w-3 mr-1" />
      {config.label}
    </Badge>
  );
};

const getCategoryLabel = (category: ConditionCategory) => {
  const labels: Record<ConditionCategory, string> = {
    obesity: 'Obesity / Weight Management',
    growth: 'Growth Concerns',
    diabetes: 'Diabetes',
    puberty: 'Puberty',
    thyroid: 'Thyroid Disorders',
    pcos: 'PCOS',
    other: 'Other',
  };
  return labels[category];
};

const formatHeightInFeetAndInches = (totalInches: number): string => {
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return `${feet}' ${inches}"`;
};

export const SpecialistDetailView = ({ 
  consult, 
  onBack,
  onSubmitResponse,
  onSaveDraft,
}: SpecialistDetailViewProps) => {
  const { session } = useAuth();
  const [response, setResponse] = useState(String(consult.response_notes || ""));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [selectedNextStep, setSelectedNextStep] = useState<NextStepOption | null>(consult.next_step || null);
  const [isSavingNextStep, setIsSavingNextStep] = useState(false);
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const usedAIRef = useRef(false);

  const handleNextStepSelect = async (value: NextStepOption) => {
    const newValue = selectedNextStep === value ? null : value;
    setSelectedNextStep(newValue);
    setIsSavingNextStep(true);
    
    try {
      const { error } = await supabase
        .from('e_consults')
        .update({ next_step: newValue })
        .eq('id', consult.id);
      
      if (error) throw error;
      toast.success(newValue ? "Next step saved" : "Next step cleared");
    } catch (error) {
      toast.error("Failed to save next step");
      setSelectedNextStep(consult.next_step || null);
    }
    setIsSavingNextStep(false);
  };

  const handleSubmitResponse = async () => {
    const responseText = String(response);
    if (!responseText.trim()) {
      toast.error("Please enter a response before submitting");
      return;
    }
    
    setIsSubmitting(true);
    try {
      await onSubmitResponse(consult.id, responseText);
      toast.success("Response submitted successfully");

      // Only send feedback if AI was actually used
      if (usedAIRef.current) {
        handleProcessFeedBack();
      }
    } catch (error) {
      toast.error("Failed to submit response");
    }
    setIsSubmitting(false);
  };

  const handleSaveDraft = async () => {
    setIsSavingDraft(true);
    try {
      await onSaveDraft(consult.id, String(response));
      toast.success("Draft saved");
    } catch (error) {
      toast.error("Failed to save draft");
    }
    setIsSavingDraft(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const handleProcessEConsult = async () => {
    if (!session) {
      toast.error('❌ Please login first');
      return;
    }

    setIsProcessingAI(true);
    toast.info('Processing e-consult with AI...');

    try {
      const apiResponse = await fetch(`${BACKEND_URL}/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          e_consult_id: consult.id
        }),
      });

      const data = await apiResponse.json();

      if (apiResponse.ok) {
        toast.success(`✅ ${data.message}`);
        if (data?.result) {
          setResponse(String(data.result.draft_response));
          usedAIRef.current = true; // Mark that AI was used (instant, no re-render)
        }
      } else {
        toast.error(`❌ ${data.detail || JSON.stringify(data)}`);
      }
    } catch (error) {
      toast.error(`❌ ${error instanceof Error ? error.message : 'Failed to process e-consult'}`);
    } finally {
      setIsProcessingAI(false);
    }
  };

  const handleProcessFeedBack = () => {
    if (!session) return;

    // Fire and forget - no await, no loading state, no feedback
    fetch(`${BACKEND_URL}/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        e_consult_id: consult.id
      }),
    }).catch(error => {
      // Silently log errors without user feedback
      console.error('Feedback request failed:', error);
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground"
          aria-label="Go back to consults list"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">e-Consult Review</h1>
          <p className="text-muted-foreground">
            Patient: <span className="font-medium text-foreground">{consult.patient_initials}</span> | {getCategoryLabel(consult.condition_category)}
          </p>
        </div>
        {getStatusBadge(consult.status)}
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="grid lg:grid-cols-[2fr_3fr] gap-6">
        {/* Left Column - Submission Details */}
        <div className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Submission Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Patient Full Name</Label>
                  <p className="font-medium text-foreground">{consult.patient_initials}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Age</Label>
                  <p className="font-medium">
                    {consult.patient_age} years old
                    {consult.patient_dob && (
                      <span className="text-muted-foreground text-sm block">
                        DOB: {format(new Date(consult.patient_dob), 'MMM d, yyyy')}
                      </span>
                    )}
                  </p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Gender</Label>
                  <p className="font-medium">{consult.patient_gender || 'Not specified'}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Submitted</Label>
                  <p className="font-medium">
                    {format(new Date(consult.created_at), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-xs text-muted-foreground">Referring Provider</Label>
                <p className="font-medium">{consult.physician_name || 'Primary Care Provider'}</p>
              </div>

              <Separator />

              <div>
                <Label className="text-xs text-muted-foreground">Measurements</Label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {consult.height_cm && (
                    <div className="bg-muted/50 rounded p-2 text-center">
                      <p className="text-xs text-muted-foreground">Height</p>
                      <p className="font-medium">{formatHeightInFeetAndInches(consult.height_cm)}</p>
                    </div>
                  )}
                  {consult.weight_kg && (
                    <div className="bg-muted/50 rounded p-2 text-center">
                      <p className="text-xs text-muted-foreground">Weight</p>
                      <p className="font-medium">{consult.weight_kg} Pounds</p>
                    </div>
                  )}
                  {consult.bmi && (
                    <div className="bg-muted/50 rounded p-2 text-center">
                      <p className="text-xs text-muted-foreground">BMI</p>
                      <p className="font-medium">{consult.bmi.toFixed(1)}</p>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-xs text-muted-foreground">Clinical Background</Label>
                <p className="text-sm mt-1 whitespace-pre-wrap">
                  {consult.additional_notes || 'No additional background provided.'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - e-Consultation */}
        <div className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                e-Consultation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Question from PCP */}
              <div>
                <Label className="text-sm font-semibold text-foreground mb-2 block">
                  Question from Referring Provider
                </Label>
                <div className="bg-muted/50 border border-border rounded-lg p-4">
                  <p className="text-sm whitespace-pre-wrap">{consult.clinical_question}</p>
                </div>
              </div>

              <Separator />

              {/* Response Section */}
              <div className="relative">
                <Label className="text-sm font-semibold text-foreground mb-2 block">
                  Recommended Course of Action / Response
                </Label>
                <Textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  placeholder="Enter your clinical recommendations, guidance, and any suggested next steps for the referring provider..."
                  className="min-h-[200px] resize-y"
                  disabled={consult.status === 'completed'}
                  aria-label="Specialist response"
                />
                
                {/* AI Agent Icon */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button 
                        type="button"
                        onClick={handleProcessEConsult}
                        disabled={isProcessingAI || consult.status === 'completed'}
                        className="absolute bottom-3 right-3 flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary cursor-pointer hover:bg-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Generate AI-assisted recommendation"
                      >
                        <div className="relative">
                          {isProcessingAI ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <>
                              <Search className="h-3.5 w-3.5" />
                              <Sparkles className="h-2.5 w-2.5 absolute -top-2 -right-1.5 text-primary" />
                            </>
                          )}
                        </div>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="bg-primary text-primary-foreground">
                      <p>{isProcessingAI ? 'Processing...' : 'Generate AI-assisted recommendation'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              {/* Next Steps Section */}
              <div>
                <Label className="text-sm font-semibold text-foreground mb-2 block">
                  Next Steps
                </Label>
                <div className="bg-muted/50 border border-border rounded-lg p-4">
                  <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Select next step">
                    {NEXT_STEP_OPTIONS.map((option) => {
                      const Icon = option.icon;
                      const isSelected = selectedNextStep === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          disabled={consult.status === 'completed' || isSavingNextStep}
                          onClick={() => handleNextStepSelect(option.value)}
                          className={`
                            inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium
                            transition-all duration-200 border
                            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                            disabled:opacity-50 disabled:cursor-not-allowed
                            ${isSelected 
                              ? 'bg-primary text-primary-foreground border-primary shadow-sm' 
                              : 'bg-background text-foreground border-border hover:bg-muted hover:border-primary/50'
                            }
                          `}
                        >
                          <Icon className="h-4 w-4" />
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                  {isSavingNextStep && (
                    <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Saving...
                    </div>
                  )}
                </div>
              </div>

              {consult.status !== 'completed' && (
                <div>
                  <Label className="text-sm font-semibold text-foreground mb-2 block">
                    Attach Documents (Optional)
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="flex-1"
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      aria-label="Upload attachments"
                    />
                    <Upload className="h-5 w-5 text-muted-foreground" />
                  </div>
                  {attachments.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {attachments.map((file, index) => (
                        <div key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          {file.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              {consult.status !== 'completed' && (
                <div className="flex items-center gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={handleSaveDraft}
                    disabled={isSavingDraft}
                    className="flex-1"
                    aria-label="Save draft"
                  >
                    {isSavingDraft ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Save Draft
                  </Button>
                  <Button
                    onClick={handleSubmitResponse}
                    disabled={isSubmitting || !String(response).trim()}
                    className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                    aria-label="Submit response"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4 mr-2" />
                    )}
                    Submit Response
                  </Button>
                </div>
              )}

              {/* Completed State */}
              {consult.status === 'completed' && consult.responded_at && (
                <div className="bg-[hsl(187,60%,95%)] border border-[hsl(187,60%,70%)] rounded-lg p-4">
                  <div className="flex items-center gap-2 text-[hsl(187,60%,35%)] mb-2">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="font-semibold">Response Submitted</span>
                  </div>
                  <p className="text-sm text-[hsl(187,60%,40%)]">
                    Submitted on {format(new Date(consult.responded_at), 'MMMM d, yyyy \'at\' h:mm a')}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
