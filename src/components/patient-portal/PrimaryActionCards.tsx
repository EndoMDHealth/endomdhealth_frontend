import { ExternalLink, Calendar, Upload, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const PrimaryActionCards = () => {
  const primaryActions = [
    {
      icon: ExternalLink,
      title: 'Access My Clinical Patient Portal',
      description: 'View labs, visit summaries, medications, and documents',
      color: 'bg-patient-teal',
      hoverColor: 'hover:border-patient-teal',
    },
    {
      icon: Calendar,
      title: 'Book an Appointment',
      description: 'Schedule, reschedule, or cancel visits',
      color: 'bg-patient-coral',
      hoverColor: 'hover:border-patient-coral',
    },
    {
      icon: Upload,
      title: 'Upload Labs or Imaging',
      description: 'Upload PDFs, photos, or scanned documents',
      color: 'bg-patient-gold',
      hoverColor: 'hover:border-patient-gold',
    },
    {
      icon: MapPin,
      title: 'Find Labs Near Me',
      description: 'Locate nearby lab facilities',
      color: 'bg-primary',
      hoverColor: 'hover:border-primary',
    },
  ];

  return (
    <section className="py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {primaryActions.map((action, index) => (
          <Card
            key={index}
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 border-transparent ${action.hoverColor} group`}
          >
            <CardContent className="p-6 flex flex-col items-center text-center h-full">
              <div className={`w-14 h-14 rounded-xl ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <action.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-lg">{action.title}</h3>
              <p className="text-sm text-muted-foreground">{action.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PrimaryActionCards;
