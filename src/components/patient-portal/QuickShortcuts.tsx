import { Calendar, FileText, MessageCircle, Pill } from 'lucide-react';
import { Button } from '@/components/ui/button';

const QuickShortcuts = () => {
  const shortcuts = [
    { icon: Calendar, label: 'View Upcoming Appointments' },
    { icon: FileText, label: 'View My Lab Results' },
    { icon: MessageCircle, label: 'Message My Care Team' },
    { icon: Pill, label: 'Request Prescription Renewal' },
  ];

  return (
    <section className="py-6">
      <div className="flex flex-wrap gap-3 justify-center">
        {shortcuts.map((shortcut, index) => (
          <Button
            key={index}
            variant="outline"
            className="flex items-center space-x-2 px-4 py-2 h-auto border-border hover:border-patient-teal hover:bg-patient-teal/5 transition-all"
          >
            <shortcut.icon className="h-4 w-4 text-patient-teal" />
            <span className="text-sm">{shortcut.label}</span>
          </Button>
        ))}
      </div>
    </section>
  );
};

export default QuickShortcuts;
