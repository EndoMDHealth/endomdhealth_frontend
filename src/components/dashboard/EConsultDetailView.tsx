import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  MessageSquare, 
  CheckCircle2,
  User,
  Calendar,
  Stethoscope,
  Video,
  Building2,
  Eye,
  FlaskConical,
  UserPlus,
} from "lucide-react";
import { format } from "date-fns";
import EConsultFeedbackModal, { FeedbackData } from "./EConsultFeedbackModal";
import { WysiwygDisplay } from "@/components/WysiwygEditor";

type EConsultStatus = 'submitted' | 'under_review' | 'awaiting_info' | 'completed';
type ConditionCategory = 'obesity' | 'growth' | 'diabetes' | 'puberty' | 'thyroid' | 'pcos' | 'other';
type NextStepOption = 'schedule_virtual_visit' | 'schedule_in_person_visit' | 'continue_monitoring' | 'obtain_further_labs' | 'refer_different_specialty';

const NEXT_STEP_DISPLAY: Record<NextStepOption, { label: string; icon: typeof Video }> = {
  schedule_virtual_visit: { label: 'Schedule a virtual visit', icon: Video },
  schedule_in_person_visit: { label: 'Schedule an in-person visit', icon: Building2 },
  continue_monitoring: { label: 'Continue monitoring', icon: Eye },
  obtain_further_labs: { label: 'Obtain further labs', icon: FlaskConical },
  refer_different_specialty: { label: 'Refer to a different specialty', icon: UserPlus },
};

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
  clinical_question: string;
  additional_notes?: string;
  status: EConsultStatus;
  response_notes?: string;
  responded_at?: string;
  responded_by?: string;
  created_at: string;
  physician_name?: string;
  next_step?: NextStepOption | null;
}

interface EConsultDetailViewProps {
  consult: EConsult;
  onBack: () => void;
  onContinueConsultation?: () => void;
  onMarkComplete?: (feedback: FeedbackData) => void;
}

