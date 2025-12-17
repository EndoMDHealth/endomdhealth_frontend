import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  PlusCircle, 
  User,
  LogOut,
  Settings,
  Loader2,
} from "lucide-react";
import endoLogo from "@/assets/logos/endo_yellow.png";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHome } from "@/components/dashboard/DashboardHome";
import { EConsultsTable } from "@/components/dashboard/EConsultsTable";
import { AnalyticsSection } from "@/components/dashboard/AnalyticsSection";
import { TeamSection } from "@/components/dashboard/TeamSection";
import { FormsSection } from "@/components/dashboard/FormsSection";
import { PatientReferralsTable } from "@/components/dashboard/PatientReferralsTable";
import EConsultDetailView from "@/components/dashboard/EConsultDetailView";
import { ConsultationActionsModal } from "@/components/dashboard/ConsultationActionsModal";
import { FeedbackData } from "@/components/dashboard/EConsultFeedbackModal";
import { toast } from "sonner";

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

type DashboardView = 'dashboard' | 'submissions-active' | 'submissions-archived' | 'responses-active' | 'responses-archived' | 'referrals-active' | 'analytics' | 'team' | 'support' | 'forms' | 'consult-detail';

const PhysicianDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [consults, setConsults] = useState<EConsult[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    appointmentsBooked: 0,
    avgResponseTime: "< 48 hrs",
    urgent: 0,
    pendingReview: 0,
    active: 0,
  });
  const [loading, setLoading] = useState(true);
  const [selectedConsult, setSelectedConsult] = useState<EConsult | null>(null);
  const [physicianName, setPhysicianName] = useState("");
  const [currentView, setCurrentView] = useState<DashboardView>('dashboard');
  const [previousView, setPreviousView] = useState<DashboardView>('submissions-active');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showActionsModal, setShowActionsModal] = useState(false);

  useEffect(() => {
    if (user) {
      fetchConsults();
      fetchPhysicianInfo();
      checkAdminRole();
    }
  }, [user]);

  const checkAdminRole = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('physician_roles')
      .select('role')
      .eq('user_id', user.id)
      .maybeSingle();
    setIsAdmin(data?.role === 'admin');
  };

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
      
      const total = data?.length || 0;
      const active = data?.filter(c => c.status !== 'completed').length || 0;
      const pendingReview = data?.filter(c => c.status === 'under_review').length || 0;
      
      setStats({
        total,
        appointmentsBooked: Math.floor(total * 0.3),
        avgResponseTime: "< 48 hrs",
        urgent: data?.filter(c => c.status === 'awaiting_info').length || 0,
        pendingReview,
        active,
      });
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/signed-out');
  };

  const handleSidebarNavigate = (path: string) => {
    const viewMap: Record<string, DashboardView> = {
      '/provider-dashboard': 'dashboard',
      '/provider-dashboard/support': 'support',
      '/provider-dashboard/submissions/active': 'submissions-active',
      '/provider-dashboard/submissions/archived': 'submissions-archived',
      '/provider-dashboard/responses/active': 'responses-active',
      '/provider-dashboard/responses/archived': 'responses-archived',
      '/provider-dashboard/referrals/active': 'referrals-active',
      '/provider-dashboard/analytics': 'analytics',
      '/provider-dashboard/team': 'team',
      '/provider-dashboard/forms': 'forms',
    };
    setCurrentView(viewMap[path] || 'dashboard');
  };

  const activeConsults = consults.filter(c => c.status !== 'completed');
  const archivedConsults = consults.filter(c => c.status === 'completed');

  const handleViewConsult = (consult: EConsult) => {
    setSelectedConsult(consult);
    setPreviousView(currentView as DashboardView);
    setCurrentView('consult-detail');
  };

  const handleBackFromDetail = () => {
    setSelectedConsult(null);
    setCurrentView(previousView);
  };

  const handleContinueConsultation = () => {
    setShowActionsModal(true);
  };

  const handleMarkComplete = async (feedback: FeedbackData) => {
    if (selectedConsult) {
      // Update the e-consult status to completed
      const { error } = await supabase
        .from('e_consults')
        .update({ status: 'completed' })
        .eq('id', selectedConsult.id);
      
      if (error) {
        toast.error("Failed to mark consultation as complete");
        throw error;
      } else {
        // Log feedback data (in production, this would be saved to a feedback table)
        console.log("Feedback submitted for consult:", selectedConsult.id, feedback);
        toast.success("Consultation marked as complete");
        fetchConsults();
        setSelectedConsult(null);
        setCurrentView(previousView);
      }
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }

    switch (currentView) {
      case 'consult-detail':
        if (selectedConsult) {
          return (
            <EConsultDetailView
              consult={selectedConsult}
              onBack={handleBackFromDetail}
              onContinueConsultation={handleContinueConsultation}
              onMarkComplete={handleMarkComplete}
            />
          );
        }
        return null;
      case 'analytics':
        return <AnalyticsSection isAdmin={isAdmin} />;
      case 'team':
        return <TeamSection />;
      case 'submissions-active':
      case 'responses-active':
        return (
          <EConsultsTable
            consults={activeConsults}
            title="Active Submissions"
            description="E-consults awaiting response"
            onViewConsult={handleViewConsult}
            onViewResponse={handleViewConsult}
            onSubmitNew={() => navigate('/submit-econsult')}
          />
        );
      case 'submissions-archived':
      case 'responses-archived':
        return (
          <EConsultsTable
            consults={archivedConsults}
            title="Archived Submissions"
            description="Completed e-consults"
            onViewConsult={handleViewConsult}
            onViewResponse={handleViewConsult}
          />
        );
      case 'referrals-active':
        return (
          <PatientReferralsTable
            title="Active Patient Referrals"
            description="Patient referrals awaiting processing"
          />
        );
      case 'support':
        return (
          <Card className="bg-card border-border shadow-sm">
            <CardContent className="p-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Support Center</h2>
              <p className="text-muted-foreground mb-6">Need help? Contact our support team.</p>
              <Button>Contact Support</Button>
            </CardContent>
          </Card>
        );
      case 'forms':
        return <FormsSection />;
      default:
        return (
          <DashboardHome
            physicianName={physicianName}
            stats={stats}
            recentConsults={consults}
            onSubmitNew={() => navigate('/submit-econsult')}
            onViewConsult={handleViewConsult}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-secondary">
      {/* Top Navigation */}
      <nav className="bg-card border-b border-border sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0">
                <img src={endoLogo} alt="EndoMD Health" className="h-10 w-auto" />
              </Link>
              <div className="ml-6 border-l border-border pl-6">
                <button 
                  onClick={() => setCurrentView('dashboard')}
                  className="flex flex-col items-start hover:opacity-80 transition-opacity"
                >
                  <span className="text-sm font-semibold text-primary">EndoMD Health</span>
                  <span className="text-lg font-bold text-foreground">Provider Dashboard</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button 
                onClick={() => navigate('/submit-econsult')}
                className="bg-accent hover:bg-accent/90 text-accent-foreground hidden md:flex"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                New E-Consult
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <span className="hidden sm:block text-sm font-medium">
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
                  <DropdownMenuItem><Settings className="mr-2 h-4 w-4" />Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <DashboardSidebar onNavigate={handleSidebarNavigate} />
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>

      {/* Consultation Actions Modal */}
      {selectedConsult && (
        <ConsultationActionsModal
          isOpen={showActionsModal}
          onClose={() => setShowActionsModal(false)}
          consultId={selectedConsult.id}
          patientName={selectedConsult.patient_initials}
        />
      )}
    </div>
  );
};

export default PhysicianDashboard;
