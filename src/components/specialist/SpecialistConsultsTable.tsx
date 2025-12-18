import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, Search, Filter, Clock, CheckCircle2, AlertCircle, FileText } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  status: EConsultStatus;
  created_at: string;
  clinical_question: string;
  additional_notes?: string;
  response_notes?: string;
  responded_at?: string;
  physician_name?: string;
}

interface SpecialistConsultsTableProps {
  consults: EConsult[];
  title: string;
  description: string;
  onViewConsult: (consult: EConsult) => void;
  onRespondConsult: (consult: EConsult) => void;
}

const getStatusBadge = (status: EConsultStatus) => {
  const statusConfig = {
    submitted: { 
      label: 'New', 
      variant: 'default' as const, 
      icon: Clock,
      className: 'bg-blue-500 hover:bg-blue-600' 
    },
    under_review: { 
      label: 'In Progress', 
      variant: 'secondary' as const, 
      icon: FileText,
      className: 'bg-amber-500 hover:bg-amber-600 text-white' 
    },
    awaiting_info: { 
      label: 'Awaiting Info', 
      variant: 'outline' as const, 
      icon: AlertCircle,
      className: 'border-orange-500 text-orange-600' 
    },
    completed: { 
      label: 'Completed', 
      variant: 'secondary' as const, 
      icon: CheckCircle2,
      className: 'bg-[hsl(187,60%,50%)] hover:bg-[hsl(187,60%,45%)] text-white' 
    },
  };
  
  const config = statusConfig[status];
  const Icon = config.icon;
  
  return (
    <Badge variant={config.variant} className={config.className}>
      <Icon className="h-3 w-3 mr-1" />
      {config.label}
    </Badge>
  );
};

const getCategoryLabel = (category: ConditionCategory) => {
  const labels: Record<ConditionCategory, string> = {
    obesity: 'Obesity / Weight',
    growth: 'Growth Concerns',
    diabetes: 'Diabetes',
    puberty: 'Puberty',
    thyroid: 'Thyroid',
    pcos: 'PCOS',
    other: 'Other',
  };
  return labels[category];
};

export const SpecialistConsultsTable = ({ 
  consults, 
  title, 
  description,
  onViewConsult,
  onRespondConsult,
}: SpecialistConsultsTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<string>("date");

  const filteredConsults = consults
    .filter(consult => {
      const matchesSearch = 
        consult.patient_initials.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consult.condition_category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consult.clinical_question.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || consult.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortField === "date") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      if (sortField === "status") {
        const statusOrder = { submitted: 0, under_review: 1, awaiting_info: 2, completed: 3 };
        return statusOrder[a.status] - statusOrder[b.status];
      }
      return 0;
    });

  return (
    <Card className="bg-card border-border shadow-sm">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm">
              {filteredConsults.length} {filteredConsults.length === 1 ? 'consult' : 'consults'}
            </Badge>
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by patient, condition, or question..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
              aria-label="Search consults"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]" aria-label="Filter by status">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="submitted">New</SelectItem>
              <SelectItem value="under_review">In Progress</SelectItem>
              <SelectItem value="awaiting_info">Awaiting Info</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortField} onValueChange={setSortField}>
            <SelectTrigger className="w-[140px]" aria-label="Sort by">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {filteredConsults.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold text-lg mb-2">No e-Consults Found</h3>
            <p className="text-muted-foreground">
              {searchTerm || statusFilter !== "all" 
                ? "Try adjusting your filters"
                : "No pending e-Consults at this time"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead aria-label="Patient Full Name">Patient Name</TableHead>
                  <TableHead aria-label="Age">Age</TableHead>
                  <TableHead aria-label="Concern">Concern</TableHead>
                  <TableHead aria-label="Status">Status</TableHead>
                  <TableHead aria-label="Submission Date">Submitted</TableHead>
                  <TableHead aria-label="Referring Provider">Provider</TableHead>
                  <TableHead className="text-right" aria-label="Actions">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredConsults.map((consult) => (
                  <TableRow 
                    key={consult.id}
                    className="cursor-pointer hover:bg-muted/50"
                  >
                    <TableCell className="font-medium text-foreground">
                      {consult.patient_initials}
                    </TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="cursor-help">
                              {consult.patient_age} yrs
                            </span>
                          </TooltipTrigger>
                          {consult.patient_dob && (
                            <TooltipContent>
                              <p>DOB: {format(new Date(consult.patient_dob), 'MMM d, yyyy')}</p>
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {getCategoryLabel(consult.condition_category)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(consult.status)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {format(new Date(consult.created_at), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {consult.physician_name || 'PCP'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onViewConsult(consult)}
                          className="text-primary hover:text-primary hover:bg-primary/10"
                          aria-label={`View details for ${consult.patient_initials}`}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        {consult.status !== 'completed' && (
                          <Button
                            size="sm"
                            onClick={() => onRespondConsult(consult)}
                            className="bg-accent hover:bg-accent/90 text-accent-foreground"
                            aria-label={`Respond to ${consult.patient_initials}'s consult`}
                          >
                            Respond
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
