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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { 
  ChevronDown, 
  ChevronRight, 
  Eye, 
  FileText, 
  Search,
  Download,
  PlusCircle,
  AlertTriangle
} from "lucide-react";
import { formatDistanceToNow, differenceInDays } from "date-fns";
import { cn } from "@/lib/utils";
import { generateEConsultPDF, EConsultPDFData } from "@/utils/generateEConsultPDF";

type EConsultStatus = 'submitted' | 'under_review' | 'awaiting_info' | 'completed';
type ConditionCategory = 'obesity' | 'growth' | 'diabetes' | 'puberty' | 'thyroid' | 'pcos' | 'other';

interface EConsult {
  id: string;
  patient_initials: string;
  patient_age: number;
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
  onSubmitNew?: () => void;
  showFilters?: boolean;
  showPhysicianColumn?: boolean;
}

export const EConsultsTable = ({ 
  consults, 
  title = "Active E-Consults",
  description = "Your pending consultation requests",
  onViewConsult,
  onSubmitNew,
  showFilters = true,
  showPhysicianColumn = false
}: EConsultsTableProps) => {
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [urgencyFilter, setUrgencyFilter] = useState<string>("all");
  const [conditionFilter, setConditionFilter] = useState<string>("all");

  const toggleRow = (id: string) => {
    setExpandedRows(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const getStatusBadge = (status: EConsultStatus) => {
    const variants: Record<EConsultStatus, { label: string; className: string }> = {
      submitted: { label: "Submitted", className: "bg-blue-100 text-blue-800 border-blue-200" },
      under_review: { label: "In Review", className: "bg-amber-100 text-amber-800 border-amber-200" },
      awaiting_info: { label: "Awaiting Info", className: "bg-orange-100 text-orange-800 border-orange-200" },
      completed: { label: "Completed", className: "bg-green-100 text-green-800 border-green-200" },
    };
    const { label, className } = variants[status];
    return <Badge variant="outline" className={cn("font-medium", className)}>{label}</Badge>;
  };

  const getCategoryLabel = (category: ConditionCategory) => {
    const labels: Record<ConditionCategory, string> = {
      obesity: "Obesity",
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
    const days = differenceInDays(new Date(), new Date(createdAt));
    return days;
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
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="under_review">In Review</SelectItem>
                  <SelectItem value="awaiting_info">Awaiting Info</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Urgency</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                </SelectContent>
              </Select>
              <Select value={conditionFilter} onValueChange={setConditionFilter}>
                <SelectTrigger className="w-[140px]">
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
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="w-8"></TableHead>
                <TableHead className="font-semibold">Submission ID</TableHead>
                <TableHead className="font-semibold">Patient</TableHead>
                {showPhysicianColumn && <TableHead className="font-semibold">Physician</TableHead>}
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="font-semibold">Days</TableHead>
                <TableHead className="font-semibold text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredConsults.map((consult) => {
                const days = getDaysSinceSubmission(consult.created_at);
                const isExpanded = expandedRows.includes(consult.id);
                const isUrgent = consult.has_urgent_flags || days > 5;
                
                return (
                  <Collapsible key={consult.id} asChild open={isExpanded}>
                    <>
                      <TableRow 
                        className={cn(
                          "hover:bg-muted/30 transition-colors cursor-pointer",
                          isUrgent && "bg-orange-50/50 hover:bg-orange-50"
                        )}
                      >
                        <TableCell>
                          <CollapsibleTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 w-6 p-0"
                              onClick={() => toggleRow(consult.id)}
                            >
                              {isExpanded 
                                ? <ChevronDown className="h-4 w-4" /> 
                                : <ChevronRight className="h-4 w-4" />
                              }
                            </Button>
                          </CollapsibleTrigger>
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          <div className="flex items-center gap-2">
                            {isUrgent && <AlertTriangle className="h-4 w-4 text-orange-500" />}
                            #{consult.id.slice(0, 8).toUpperCase()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <span className="font-medium">{consult.patient_initials}</span>
                            <span className="text-muted-foreground ml-2">({consult.patient_age} yrs)</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{getCategoryLabel(consult.condition_category)}</span>
                        </TableCell>
                        {showPhysicianColumn && (
                          <TableCell className="text-sm">{consult.physician_name || 'N/A'}</TableCell>
                        )}
                        <TableCell>{getStatusBadge(consult.status)}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(consult.created_at), { addSuffix: true })}
                        </TableCell>
                        <TableCell>
                          <Badge variant={days > 5 ? "destructive" : days > 2 ? "secondary" : "outline"}>
                            {days}d
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
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
                              title="Download PDF"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => onViewConsult(consult)}
                              className="hover:bg-primary/10"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <CollapsibleContent asChild>
                        <TableRow className="bg-muted/20 hover:bg-muted/20">
                          <TableCell colSpan={showPhysicianColumn ? 8 : 7} className="p-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="text-sm font-medium mb-2">Clinical Question</h4>
                                <p className="text-sm text-muted-foreground bg-background p-3 rounded-lg">
                                  {consult.clinical_question}
                                </p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-2">Recent Labs & Documents</h4>
                                <div className="text-sm text-muted-foreground bg-background p-3 rounded-lg">
                                  <p className="italic">No attachments uploaded</p>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      </CollapsibleContent>
                    </>
                  </Collapsible>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
