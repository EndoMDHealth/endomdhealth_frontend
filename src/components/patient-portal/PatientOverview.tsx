import { useState } from 'react';
import { ChevronDown, ChevronUp, Calendar, FileText, Video, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const PatientOverview = () => {
  const [isAppointmentsOpen, setIsAppointmentsOpen] = useState(true);
  const [isLabsOpen, setIsLabsOpen] = useState(true);
  const [isDocumentsOpen, setIsDocumentsOpen] = useState(false);

  const upcomingAppointments = [
    {
      id: 1,
      date: 'Dec 15, 2024',
      time: '10:00 AM',
      provider: 'Dr. Ladan Davallow',
      type: 'Follow-up Visit',
      isVirtual: true,
    },
    {
      id: 2,
      date: 'Jan 8, 2025',
      time: '2:30 PM',
      provider: 'Sarah Johnson, RD',
      type: 'Nutrition Coaching',
      isVirtual: false,
    },
  ];

  const recentLabs = [
    { id: 1, name: 'HbA1c', value: '6.2%', date: 'Nov 28, 2024', status: 'normal' },
    { id: 2, name: 'TSH', value: '2.4 mIU/L', date: 'Nov 28, 2024', status: 'normal' },
    { id: 3, name: 'Fasting Glucose', value: '102 mg/dL', date: 'Nov 28, 2024', status: 'borderline' },
  ];

  const recentDocuments = [
    { id: 1, name: 'Visit Summary - Nov 15, 2024', type: 'PDF' },
    { id: 2, name: 'Lab Results - Nov 28, 2024', type: 'PDF' },
    { id: 3, name: 'Growth Chart Update', type: 'PDF' },
  ];

  return (
    <section className="py-6 space-y-4">
      {/* Upcoming Appointments */}
      <Collapsible open={isAppointmentsOpen} onOpenChange={setIsAppointmentsOpen}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-patient-teal/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-patient-teal" />
                  </div>
                  <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
                </div>
                {isAppointmentsOpen ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {upcomingAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-muted/30 rounded-lg gap-3"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex flex-col items-center justify-center bg-background rounded-lg p-2 min-w-[60px]">
                        <span className="text-xs text-muted-foreground">
                          {apt.date.split(',')[0].split(' ')[0]}
                        </span>
                        <span className="text-lg font-bold text-foreground">
                          {apt.date.split(' ')[1].replace(',', '')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{apt.type}</p>
                        <p className="text-sm text-muted-foreground">{apt.provider}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{apt.time}</span>
                          {apt.isVirtual && (
                            <Badge variant="secondary" className="text-xs">
                              <Video className="h-3 w-3 mr-1" />
                              Virtual
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 sm:flex-col sm:space-x-0 sm:space-y-2">
                      {apt.isVirtual && (
                        <Button size="sm" className="bg-patient-teal hover:bg-patient-teal/90 text-white">
                          Join Visit
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        Reschedule
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Recent Labs */}
      <Collapsible open={isLabsOpen} onOpenChange={setIsLabsOpen}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-patient-coral/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-patient-coral" />
                  </div>
                  <CardTitle className="text-lg">Recent Labs</CardTitle>
                </div>
                {isLabsOpen ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {recentLabs.map((lab) => (
                  <div
                    key={lab.id}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-foreground">{lab.name}</p>
                      <p className="text-xs text-muted-foreground">{lab.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{lab.value}</p>
                      <Badge
                        variant={lab.status === 'normal' ? 'default' : 'secondary'}
                        className={
                          lab.status === 'normal'
                            ? 'bg-green-100 text-green-700 hover:bg-green-100'
                            : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                        }
                      >
                        {lab.status === 'normal' ? 'Normal' : 'Borderline'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View Full Report
              </Button>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Recent Documents */}
      <Collapsible open={isDocumentsOpen} onOpenChange={setIsDocumentsOpen}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-patient-gold/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-patient-gold" />
                  </div>
                  <CardTitle className="text-lg">Recent Documents</CardTitle>
                </div>
                {isDocumentsOpen ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {recentDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{doc.name}</span>
                    </div>
                    <Badge variant="outline">{doc.type}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </section>
  );
};

export default PatientOverview;
