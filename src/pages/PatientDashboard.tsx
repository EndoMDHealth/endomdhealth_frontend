import { useAuth } from '@/hooks/useAuth';
import PatientPortalHeader from '@/components/patient-portal/PatientPortalHeader';
import WelcomeSection from '@/components/patient-portal/WelcomeSection';
import PrimaryActionCards from '@/components/patient-portal/PrimaryActionCards';
import SecondaryActionCards from '@/components/patient-portal/SecondaryActionCards';
import QuickShortcuts from '@/components/patient-portal/QuickShortcuts';
import PatientOverview from '@/components/patient-portal/PatientOverview';
import ResourcesSection from '@/components/patient-portal/ResourcesSection';
import Footer from '@/components/Footer';

const PatientDashboard = () => {
  const { user } = useAuth();
  
  // Get first name from user metadata or email
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 
                    user?.email?.split('@')[0] || 
                    'Patient';

  return (
    <div className="min-h-screen bg-patient-bg flex flex-col">
      <PatientPortalHeader firstName={firstName} />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 pb-12">
          <WelcomeSection firstName={firstName} />
          
          {/* Primary Action Cards */}
          <PrimaryActionCards />
          
          {/* Quick Shortcuts */}
          <QuickShortcuts />
          
          {/* Secondary Action Cards */}
          <SecondaryActionCards />
          
          {/* Patient Overview (Collapsible Panels) */}
          <PatientOverview />
          
          {/* Resources Section */}
          <ResourcesSection />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PatientDashboard;
