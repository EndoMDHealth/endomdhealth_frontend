import { MessageCircle, Calendar, Upload, CreditCard } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const QuickShortcuts = () => {
  const navigate = useNavigate();

  const shortcuts = [
    { 
      icon: MessageCircle, 
      title: 'Message Your Care Team',
      description: 'Send secure messages to your providers',
      href: '/patient-portal/messages'
    },
    { 
      icon: Calendar, 
      title: 'Book an Appointment',
      description: 'Schedule, reschedule, or cancel visits',
      href: '/patient-portal/book-appointment'
    },
    { 
      icon: Upload, 
      title: 'Upload Labs or Imaging',
      description: 'Upload PDFs, photos, or scanned documents',
      href: '/patient-portal/upload-labs'
    },
    { 
      icon: CreditCard, 
      title: 'Pay an Invoice',
      description: 'View and pay your outstanding invoices',
      href: '/patient-portal/invoices'
    },
  ];

  return (
    <section className="py-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">Quick Tasks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {shortcuts.map((shortcut, index) => (
          <Card
            key={index}
            onClick={() => navigate(shortcut.href)}
            className="cursor-pointer transition-all duration-300 hover:shadow-lg border-2 border-patient-gold/30 hover:border-patient-gold group bg-patient-gold/5"
          >
            <CardContent className="p-6 flex flex-col items-center text-center h-full">
              <div className="w-14 h-14 rounded-xl bg-patient-gold flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <shortcut.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-lg">{shortcut.title}</h3>
              <p className="text-sm text-muted-foreground">{shortcut.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default QuickShortcuts;
