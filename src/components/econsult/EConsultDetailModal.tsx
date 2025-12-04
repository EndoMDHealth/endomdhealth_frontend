import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Calendar, 
  Ruler, 
  Weight, 
  Activity,
  FileText,
  MessageSquare,
  Download,
  Clock
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";

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
  created_at: string;
}

interface EConsultDetailModalProps {
  consult: EConsult;
  isOpen: boolean;
  onClose: () => void;
}

const EConsultDetailModal = ({ consult, isOpen, onClose }: EConsultDetailModalProps) => {
  const getStatusBadge = (status: EConsultStatus) => {
    const variants: Record<EConsultStatus, { label: string; className: string }> = {
      submitted: { label: "Submitted", className: "bg-blue-100 text-blue-800" },
      under_review: { label: "In Review", className: "bg-amber-100 text-amber-800" },
      awaiting_info: { label: "Awaiting Info", className: "bg-orange-100 text-orange-800" },
      completed: { label: "Completed", className: "bg-green-100 text-green-800" },
    };
    const { label, className } = variants[status];
    return <Badge className={className}>{label}</Badge>;
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl">E-Consult Details</DialogTitle>
            {getStatusBadge(consult.status)}
          </div>
          <DialogDescription>
            Submitted {formatDistanceToNow(new Date(consult.created_at), { addSuffix: true })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Patient Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Patient Information
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <User className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Initials</p>
                  <p className="font-semibold">{consult.patient_initials}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Age</p>
                  <p className="font-semibold">{consult.patient_age} years</p>
                </div>
              </div>
              {consult.height_cm && (
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Ruler className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Height</p>
                    <p className="font-semibold">{consult.height_cm} cm</p>
                  </div>
                </div>
              )}
              {consult.weight_kg && (
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Weight className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Weight</p>
                    <p className="font-semibold">{consult.weight_kg} kg</p>
                  </div>
                </div>
              )}
              {consult.bmi && (
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <Activity className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-xs text-blue-600">BMI</p>
                    <p className="font-semibold text-blue-900">{consult.bmi}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Condition */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Condition Category
            </h3>
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-lg">
              <FileText className="h-4 w-4 text-primary mr-2" />
              <span className="font-medium text-primary">{getCategoryLabel(consult.condition_category)}</span>
            </div>
          </div>

          <Separator />

          {/* Clinical Question */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Clinical Question
            </h3>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-900 whitespace-pre-wrap">{consult.clinical_question}</p>
            </div>
          </div>

          {/* Additional Notes */}
          {consult.additional_notes && (
            <>
              <Separator />
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  Additional Notes
                </h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-900 whitespace-pre-wrap">{consult.additional_notes}</p>
                </div>
              </div>
            </>
          )}

          {/* Response (if completed) */}
          {consult.status === 'completed' && consult.response_notes && (
            <>
              <Separator />
              <div>
                <h3 className="text-sm font-semibold text-green-600 uppercase tracking-wide mb-3 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Specialist Response
                </h3>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-gray-900 whitespace-pre-wrap">{consult.response_notes}</p>
                  {consult.responded_at && (
                    <p className="text-xs text-green-600 mt-3">
                      Responded on {format(new Date(consult.responded_at), 'PPP')}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Timeline */}
          <Separator />
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Timeline
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">
                    Submitted on {format(new Date(consult.created_at), 'PPP')} at{' '}
                    {format(new Date(consult.created_at), 'p')}
                  </span>
                </div>
              </div>
              {consult.responded_at && (
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">
                      Completed on {format(new Date(consult.responded_at), 'PPP')}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" disabled>
              <MessageSquare className="mr-2 h-4 w-4" />
              Message
            </Button>
            {consult.status === 'completed' && (
              <Button variant="outline" disabled>
                <Download className="mr-2 h-4 w-4" />
                Download Summary
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EConsultDetailModal;