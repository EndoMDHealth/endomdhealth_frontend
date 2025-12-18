import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  Eye, 
  FileText, 
  Search,
  Download,
  PlusCircle,
  AlertTriangle,
  ChevronRight
} from "lucide-react";
import { format, formatDistanceToNow, differenceInDays } from "date-fns";
import { cn } from "@/lib/utils";
import { generateEConsultPDF, EConsultPDFData } from "@/utils/generateEConsultPDF";

type EConsultStatus = 'submitted' | 'under_review' | 'awaiting_info' | 'completed';
type ConditionCategory = 'obesity' | 'growth' | 'diabetes' | 'puberty' | 'thyroid' | 'pcos' | 'other';

interface EConsult {
  id: string;
  patient_initials: string;
  patient_age: number;
  patient_dob?: string;
  condition_category: ConditionCategory;
  status: EConsultStatus;
  created_at: string;
  clinical_question: string;
  physician_name?: string;
  has_urgent_flags?: boolean;
}

interface EConsultsTableProps {
  consults: EConsult[];
  title?: string;
  description?: string;
  onViewConsult: (consult: EConsult) => void;
  onViewResponse?: (consult: EConsult) => void;
  onSubmitNew?: () => void;
  showFilters?: boolean;
  showPhysicianColumn?: boolean;
}

