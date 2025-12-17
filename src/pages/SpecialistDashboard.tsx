import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  User,
  LogOut,
  Settings,
  Loader2,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Activity,
} from "lucide-react";
import endoLogo from "@/assets/logos/endo_yellow.png";
import { SpecialistSidebar } from "@/components/specialist/SpecialistSidebar";
import { SpecialistConsultsTable } from "@/components/specialist/SpecialistConsultsTable";
import { SpecialistDetailView } from "@/components/specialist/SpecialistDetailView";
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

type DashboardView = 'dashboard' | 'consults-new' | 'consults-in-progress' | 'consults-completed' | 'archive' | 'settings' | 'support' | 'consult-detail';

const SpecialistDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [consults, setConsults] = useState<EConsult[]>([]);
  const [loading, setLoading] = useState(true);
  const [specialistName, setSpecialistName] = useState("");
  const [currentView, setCurrentView] = useState<DashboardView>('dashboard');
  const [selectedConsult, setSelectedConsult] = useState<EConsult | null>(null);
  const [previousView, setPreviousView] = useState<DashboardView>('consults-new');

  useEffect(() => {
    if (user) {
      fetchConsults();
      fetchSpecialistInfo();
    }
  }, [user]);

  const fetchSpecialistInfo = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .maybeSingle();
    
    if (data?.full_name) {
      setSpecialistName(data.full_name);
    } else {
      setSpecialistName(user.email?.split('@')[0] || 'Specialist');
    }
  };

  const fetchConsults = async () => {
    if (!user) return;
    setLoading(true);
    
    // Specialists can see all consults
    const { data, error } = await supabase
      .from('e_consults')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching consults:', error);
      toast.error("Failed to load e-consults");
    } else {
      setConsults(data || []);
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/signed-out');
  };

  const handleSidebarNavigate = (path: string) => {
    const viewMap: Record<string, DashboardView> = {
      '/specialist-dashboard': 'dashboard',
      '/specialist-dashboard/consults/new': 'consults-new',
      '/specialist-dashboard/consults/in-progress': 'consults-in-progress',
      '/specialist-dashboard/consults/completed': 'consults-completed',
      '/specialist-dashboard/archive': 'archive',
      '/specialist-dashboard/settings': 'settings',
      '/specialist-dashboard/support': 'support',
    };
    setCurrentView(viewMap[path] || 'dashboard');
    setSelectedConsult(null);
  };

  const handleViewConsult = (consult: EConsult) => {
    setSelectedConsult(consult);
    setPreviousView(currentView as DashboardView);
    setCurrentView('consult-detail');
  };

  const handleRespondConsult = (consult: EConsult) => {
    setSelectedConsult(consult);
    setPreviousView(currentView as DashboardView);
    setCurrentView('consult-detail');
  };

  const handleBackFromDetail = () => {
    setSelectedConsult(null);
    setCurrentView(previousView);
  };

  const handleSubmitResponse = async (consultId: string, response: string) => {
    const { error } = await supabase
      .from('e_consults')
      .update({ 
        response_notes: response,
        responded_at: new Date().toISOString(),
        responded_by: user?.id,
        status: 'completed'
      })
      .eq('id', consultId);

    if (error) {
      throw error;
    }
    
    fetchConsults();
    handleBackFromDetail();
  };

  const handleSaveDraft = async (consultId: string, draft: string) => {
    const { error } = await supabase
      .from('e_consults')
      .update({ 
        response_notes: draft,
        status: 'under_review'
      })
      .eq('id', consultId);

    if (error) {
      throw error;
    }
    
    fetchConsults();
  };

  // Filter consults by status
  const newConsults = consults.filter(c => c.status === 'submitted');
  const inProgressConsults = consults.filter(c => c.status === 'under_review' || c.status === 'awaiting_info');
  const completedConsults = consults.filter(c => c.status === 'completed');

  // Stats for dashboard
  const stats = {
    total: consults.length,
    newRequests: newConsults.length,
    inProgress: inProgressConsults.length,
    completed: completedConsults.length,
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </div>
      );
    }

    switch (currentView) {
      case 'consult-detail':
        if (selectedConsult) {
          return (
            <SpecialistDetailView
              consult={selectedConsult}
              onBack={handleBackFromDetail}
              onSubmitResponse={handleSubmitResponse}
              onSaveDraft={handleSaveDraft}
            />
          );
        }
        return null;

      case 'consults-new':
        return (
          <SpecialistConsultsTable
            consults={newConsults}
            title="New e-Consult Requests"
            description="Incoming consults awaiting your review"
            onViewConsult={handleViewConsult}
            onRespondConsult={handleRespondConsult}
          />
        );

      case 'consults-in-progress':
        return (
          <SpecialistConsultsTable
            consults={inProgressConsults}
            title="In Progress"
            description="Consults you're currently working on"
            onViewConsult={handleViewConsult}
            onRespondConsult={handleRespondConsult}
          />
        );

      case 'consults-completed':
      case 'archive':
        return (
          <SpecialistConsultsTable
            consults={completedConsults}
            title="Completed Consults"
            description="Previously responded e-consults"
            onViewConsult={handleViewConsult}
            onRespondConsult={handleRespondConsult}
          />
        );

      case 'support':
        return (
          <Card className="bg-card border-border shadow-sm">
            <CardContent className="p-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Support Center</h2>
              <p className="text-muted-foreground mb-6">Need help? Contact our support team.</p>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        );

      case 'settings':
        return (
          <Card className="bg-card border-border shadow-sm">
            <CardContent className="p-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Settings</h2>
              <p className="text-muted-foreground mb-6">Manage your account settings and preferences.</p>
            </CardContent>
          </Card>
        );

      default:
        // Dashboard home
        return (
          <div className="space-y-6">
            {/* Welcome Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Welcome, Dr. {specialistName.split(' ').pop()}
                </h1>
                <p className="text-muted-foreground">
                  Here's an overview of your e-Consult activity
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Total Consults
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{stats.total}</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    New Requests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-blue-600">{stats.newRequests}</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    In Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-amber-600">{stats.inProgress}</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Completed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Action */}
            {newConsults.length > 0 && (
              <Card className="bg-accent/10 border-accent/30">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        You have {newConsults.length} new e-Consult{newConsults.length > 1 ? 's' : ''} awaiting review
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Review and respond to incoming requests from referring PCPs
                      </p>
                    </div>
                    <Button 
                      onClick={() => setCurrentView('consults-new')}
                      className="bg-accent hover:bg-accent/90 text-accent-foreground"
                    >
                      View New Requests
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Consults Table */}
            <SpecialistConsultsTable
              consults={consults.slice(0, 5)}
              title="Recent e-Consults"
              description="Your most recent consultations"
              onViewConsult={handleViewConsult}
              onRespondConsult={handleRespondConsult}
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-secondary">
      {/* Top Navigation */}
      <nav className="bg-background border-b border-border sticky top-0 z-50">
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
                  <span className="text-sm font-semibold text-accent">EndoMD Health</span>
                  <span className="text-lg font-bold text-foreground">Specialist Dashboard</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Notification indicator */}
              {newConsults.length > 0 && (
                <div className="hidden md:flex items-center gap-2 bg-accent/20 text-accent px-3 py-1.5 rounded-full text-sm">
                  <Activity className="h-4 w-4" />
                  <span>{newConsults.length} new</span>
                </div>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 text-foreground hover:text-foreground hover:bg-muted">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <span className="hidden sm:block text-sm font-medium">
                      Dr. {specialistName.split(' ').pop()}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium">{specialistName}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                    <p className="text-xs text-accent mt-1">Pediatric Endocrinologist</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setCurrentView('settings')}>
                    <Settings className="mr-2 h-4 w-4" />Settings
                  </DropdownMenuItem>
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
        <SpecialistSidebar onNavigate={handleSidebarNavigate} currentView={currentView} />
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default SpecialistDashboard;
