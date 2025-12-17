import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Eye, Users } from "lucide-react";

interface PatientReferral {
  id: string;
  patient_name: string;
  patient_age: number;
  referral_reason: string;
  status: 'pending' | 'in_review' | 'scheduled' | 'completed';
  created_at: string;
  referring_provider: string;
}

interface PatientReferralsTableProps {
  title: string;
  description: string;
}

// Mock data for demonstration - replace with actual Supabase query when table exists
const mockReferrals: PatientReferral[] = [
  {
    id: '1',
    patient_name: 'J. Smith',
    patient_age: 12,
    referral_reason: 'Growth concerns',
    status: 'pending',
    created_at: new Date().toISOString(),
    referring_provider: 'Dr. Johnson'
  },
  {
    id: '2',
    patient_name: 'M. Davis',
    patient_age: 8,
    referral_reason: 'Thyroid evaluation',
    status: 'in_review',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    referring_provider: 'Dr. Williams'
  },
  {
    id: '3',
    patient_name: 'A. Brown',
    patient_age: 15,
    referral_reason: 'Diabetes management',
    status: 'scheduled',
    created_at: new Date(Date.now() - 172800000).toISOString(),
    referring_provider: 'Dr. Garcia'
  },
];

const getStatusBadge = (status: PatientReferral['status']) => {
  const statusConfig = {
    pending: { label: 'Pending', variant: 'secondary' as const },
    in_review: { label: 'In Review', variant: 'default' as const },
    scheduled: { label: 'Scheduled', variant: 'outline' as const },
    completed: { label: 'Completed', variant: 'secondary' as const },
  };
  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const PatientReferralsTable = ({ title, description }: PatientReferralsTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const referrals = mockReferrals;

  const filteredReferrals = referrals.filter(referral => {
    const matchesSearch = 
      referral.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.referral_reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.referring_provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || referral.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Card className="bg-card border-border shadow-sm">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Users className="h-5 w-5 text-accent" />
              {title}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by patient, reason, or provider..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_review">In Review</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredReferrals.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No referrals found</h3>
            <p className="text-muted-foreground">
              {searchTerm || statusFilter !== "all" 
                ? "Try adjusting your search or filter criteria"
                : "Patient referrals will appear here once submitted"}
            </p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Referral Reason</TableHead>
                  <TableHead>Referring Provider</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReferrals.map((referral) => (
                  <TableRow key={referral.id}>
                    <TableCell className="font-medium">{referral.patient_name}</TableCell>
                    <TableCell>{referral.patient_age} yrs</TableCell>
                    <TableCell>{referral.referral_reason}</TableCell>
                    <TableCell>{referral.referring_provider}</TableCell>
                    <TableCell>{getStatusBadge(referral.status)}</TableCell>
                    <TableCell>{formatDate(referral.created_at)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
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
