import { useLocation, useNavigate } from 'react-router-dom';
import { 
  User, 
  Pill, 
  Stethoscope, 
  FileHeart, 
  ClipboardList, 
  Shield, 
  HelpCircle, 
  Settings,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuItem {
  icon: React.ElementType;
  label: string;
  href: string;
  description?: string;
}

const menuItems: MenuItem[] = [
  { icon: User, label: 'My Profile', href: '#profile', description: 'Personal information & contact' },
  { icon: Pill, label: 'Prescriptions', href: '#prescriptions', description: 'Medications & refills' },
  { icon: Stethoscope, label: 'See My Doctor', href: '#appointments', description: 'Appointments & visits' },
  { icon: FileHeart, label: 'Health Record', href: '#health-record', description: 'Labs, imaging & summaries' },
  { icon: ClipboardList, label: 'Treatment Plan', href: '#treatment', description: 'Care plan & progress' },
  { icon: Shield, label: 'Insurance Information', href: '#insurance', description: 'Coverage & documents' },
  { icon: HelpCircle, label: 'Support', href: '#support', description: 'FAQs & help' },
  { icon: Settings, label: 'Settings', href: '#settings', description: 'Preferences & security' },
];

interface ClinicalPortalSidebarProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

const ClinicalPortalSidebar = ({ activeSection = 'health-record', onSectionChange }: ClinicalPortalSidebarProps) => {
  const navigate = useNavigate();

  const handleClick = (href: string) => {
    const section = href.replace('#', '');
    if (onSectionChange) {
      onSectionChange(section);
    }
  };

  return (
    <aside className="w-64 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 h-fit sticky top-24">
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const isActive = activeSection === item.href.replace('#', '');
          return (
            <button
              key={item.label}
              onClick={() => handleClick(item.href)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200 group",
                isActive 
                  ? "bg-patient-teal/10 text-patient-teal" 
                  : "text-patient-navy hover:bg-patient-bg hover:text-patient-teal"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 flex-shrink-0 transition-colors",
                isActive ? "text-patient-gold" : "text-patient-navy/60 group-hover:text-patient-gold"
              )} />
              <div className="flex-1 min-w-0">
                <p className={cn(
                  "font-medium text-sm truncate",
                  isActive && "text-patient-teal"
                )}>
                  {item.label}
                </p>
              </div>
              <ChevronRight className={cn(
                "h-4 w-4 flex-shrink-0 opacity-0 -translate-x-2 transition-all",
                isActive ? "opacity-100 translate-x-0" : "group-hover:opacity-50 group-hover:translate-x-0"
              )} />
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default ClinicalPortalSidebar;
