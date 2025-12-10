import { CreditCard, Video, CalendarCheck, Receipt } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const SecondaryActionCards = () => {
  const navigate = useNavigate();

  const secondaryActions = [
    {
      icon: CreditCard,
      title: 'Manage Invoices & Payment Methods',
      description: 'View and pay invoices, update payment info',
      href: '/patient-portal/invoices',
    },
    {
      icon: Video,
      title: 'Access Recorded Coaching Sessions',
      description: 'Review past nutrition and lifestyle sessions',
      href: '/patient-portal/coaching-sessions',
    },
    {
      icon: CalendarCheck,
      title: 'See Nutrition Coaching Schedule',
      description: 'View upcoming coaching appointments',
      href: '/patient-portal/nutrition-schedule',
    },
    {
      icon: Receipt,
      title: 'Manage My Billing Account',
      description: 'Update billing details and view history',
      href: '/patient-portal/billing',
    },
  ];

  return (
    <section className="py-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">More Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {secondaryActions.map((action, index) => (
          <Card
            key={index}
            onClick={() => navigate(action.href)}
            className="cursor-pointer transition-all duration-300 hover:shadow-md hover:border-patient-teal/50 border group"
          >
            <CardContent className="p-5 flex items-start space-x-4">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 group-hover:bg-patient-teal/10 transition-colors">
                <action.icon className="h-5 w-5 text-patient-teal" />
              </div>
              <div>
                <h3 className="font-medium text-foreground text-sm mb-1">{action.title}</h3>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default SecondaryActionCards;
