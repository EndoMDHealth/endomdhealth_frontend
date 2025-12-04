import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  PlusCircle, 
  FileText, 
  Clock, 
  CheckCircle2, 
  BarChart3,
  Upload,
  MessageSquare,
  Download,
  User,
  LogOut,
  Settings,
  ChevronRight,
  Eye,
  Loader2,
  Activity,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import endoLogo from "@/assets/logos/endo_yellow.png";
import SubmitEConsultModal from "@/components/econsult/SubmitEConsultModal";
import EConsultDetailModal from "@/components/econsult/EConsultDetailModal";

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
}

interface DashboardStats {
  total: number;
  active: number;
  avgResponseTime: string;
  closedThisMonth: number;
}

const PhysicianDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [consults, setConsults] = useState<EConsult[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    total: 0,
    active: 0,
    avgResponseTime: "< 48 hrs",
    closedThisMonth: 0,
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [selectedConsult, setSelectedConsult] = useState<EConsult | null>(null);
  const [physicianName, setPhysicianName] = useState("");

  const activeTab = location.pathname.split('/').pop() || 'dashboard';

  useEffect(() => {
    if (user) {
      fetchConsults();
      fetchPhysicianInfo();
    }
  }, [user]);

  const fetchPhysicianInfo = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .maybeSingle();
    
    if (data?.full_name) {
      setPhysicianName(data.full_name);
    } else {
      setPhysicianName(user.email?.split('@')[0] || 'Physician');
    }
  };

  const fetchConsults = async () => {
    if (!user) return;
    setLoading(true);
    
    const { data, error } = await supabase
      .from('e_consults')
      .select('*')
      .eq('physician_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching consults:', error);
    } else {
      setConsults(data || []);
      
      // Calculate stats
      const total = data?.length || 0;
      const active = data?.filter(c => c.status !== 'completed').length || 0;
      const thisMonth = new Date();
      thisMonth.setDate(1);
      const closedThisMonth = data?.filter(
        c => c.status === 'completed' && new Date(c.created_at) >= thisMonth
      ).length || 0;
      
      setStats({
        total,
        active,
        avgResponseTime: "< 48 hrs",
        closedThisMonth,
      });
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/clinician-login');
  };

  const getStatusBadge = (status: EConsultStatus) => {
    const variants: Record<EConsultStatus, { label: string; className: string }> = {
      submitted: { label: "Submitted", className: "bg-blue-100 text-blue-800 hover:bg-blue-100" },
      under_review: { label: "In Review", className: "bg-amber-100 text-amber-800 hover:bg-amber-100" },
      awaiting_info: { label: "Awaiting Info", className: "bg-orange-100 text-orange-800 hover:bg-orange-100" },
      completed: { label: "Completed", className: "bg-green-100 text-green-800 hover:bg-green-100" },
    };
    const { label, className } = variants[status];
    return <Badge className={className}>{label}</Badge>;
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

  const activeConsults = consults.filter(c => c.status !== 'completed');
  const completedConsults = consults.filter(c => c.status === 'completed');

  const navTabs = [
    { id: 'dashboard', label: 'Dashboard', path: '/physician-dashboard' },
    { id: 'submit', label: 'Submit E-Consult', path: '/physician-dashboard/submit', action: () => setIsSubmitModalOpen(true) },
    { id: 'active', label: 'Active Consults', path: '/physician-dashboard/active' },
    { id: 'completed', label: 'Completed', path: '/physician-dashboard/completed' },
    { id: 'messages', label: 'Messages', path: '/physician-dashboard/messages' },
    { id: 'settings', label: 'Settings', path: '/physician-dashboard/settings' },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <img src={endoLogo} alt="EndoMD Health" className="h-10 w-auto" />
              </Link>
            </div>

            {/* Center Tabs */}
            <div className="hidden md:flex items-center space-x-1">
              {navTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={tab.action ? tab.action : () => navigate(tab.path)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    (tab.id === 'dashboard' && activeTab === 'physician-dashboard') ||
                    activeTab === tab.id
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Profile Dropdown */}
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <span className="hidden sm:block text-sm font-medium text-gray-700">
                      Dr. {physicianName.split(' ').pop()}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium">{physicianName}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/physician-dashboard/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {/* Hero CTA Card */}
            <Card className="mb-8 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground border-0 shadow-lg overflow-hidden">
              <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">Submit a New E-Consult</h2>
                  <p className="text-primary-foreground/80 text-lg">
                    Receive pediatric endocrinology guidance within 24–48 hours.
                  </p>
                </div>
                <Button 
                  size="lg" 
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 shadow-md hover:shadow-lg transition-all"
                >
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Submit E-Consult
                </Button>
              </CardContent>
            </Card>

            {/* KPI Tiles */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-500">Total Consults</span>
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-500">Active Consults</span>
                    <Activity className="h-5 w-5 text-blue-500" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{stats.active}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-500">Avg. Turnaround</span>
                    <Clock className="h-5 w-5 text-amber-500" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{stats.avgResponseTime}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-500">Closed This Month</span>
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{stats.closedThisMonth}</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-[1fr_300px] gap-8">
              {/* Active Consults Table */}
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader className="border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">Active E-Consults</CardTitle>
                      <CardDescription>Your pending consultation requests</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => navigate('/physician-dashboard/active')}>
                      View All
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {activeConsults.length === 0 ? (
                    <div className="p-12 text-center">
                      <FileText className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Consults</h3>
                      <p className="text-gray-500 mb-6">Submit your first e-consult to get started.</p>
                      <Button onClick={() => setIsSubmitModalOpen(true)}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Submit E-Consult
                      </Button>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="font-semibold">Patient</TableHead>
                          <TableHead className="font-semibold">Age</TableHead>
                          <TableHead className="font-semibold">Condition</TableHead>
                          <TableHead className="font-semibold">Status</TableHead>
                          <TableHead className="font-semibold">Submitted</TableHead>
                          <TableHead className="font-semibold text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {activeConsults.slice(0, 5).map((consult) => (
                          <TableRow key={consult.id} className="hover:bg-gray-50 cursor-pointer">
                            <TableCell className="font-medium">{consult.patient_initials}</TableCell>
                            <TableCell>{consult.patient_age} yrs</TableCell>
                            <TableCell>{getCategoryLabel(consult.condition_category)}</TableCell>
                            <TableCell>{getStatusBadge(consult.status)}</TableCell>
                            <TableCell className="text-gray-500">
                              {formatDistanceToNow(new Date(consult.created_at), { addSuffix: true })}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setSelectedConsult(consult)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions Panel */}
              <div className="space-y-4">
                <Card className="bg-white border-gray-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start hover:bg-gray-50"
                      onClick={() => setIsSubmitModalOpen(true)}
                    >
                      <Upload className="mr-3 h-4 w-4 text-primary" />
                      Upload Labs
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start hover:bg-gray-50"
                      onClick={() => navigate('/physician-dashboard/messages')}
                    >
                      <MessageSquare className="mr-3 h-4 w-4 text-primary" />
                      Message Specialist
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start hover:bg-gray-50"
                      disabled={completedConsults.length === 0}
                    >
                      <Download className="mr-3 h-4 w-4 text-primary" />
                      Download Summary
                    </Button>
                  </CardContent>
                </Card>

                {/* Recent Completed */}
                {completedConsults.length > 0 && (
                  <Card className="bg-white border-gray-200 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg">Recently Completed</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {completedConsults.slice(0, 3).map((consult) => (
                        <div 
                          key={consult.id} 
                          className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                          onClick={() => setSelectedConsult(consult)}
                        >
                          <div>
                            <p className="font-medium text-sm">{consult.patient_initials}</p>
                            <p className="text-xs text-gray-500">{getCategoryLabel(consult.condition_category)}</p>
                          </div>
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Mobile Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 md:hidden">
        <Button 
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
          onClick={() => setIsSubmitModalOpen(true)}
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Submit New E-Consult
        </Button>
      </div>

      {/* Modals */}
      <SubmitEConsultModal 
        isOpen={isSubmitModalOpen} 
        onClose={() => setIsSubmitModalOpen(false)}
        onSuccess={() => {
          setIsSubmitModalOpen(false);
          fetchConsults();
        }}
      />

      {selectedConsult && (
        <EConsultDetailModal
          consult={selectedConsult}
          isOpen={!!selectedConsult}
          onClose={() => setSelectedConsult(null)}
        />
      )}
    </div>
  );
};

export default PhysicianDashboard;