const EConsultDetailView = ({ 
  consult, 
  onBack,
  onContinueConsultation,
  onMarkComplete
}: EConsultDetailViewProps) => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const getStatusBadge = (status: EConsultStatus) => {
    const variants: Record<EConsultStatus, { label: string; className: string }> = {
      submitted: { label: "New Submission", className: "bg-blue-100 text-blue-800 border-blue-200" },
      under_review: { label: "In Review", className: "bg-amber-100 text-amber-800 border-amber-200" },
      awaiting_info: { label: "Awaiting Info", className: "bg-orange-100 text-orange-800 border-orange-200" },
      completed: { label: "New Response", className: "bg-green-100 text-green-800 border-green-200" },
    };
    const { label, className } = variants[status];
    return <Badge variant="outline" className={className}>{label}</Badge>;
  };

  const getCategoryLabel = (category: ConditionCategory) => {
    const labels: Record<ConditionCategory, string> = {
      obesity: "Obesity / Weight Management",
      growth: "Growth Problems / Short Stature",
      diabetes: "Diabetes / Blood Sugar",
      puberty: "Puberty Concerns",
      thyroid: "Thyroid Disorders",
      pcos: "PCOS",
      other: "Other Endocrine",
    };
    return labels[category];
  };

  // Mock data for specialist - in real app, this would come from the database
  const assignedClinician = "Dr. Ladan Davallow";
  const responseDate = consult.responded_at 
    ? format(new Date(consult.responded_at), 'MMMM d, yyyy')
    : format(new Date(), 'MMMM d, yyyy');

  // Background summary based on condition category
  const getBackgroundSummary = () => {
    const summaries: Record<ConditionCategory, string> = {
      obesity: "Patient presents with concerns related to weight management and metabolic health. Evaluation requested for comprehensive assessment of contributing factors and treatment options.",
      growth: "Patient referred for evaluation of growth patterns and potential short stature concerns. Assessment of growth velocity and underlying causes requested.",
      diabetes: "Patient presents with blood sugar regulation concerns. Evaluation of glucose metabolism and diabetes risk factors requested.",
      puberty: "Patient referred for assessment of pubertal development timing and progression. Evaluation of hormonal factors requested.",
      thyroid: "Patient presents with concerns related to thyroid function. Comprehensive thyroid evaluation requested.",
      pcos: "Patient referred for evaluation of polycystic ovary syndrome symptoms and hormonal assessment.",
      other: "Patient referred for specialized endocrine evaluation and assessment."
    };
    return summaries[consult.condition_category];
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-4 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Active Submissions
      </Button>

      {/* Main Content - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Section - Submission Details (40%) */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-foreground">
                Submission Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Patient Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Patient Full Name</p>
                    <p className="font-semibold text-foreground text-lg">{consult.patient_initials}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Age</p>
                    <p className="font-semibold text-foreground">
                      {consult.patient_age} years old
                      {consult.patient_dob && (
                        <span className="text-muted-foreground font-normal ml-2">
                          (DOB: {format(new Date(consult.patient_dob), 'MM/dd/yyyy')})
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {consult.patient_gender && (
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Gender</p>
                      <p className="font-semibold text-foreground capitalize">{consult.patient_gender}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    {getStatusBadge(consult.status)}
                  </div>
                </div>

                {consult.physician_name && (
                  <div className="flex items-center gap-3">
                    <Stethoscope className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Provider</p>
                      <p className="font-semibold text-foreground">{consult.physician_name}</p>
                    </div>
                  </div>
                )}
              </div>

              <Separator className="my-4" />

              {/* Specialist Section */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Specialist</h4>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Assigned Clinician</p>
                    <p className="font-medium text-foreground">{assignedClinician}</p>
                  </div>
                  {consult.responded_at && (
                    <div>
                      <p className="text-sm text-muted-foreground">Date of Response</p>
                      <p className="font-medium text-foreground">{responseDate}</p>
                    </div>
                  )}
                </div>
              </div>

              <Separator className="my-4" />

              {/* Background Summary */}
              <div>
                <h4 className="font-semibold text-foreground mb-2">Background</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {getBackgroundSummary()}
                </p>
                {consult.additional_notes && (
                  <p className="text-sm text-muted-foreground mt-2 italic">
                    {consult.additional_notes}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Section - e-Consultation (60%) */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="bg-card border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-foreground">
                e-Consultation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Question for Specialist */}
              <div>
                <h4 className="font-semibold text-foreground mb-2">Question for Specialist</h4>
                <div className="p-4 bg-muted/50 rounded-lg border border-border">
                  <p className="text-foreground whitespace-pre-wrap">
                    {consult.clinical_question}
                  </p>
                </div>
              </div>

              {/* Assigned Clinician */}
              <div>
                <h4 className="font-semibold text-foreground mb-2">Assigned Clinician</h4>
                <p className="text-foreground">{assignedClinician}</p>
              </div>

              {/* Specialist Response */}
              <div>
                <h4 className="font-semibold text-foreground mb-2">Specialist Response</h4>
                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                  {consult.response_notes ? (
                    <WysiwygDisplay content={consult.response_notes} className="text-foreground" />
                  ) : (
                    <p className="text-muted-foreground italic">
                      Response pending. The specialist will review your submission and provide recommendations.
                    </p>
                  )}
                </div>
              </div>

              {/* Next Steps - Read-only display for Providers */}
              {consult.next_step && (
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Recommended Next Step</h4>
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    {(() => {
                      const stepInfo = NEXT_STEP_DISPLAY[consult.next_step];
                      const Icon = stepInfo.icon;
                      return (
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                            <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                          </div>
                          <p className="font-medium text-foreground">{stepInfo.label}</p>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              )}

              <Separator className="my-4" />

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="outline"
                  className="flex-1 h-14 border-primary text-primary hover:bg-primary/10"
                  onClick={onContinueConsultation}
                  aria-label="Continue Consultation"
                >
                  <MessageSquare className="mr-2 h-5 w-5" aria-hidden="true" />
                  Continue this Consultation
                </Button>
                <Button 
                  className="flex-1 h-14 bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => setShowFeedbackModal(true)}
                  aria-label="All Done - Mark consultation as complete"
                >
                  <CheckCircle2 className="mr-2 h-5 w-5" aria-hidden="true" />
                  All Done
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Feedback Modal */}
      <EConsultFeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        onSubmit={(feedback) => {
          onMarkComplete?.(feedback);
          setShowFeedbackModal(false);
        }}
        consultId={consult.id}
      />
    </div>
  );
};

export default EConsultDetailView;
