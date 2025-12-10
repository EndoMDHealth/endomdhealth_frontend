import { useState } from 'react';
import { Stethoscope, Calendar, Clock, Video, Phone, MessageSquare, MapPin, User, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import happyChild from '@/assets/child-grass-happy.jpg';
import drDavallow from '@/assets/dr-davallow-green.png';

const DoctorSection = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const upcomingAppointments = [
    {
      id: 1,
      date: '2024-12-15',
      time: '10:00 AM',
      provider: 'Dr. Ladan Davallow',
      providerImage: drDavallow,
      type: 'Follow-up Visit',
      location: 'EndoMD Health Clinic',
      address: '456 Medical Center Dr, Springfield, VA',
      isVirtual: false,
    },
    {
      id: 2,
      date: '2024-12-22',
      time: '2:30 PM',
      provider: 'Dr. Ladan Davallow',
      providerImage: drDavallow,
      type: 'Virtual Consultation',
      location: 'Telehealth',
      address: '',
      isVirtual: true,
    },
  ];

  const pastVisits = [
    { id: 1, date: '2024-12-01', provider: 'Dr. Ladan Davallow', type: 'Growth Monitoring', hasSummary: true },
    { id: 2, date: '2024-10-15', provider: 'Dr. Ladan Davallow', type: 'Initial Consultation', hasSummary: true },
    { id: 3, date: '2024-08-20', provider: 'Dr. Ladan Davallow', type: 'Thyroid Follow-up', hasSummary: true },
  ];

  const providers = [
    {
      id: 1,
      name: 'Dr. Ladan Davallow',
      image: drDavallow,
      specialty: 'Pediatric Endocrinology',
      phone: '(703) 555-1234',
      email: 'dr.davallow@endomdhealth.com',
      acceptingPatients: true,
    },
  ];

  const handleReschedule = (appointmentId: number) => {
    toast.info('Redirecting to reschedule...');
  };

  const handleJoinVirtual = () => {
    toast.info('Opening virtual visit...');
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="bg-white rounded-xl p-1 shadow-sm border border-gray-100 flex-wrap">
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-patient-teal/10 data-[state=active]:text-patient-teal rounded-lg">
            <Calendar className="h-4 w-4 text-patient-gold mr-2" />
            Upcoming Appointments
          </TabsTrigger>
          <TabsTrigger value="past" className="data-[state=active]:bg-patient-teal/10 data-[state=active]:text-patient-teal rounded-lg">
            <Clock className="h-4 w-4 text-patient-gold mr-2" />
            Past Visits
          </TabsTrigger>
          <TabsTrigger value="providers" className="data-[state=active]:bg-patient-teal/10 data-[state=active]:text-patient-teal rounded-lg">
            <User className="h-4 w-4 text-patient-gold mr-2" />
            Provider Directory
          </TabsTrigger>
        </TabsList>

        {/* Upcoming Appointments */}
        <TabsContent value="upcoming" className="mt-4">
          <div className="flex justify-end mb-4">
            <Button className="bg-patient-teal hover:bg-patient-teal/90">
              <Plus className="h-4 w-4 mr-2" />
              Schedule New Appointment
            </Button>
          </div>
          {upcomingAppointments.length > 0 ? (
            <div className="space-y-4">
              {upcomingAppointments.map((apt) => (
                <Card key={apt.id} className={`border-0 shadow-sm ${apt.isVirtual ? 'border-l-4 border-l-patient-teal' : 'border-l-4 border-l-patient-gold'}`}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${apt.isVirtual ? 'bg-patient-teal/10' : 'bg-patient-gold/10'}`}>
                          {apt.isVirtual ? (
                            <Video className="h-6 w-6 text-patient-teal" />
                          ) : (
                            <Stethoscope className="h-6 w-6 text-patient-gold" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-patient-navy">{apt.type}</p>
                          <p className="text-sm text-patient-teal font-medium">{apt.provider}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-patient-navy border-patient-navy/20">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(apt.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                            </Badge>
                            <Badge variant="outline" className="text-patient-navy border-patient-navy/20">
                              <Clock className="h-3 w-3 mr-1" />
                              {apt.time}
                            </Badge>
                          </div>
                          {!apt.isVirtual && (
                            <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {apt.address}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {apt.isVirtual && (
                          <Button onClick={handleJoinVirtual} className="bg-patient-teal hover:bg-patient-teal/90">
                            <Video className="h-4 w-4 mr-2" />
                            Join Virtual Visit
                          </Button>
                        )}
                        <Button variant="outline" onClick={() => handleReschedule(apt.id)} className="border-patient-navy text-patient-navy">
                          Reschedule
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-0 shadow-sm">
              <CardContent className="py-12 text-center">
                <img src={happyChild} alt="Happy child" className="w-32 h-32 object-cover rounded-full mx-auto mb-4 opacity-80" />
                <p className="text-muted-foreground mb-4">No upcoming appointments</p>
                <Button className="bg-patient-teal hover:bg-patient-teal/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule an Appointment
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Past Visits */}
        <TabsContent value="past" className="mt-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              {pastVisits.length > 0 ? (
                <div className="space-y-3">
                  {pastVisits.map((visit) => (
                    <div key={visit.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-patient-bg rounded-xl gap-4">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-patient-teal/10">
                          <Stethoscope className="h-5 w-5 text-patient-teal" />
                        </div>
                        <div>
                          <p className="font-medium text-patient-navy">{visit.type}</p>
                          <p className="text-sm text-muted-foreground">{visit.provider} • {visit.date}</p>
                        </div>
                      </div>
                      {visit.hasSummary && (
                        <Button variant="outline" size="sm" className="border-patient-teal text-patient-teal hover:bg-patient-teal hover:text-white">
                          View Summary
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <img src={happyChild} alt="Happy child" className="w-32 h-32 object-cover rounded-full mx-auto mb-4 opacity-80" />
                  <p className="text-muted-foreground">No past visits found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Provider Directory */}
        <TabsContent value="providers" className="mt-4">
          <div className="flex justify-end mb-4">
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                <SelectItem value="endocrinology">Pediatric Endocrinology</SelectItem>
                <SelectItem value="nutrition">Nutrition Coaching</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-4">
            {providers.map((provider) => (
              <Card key={provider.id} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={provider.image}
                        alt={provider.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-patient-teal/20"
                      />
                      <div>
                        <p className="font-semibold text-patient-navy">{provider.name}</p>
                        <p className="text-sm text-patient-teal">{provider.specialty}</p>
                        {provider.acceptingPatients && (
                          <Badge className="mt-2 bg-green-100 text-green-700 hover:bg-green-100">
                            Accepting New Patients
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="border-patient-navy text-patient-navy">
                        <Phone className="h-4 w-4 mr-2" />
                        {provider.phone}
                      </Button>
                      <Button variant="outline" size="sm" className="border-patient-teal text-patient-teal hover:bg-patient-teal hover:text-white">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DoctorSection;