export const EConsultsTable = ({ 
  consults, 
  title = "Active E-Consults",
  description = "Your pending consultation requests",
  onViewConsult,
  onViewResponse,
  onSubmitNew,
  showFilters = true,
  showPhysicianColumn = false
}: EConsultsTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [urgencyFilter, setUrgencyFilter] = useState<string>("all");
  const [conditionFilter, setConditionFilter] = useState<string>("all");

  const getStatusBadge = (status: EConsultStatus) => {
    const variants: Record<EConsultStatus, { label: string; className: string }> = {
      submitted: { label: "Submitted", className: "bg-blue-100 text-blue-800 border-blue-200" },
      under_review: { label: "In Progress", className: "bg-amber-100 text-amber-800 border-amber-200" },
      awaiting_info: { label: "Awaiting Info", className: "bg-orange-100 text-orange-800 border-orange-200" },
      completed: { label: "New Response", className: "bg-green-100 text-green-800 border-green-200" },
    };
    const { label, className } = variants[status];
    return (
      <Badge 
        variant="outline" 
        className={cn(
          "font-medium cursor-pointer hover:opacity-80 transition-opacity", 
          className
        )}
      >
        {label}
      </Badge>
    );
  };

  const getCategoryLabel = (category: ConditionCategory) => {
    const labels: Record<ConditionCategory, string> = {
      obesity: "Obesity / Weight",
      growth: "Growth",
      diabetes: "Diabetes",
      puberty: "Puberty",
      thyroid: "Thyroid",
      pcos: "PCOS",
      other: "Other",
    };
    return labels[category];
  };

  const getDaysSinceSubmission = (createdAt: string) => {
    return differenceInDays(new Date(), new Date(createdAt));
  };

  const filteredConsults = consults.filter(consult => {
    const matchesSearch = consult.patient_initials.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          consult.clinical_question.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || consult.status === statusFilter;
    const matchesUrgency = urgencyFilter === "all" || 
                           (urgencyFilter === "urgent" && consult.has_urgent_flags) ||
                           (urgencyFilter === "normal" && !consult.has_urgent_flags);
    const matchesCondition = conditionFilter === "all" || consult.condition_category === conditionFilter;
    
    return matchesSearch && matchesStatus && matchesUrgency && matchesCondition;
  });

  const handleStatusClick = (consult: EConsult) => {
    if (onViewResponse) {
      onViewResponse(consult);
    } else {
      onViewConsult(consult);
    }
  };

  return (
    <Card className="bg-card border-border shadow-sm">
      <CardHeader className="border-b border-border pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-semibold">{title}</CardTitle>
            <CardDescription className="text-muted-foreground">{description}</CardDescription>
          </div>
          {onSubmitNew && (
            <Button onClick={onSubmitNew} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <PlusCircle className="mr-2 h-4 w-4" />
              New E-Consult
            </Button>
          )}
        </div>
        
        {showFilters && (
          <div className="flex flex-col md:flex-row gap-3 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by patient or clinical question..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                aria-label="Search e-consults"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]" aria-label="Filter by status">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="under_review">In Progress</SelectItem>
                  <SelectItem value="awaiting_info">Awaiting Info</SelectItem>
                  <SelectItem value="completed">New Response</SelectItem>
                </SelectContent>
              </Select>
              <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                <SelectTrigger className="w-[130px]" aria-label="Filter by urgency">
                  <SelectValue placeholder="Urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Urgency</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                </SelectContent>
              </Select>
              <Select value={conditionFilter} onValueChange={setConditionFilter}>
                <SelectTrigger className="w-[140px]" aria-label="Filter by condition">
                  <SelectValue placeholder="Condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Conditions</SelectItem>
                  <SelectItem value="obesity">Obesity</SelectItem>
                  <SelectItem value="growth">Growth</SelectItem>
                  <SelectItem value="diabetes">Diabetes</SelectItem>
                  <SelectItem value="puberty">Puberty</SelectItem>
                  <SelectItem value="thyroid">Thyroid</SelectItem>
                  <SelectItem value="pcos">PCOS</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="p-0">
        {filteredConsults.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No E-Consults Found</h3>
            <p className="text-muted-foreground mb-6">
              {consults.length === 0 
                ? "Submit your first e-consult to get started."
                : "No consults match your current filters."}
            </p>
            {onSubmitNew && consults.length === 0 && (
              <Button onClick={onSubmitNew}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Submit E-Consult
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="font-semibold" aria-label="Patient Name">Patient Name</TableHead>
                  <TableHead className="font-semibold" aria-label="Age">Age</TableHead>
                  <TableHead className="font-semibold" aria-label="Concern">Concern</TableHead>
                  <TableHead className="font-semibold" aria-label="Status">Status</TableHead>
                  <TableHead className="font-semibold" aria-label="Submission Date">Submitted</TableHead>
                  {showPhysicianColumn && <TableHead className="font-semibold" aria-label="Physician">Physician</TableHead>}
                  <TableHead className="font-semibold text-right" aria-label="Action">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredConsults.map((consult) => {
                  const days = getDaysSinceSubmission(consult.created_at);
                  const isUrgent = consult.has_urgent_flags || days > 5;
                  
                  return (
                    <TableRow 
                      key={consult.id}
                      className={cn(
                        "hover:bg-muted/30 transition-colors",
                        isUrgent && "bg-orange-50/50 hover:bg-orange-50"
                      )}
                    >
                      {/* Patient Full Name */}
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {isUrgent && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <AlertTriangle className="h-4 w-4 text-orange-500" aria-label="Urgent" />
                                </TooltipTrigger>
                                <TooltipContent>Urgent attention required</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                          <span className="font-medium text-foreground">{consult.patient_initials}</span>
                        </div>
                      </TableCell>

                      {/* Age */}
                      <TableCell>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="cursor-help">
                                {consult.patient_age} yrs
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              {consult.patient_dob 
                                ? `DOB: ${format(new Date(consult.patient_dob), 'MM/dd/yyyy')}`
                                : `${consult.patient_age} years old`
                              }
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>

                      {/* Concern */}
                      <TableCell>
                        <span className="text-sm">{getCategoryLabel(consult.condition_category)}</span>
                      </TableCell>

                      {/* Status - Clickable */}
                      <TableCell>
                        <button 
                          onClick={() => handleStatusClick(consult)}
                          className="focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded"
                          aria-label={`View response for ${consult.patient_initials}`}
                        >
                          {getStatusBadge(consult.status)}
                        </button>
                      </TableCell>

                      {/* Submission Date */}
                      <TableCell>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="text-sm text-muted-foreground cursor-help">
                                {format(new Date(consult.created_at), 'MMM d, yyyy')}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              {formatDistanceToNow(new Date(consult.created_at), { addSuffix: true })}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>

                      {/* Physician (optional) */}
                      {showPhysicianColumn && (
                        <TableCell className="text-sm">{consult.physician_name || 'N/A'}</TableCell>
                      )}

                      {/* Action */}
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => {
                                    const pdfData: EConsultPDFData = {
                                      id: consult.id,
                                      patientInitials: consult.patient_initials,
                                      patientAge: consult.patient_age,
                                      conditionCategory: consult.condition_category,
                                      clinicalQuestion: consult.clinical_question,
                                      status: consult.status,
                                      createdAt: consult.created_at,
                                    };
                                    generateEConsultPDF(pdfData);
                                  }}
                                  className="hover:bg-primary/10"
                                  aria-label="Download PDF summary"
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Download PDF</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => onViewConsult(consult)}
                            className="hover:bg-primary/10"
                            aria-label={`View details for ${consult.patient_initials}`}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
