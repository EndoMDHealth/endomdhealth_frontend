import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import PatientPortalHeader from '@/components/patient-portal/PatientPortalHeader';
import ClinicalPortalSidebar from '@/components/patient-portal/ClinicalPortalSidebar';
import ProfileSection from '@/components/patient-portal/clinical/ProfileSection';
import PrescriptionsSection from '@/components/patient-portal/clinical/PrescriptionsSection';
import DoctorSection from '@/components/patient-portal/clinical/DoctorSection';
import HealthRecordSection from '@/components/patient-portal/clinical/HealthRecordSection';
import TreatmentPlanSection from '@/components/patient-portal/clinical/TreatmentPlanSection';
import InsuranceSection from '@/components/patient-portal/clinical/InsuranceSection';
import SupportSection from '@/components/patient-portal/clinical/SupportSection';
import SettingsSection from '@/components/patient-portal/clinical/SettingsSection';
import Footer from '@/components/Footer';
import heroImage from '@/assets/diverse-children-clinical.jpg';

const ClinicalPortal = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Patient';
  const [activeSection, setActiveSection] = useState('health-record');

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSection />;
      case 'prescriptions':
        return <PrescriptionsSection />;
      case 'appointments':
        return <DoctorSection />;
      case 'health-record':
        return <HealthRecordSection />;
      case 'treatment':
        return <TreatmentPlanSection />;
      case 'insurance':
        return <InsuranceSection />;
      case 'support':
        return <SupportSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <HealthRecordSection />;
    }
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'profile': return 'My Profile';
      case 'prescriptions': return 'Prescriptions';
      case 'appointments': return 'See My Doctor';
      case 'health-record': return 'Health Record';
      case 'treatment': return 'Treatment Plan';
      case 'insurance': return 'Insurance Information';
      case 'support': return 'Support';
      case 'settings': return 'Settings';
      default: return 'Health Record';
    }
  };

  return (
    <div className="min-h-screen bg-patient-bg flex flex-col">
      <PatientPortalHeader firstName={firstName} />
      
      <main className="flex-1">
        {/* Hero Header Image */}
        <div className="relative h-40 md:h-48 overflow-hidden">
          <img 
            src={heroImage} 
            alt="Clinical Portal" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-patient-navy/80 to-patient-navy/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <h1 className="text-2xl md:text-4xl font-bold mb-2">Clinical Patient Portal</h1>
            <p className="text-white/80 text-sm md:text-base">{getSectionTitle()}</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate('/patient-dashboard')}
            className="mb-4 text-patient-navy hover:bg-patient-teal/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <div className="hidden lg:block">
              <ClinicalPortalSidebar 
                activeSection={activeSection} 
                onSectionChange={setActiveSection} 
              />
            </div>

            {/* Mobile Menu */}
            <div className="lg:hidden">
              <select
                value={activeSection}
                onChange={(e) => setActiveSection(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 bg-white text-patient-navy font-medium"
              >
                <option value="profile">My Profile</option>
                <option value="prescriptions">Prescriptions</option>
                <option value="appointments">See My Doctor</option>
                <option value="health-record">Health Record</option>
                <option value="treatment">Treatment Plan</option>
                <option value="insurance">Insurance Information</option>
                <option value="support">Support</option>
                <option value="settings">Settings</option>
              </select>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {renderSection()}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ClinicalPortal;
