import { 
  LayoutDashboard, 
  MessageSquare, 
  Calendar, 
  FileText, 
  CreditCard 
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const DashboardNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      icon: LayoutDashboard,
      label: 'My Clinical Dashboard',
      href: '/patient-portal/clinical',
    },
    {
      icon: MessageSquare,
      label: 'Message Center',
      href: '/patient-portal/messages',
    },
    {
      icon: Calendar,
      label: 'Appointments',
      href: '/patient-portal/book-appointment',
    },
    {
      icon: FileText,
      label: 'Health Records',
      href: '/patient-portal/clinical',
    },
    {
      icon: CreditCard,
      label: 'Billing Account',
      href: '/patient-portal/billing',
    },
  ];

  return (
    <section className="py-4">
      <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.href;
          return (
            <Button
              key={index}
              onClick={() => navigate(item.href)}
              className={`
                bg-patient-gold hover:bg-patient-gold/90 text-patient-navy font-semibold
                rounded-xl px-5 py-3 h-auto shadow-md hover:shadow-lg
                transition-all duration-300 hover:scale-105
                flex items-center gap-2
                ${isActive ? 'ring-2 ring-patient-navy ring-offset-2' : ''}
              `}
            >
              <item.icon className="h-5 w-5" />
              <span className="hidden sm:inline">{item.label}</span>
              <span className="sm:hidden">{item.label.split(' ')[0]}</span>
            </Button>
          );
        })}
      </div>
    </section>
  );
};

export default DashboardNavigation;
