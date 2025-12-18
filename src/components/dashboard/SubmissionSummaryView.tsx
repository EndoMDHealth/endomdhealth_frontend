import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  User,
  Calendar,
  Stethoscope,
  FileText,
  Clock,
  Paperclip
} from "lucide-react";
import { format } from "date-fns";

type EConsultStatus = 'submitted' | 'under_review' | 'awaiting_info' | 'completed';
type ConditionCategory = 'obesity' | 'growth' | 'diabetes' | 'puberty' | 'thyroid' | 'pcos' | 'other';

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
  submitted_by_name?: string;
}

interface SubmissionSummaryViewProps {
  consult: EConsult;
  onBack: () => void;
}

const SubmissionSummaryView = ({ consult, onBack }: SubmissionSummaryViewProps) => {
  const getStatusBadge = (status: EConsultStatus) => {
    const variants: Record<EConsultStatus, { label: string; className: string }> = {
      submitted: { label: "Submitted", className: "bg-blue-100 text-blue-800 border-blue-200" },
      under_review: { label: "Under Review", className: "bg-amber-100 text-amber-800 border-amber-200" },
      awaiting_info: { label: "Awaiting Info", className: "bg-orange-100 text-orange-800 border-orange-200" },
      completed: { label: "Response Available", className: "bg-green-100 text-green-800 border-green-200" },
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

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-4 text-muted-foreground hover:text-foreground"
        aria-label="Back to Active Submissions"
      >
        <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
        Back to Active Submissions
      </Button>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Submission Summary</h1>
        {getStatusBadge(consult.status)}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Patient & Provider Info */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5 text-accent" aria-hidden="true" />
              Patient Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Patient Full Name */}
            <div>
              <label className="text-sm text-muted-foreground" id="patient-name-label">Patient Full Name</label>
              <p className="font-semibold text-lg text-foreground" aria-labelledby="patient-name-label">
                {consult.patient_initials}
              </p>
            </div>

            {/* Age & DOB */}
            <div>
              <label className="text-sm text-muted-foreground" id="age-label">Age</label>
              <p className="font-medium text-foreground" aria-labelledby="age-label">
                {consult.patient_age} years old
                {consult.patient_dob && (
                  <span className="text-muted-foreground ml-2">
                    (DOB: {format(new Date(consult.patient_dob), 'MMMM d, yyyy')})
                  </span>
                )}
              </p>
            </div>

            {/* Gender */}
            {consult.patient_gender && (
              <div>
                <label className="text-sm text-muted-foreground" id="gender-label">Gender</label>
                <p className="font-medium text-foreground capitalize" aria-labelledby="gender-label">
                  {consult.patient_gender}
                </p>
              </div>
            )}

            {/* Measurements */}
            {(consult.height_cm || consult.weight_kg || consult.bmi) && (
              <>
                <Separator />
                <div className="grid grid-cols-3 gap-4">
                  {consult.height_cm && (
                    <div>
                      <label className="text-sm text-muted-foreground" id="height-label">Height</label>
                      <p className="font-medium text-foreground" aria-labelledby="height-label">
                        {consult.height_cm} cm
                      </p>
                    </div>
                  )}
                  {consult.weight_kg && (
                    <div>
                      <label className="text-sm text-muted-foreground" id="weight-label">Weight</label>
                      <p className="font-medium text-foreground" aria-labelledby="weight-label">
                        {consult.weight_kg} kg
                      </p>
                    </div>
                  )}
                  {consult.bmi && (
                    <div>
                      <label className="text-sm text-muted-foreground" id="bmi-label">BMI</label>
                      <p className="font-medium text-foreground" aria-labelledby="bmi-label">
                        {consult.bmi.toFixed(1)}
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}

            <Separator />

            {/* Submission Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-accent" aria-hidden="true" />
                <div>
                  <label className="text-sm text-muted-foreground" id="submission-date-label">Submission Date</label>
                  <p className="font-medium text-foreground" aria-labelledby="submission-date-label">
                    {format(new Date(consult.created_at), 'MMMM d, yyyy')} at {format(new Date(consult.created_at), 'h:mm a')}
                  </p>
                </div>
              </div>

              {consult.physician_name && (
                <div className="flex items-center gap-3">
                  <Stethoscope className="h-5 w-5 text-accent" aria-hidden="true" />
                  <div>
                    <label className="text-sm text-muted-foreground" id="provider-label">Provider Name</label>
                    <p className="font-medium text-foreground" aria-labelledby="provider-label">
                      {consult.physician_name}
                    </p>
                  </div>
                </div>
              )}

              {consult.submitted_by_name && consult.submitted_by_name !== consult.physician_name && (
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-accent" aria-hidden="true" />
                  <div>
                    <label className="text-sm text-muted-foreground" id="submitted-by-label">Submitted By</label>
                    <p className="font-medium text-foreground" aria-labelledby="submitted-by-label">
                      {consult.submitted_by_name}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Clinical Details */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5 text-accent" aria-hidden="true" />
              Clinical Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Concern / Reason for Referral */}
            <div>
              <label className="text-sm text-muted-foreground" id="concern-label">Concern / Reason for Referral</label>
              <div className="mt-1">
                <Badge variant="secondary" className="text-sm" aria-labelledby="concern-label">
                  {getCategoryLabel(consult.condition_category)}
                </Badge>
              </div>
            </div>

            {/* Clinical Question */}
            <div>
              <label className="text-sm text-muted-foreground" id="clinical-question-label">Clinical Question</label>
              <div 
                className="mt-2 p-4 bg-muted/50 rounded-lg border border-border"
                aria-labelledby="clinical-question-label"
              >
                <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                  {consult.clinical_question}
                </p>
              </div>
            </div>

            {/* Additional Notes / History */}
            {consult.additional_notes && (
              <div>
                <label className="text-sm text-muted-foreground" id="additional-notes-label">
                  Relevant History & Additional Notes
                </label>
                <div 
                  className="mt-2 p-4 bg-muted/50 rounded-lg border border-border"
                  aria-labelledby="additional-notes-label"
                >
                  <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                    {consult.additional_notes}
                  </p>
                </div>
              </div>
            )}

            {/* Uploaded Documents placeholder */}
            <div>
              <label className="text-sm text-muted-foreground flex items-center gap-2" id="documents-label">
                <Paperclip className="h-4 w-4" aria-hidden="true" />
                Uploaded Documents
              </label>
              <div 
                className="mt-2 p-4 bg-muted/30 rounded-lg border border-dashed border-border text-center"
                aria-labelledby="documents-label"
              >
                <p className="text-sm text-muted-foreground">
                  Document attachments will be displayed here when available.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Footer */}
      <Card className="bg-muted/30 border-border">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
              <div>
                <p className="text-sm text-muted-foreground">Current Status</p>
                <p className="font-medium text-foreground">
                  {consult.status === 'completed' 
                    ? 'Specialist response available - check the Responses tab'
                    : 'Awaiting specialist review'
                  }
                </p>
              </div>
            </div>
            {getStatusBadge(consult.status)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmissionSummaryView;
