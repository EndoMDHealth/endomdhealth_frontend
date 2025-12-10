import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, Video, Apple, Check, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import PatientPortalHeader from '@/components/patient-portal/PatientPortalHeader';
import Footer from '@/components/Footer';
import drDavallow from '@/assets/dr-davallow.png';
import happyChild from '@/assets/child-grass-happy.jpg';

const BookAppointment = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Patient';

  const [step, setStep] = useState(1);
  const [appointmentType, setAppointmentType] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const appointmentTypes = [
    { id: 'in-person', title: 'In-Person Visit', icon: Building2, description: 'Visit our clinic for a comprehensive consultation' },
    { id: 'virtual', title: 'Virtual Visit', icon: Video, description: 'Meet with your provider via secure video call' },
    { id: 'nutrition', title: 'Nutrition Coaching', icon: Apple, description: 'Personalized nutrition and lifestyle guidance' },
  ];

  const providers = [
    { id: 'dr-davallow', name: 'Dr. Ladan Davallow', specialty: 'Pediatric Endocrinology', image: drDavallow },
  ];

  // Generate calendar dates
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const isDateAvailable = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const dayOfWeek = date.getDay();
    // Available Mon-Fri, not past dates
    return dayOfWeek !== 0 && dayOfWeek !== 6 && date >= today;
  };

  const timeSlots = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM'];

  const handleConfirmAppointment = () => {
    toast.success('Appointment confirmed! You will receive a confirmation email shortly.');
    setStep(5);
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Empty cells for days before the first day
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2" />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isAvailable = isDateAvailable(day);
      const isSelected = selectedDate && 
        selectedDate.getDate() === day && 
        selectedDate.getMonth() === currentMonth && 
        selectedDate.getFullYear() === currentYear;

      days.push(
        <button
          key={day}
          onClick={() => isAvailable && setSelectedDate(new Date(currentYear, currentMonth, day))}
          disabled={!isAvailable}
          className={`p-2 rounded-lg text-sm font-medium transition-all ${
            isSelected
              ? 'bg-patient-teal text-white'
              : isAvailable
                ? 'bg-white hover:bg-patient-teal/20 text-patient-navy border border-gray-200'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="min-h-screen bg-patient-bg flex flex-col">
      <PatientPortalHeader firstName={firstName} />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          {/* Back Button & Title */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => step > 1 ? setStep(step - 1) : navigate('/patient-dashboard')}
              className="mb-4 text-patient-navy hover:bg-patient-teal/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {step > 1 ? 'Back' : 'Back to Dashboard'}
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-patient-navy text-center">
              Book an Appointment
            </h1>
            <p className="text-center text-muted-foreground mt-2">
              Schedule your next visit with EndoMD Health
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= s ? 'bg-patient-teal text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step > s ? <Check className="h-4 w-4" /> : s}
                  </div>
                  {s < 4 && <div className={`w-8 h-1 ${step > s ? 'bg-patient-teal' : 'bg-gray-200'}`} />}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Appointment Type */}
          {step === 1 && (
            <section>
              <h2 className="text-xl font-semibold text-patient-navy text-center mb-6">
                What type of appointment would you like?
              </h2>
              <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {appointmentTypes.map((type) => (
                  <Card
                    key={type.id}
                    onClick={() => {
                      setAppointmentType(type.id);
                      setStep(2);
                    }}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
                      appointmentType === type.id ? 'border-patient-teal bg-patient-teal/5' : 'border-transparent hover:border-patient-teal'
                    }`}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 rounded-full bg-patient-teal/10 flex items-center justify-center mx-auto mb-4">
                        <type.icon className="h-8 w-8 text-patient-teal" />
                      </div>
                      <h3 className="font-semibold text-patient-navy mb-2">{type.title}</h3>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Step 2: Provider Selection */}
          {step === 2 && (
            <section className="max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold text-patient-navy text-center mb-6">
                Select Your Provider
              </h2>
              <Card>
                <CardContent className="p-6">
                  <Select value={selectedProvider} onValueChange={(value) => {
                    setSelectedProvider(value);
                    setStep(3);
                  }}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {providers.map((provider) => (
                        <SelectItem key={provider.id} value={provider.id}>
                          <div className="flex items-center gap-3">
                            <img src={provider.image} alt={provider.name} className="w-8 h-8 rounded-full object-cover" />
                            <div>
                              <p className="font-medium">{provider.name}</p>
                              <p className="text-xs text-muted-foreground">{provider.specialty}</p>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Step 3: Calendar */}
          {step === 3 && (
            <section className="max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold text-patient-navy text-center mb-6">
                Choose a Date & Time
              </h2>
              <Card>
                <CardContent className="p-6">
                  {/* Calendar Navigation */}
                  <div className="flex items-center justify-between mb-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (currentMonth === 0) {
                          setCurrentMonth(11);
                          setCurrentYear(currentYear - 1);
                        } else {
                          setCurrentMonth(currentMonth - 1);
                        }
                      }}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="font-semibold text-patient-navy">
                      {monthNames[currentMonth]} {currentYear}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (currentMonth === 11) {
                          setCurrentMonth(0);
                          setCurrentYear(currentYear + 1);
                        } else {
                          setCurrentMonth(currentMonth + 1);
                        }
                      }}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1 mb-6">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div key={day} className="p-2 text-center text-xs font-medium text-muted-foreground">
                        {day}
                      </div>
                    ))}
                    {renderCalendar()}
                  </div>

                  {/* Time Slots */}
                  {selectedDate && (
                    <div>
                      <h3 className="font-medium text-patient-navy mb-3 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Available Times for {selectedDate.toLocaleDateString()}
                      </h3>
                      <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
                        {timeSlots.map((time) => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => {
                              setSelectedTime(time);
                              setStep(4);
                            }}
                            className={selectedTime === time 
                              ? 'bg-patient-navy text-white' 
                              : 'border-patient-navy text-patient-navy hover:bg-patient-navy hover:text-white'
                            }
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </section>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <section className="max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold text-patient-navy text-center mb-6">
                Confirm Your Appointment
              </h2>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="grid gap-4">
                    <div className="flex justify-between items-center py-3 border-b">
                      <span className="text-muted-foreground">Appointment Type</span>
                      <span className="font-medium text-patient-navy capitalize">
                        {appointmentType?.replace('-', ' ')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b">
                      <span className="text-muted-foreground">Provider</span>
                      <span className="font-medium text-patient-navy">
                        {providers.find(p => p.id === selectedProvider)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b">
                      <span className="text-muted-foreground">Date</span>
                      <span className="font-medium text-patient-navy">
                        {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b">
                      <span className="text-muted-foreground">Time</span>
                      <span className="font-medium text-patient-navy">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b">
                      <span className="text-muted-foreground">Location</span>
                      <span className="font-medium text-patient-navy">
                        {appointmentType === 'virtual' ? 'Virtual Visit (link will be emailed)' : 'EndoMD Health Clinic'}
                      </span>
                    </div>
                  </div>

                  <Button 
                    onClick={handleConfirmAppointment}
                    className="w-full bg-patient-teal hover:bg-patient-teal/90 mt-6"
                    size="lg"
                  >
                    <Check className="h-5 w-5 mr-2" />
                    Confirm Appointment
                  </Button>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Step 5: Success */}
          {step === 5 && (
            <section className="max-w-2xl mx-auto text-center">
              <Card>
                <CardContent className="p-8">
                  <div className="mb-6">
                    <img 
                      src={happyChild} 
                      alt="Happy child" 
                      className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                    />
                  </div>
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-patient-navy mb-2">Appointment Confirmed!</h2>
                  <p className="text-muted-foreground mb-6">
                    You will receive a confirmation email with all the details.
                  </p>
                  <Button 
                    onClick={() => navigate('/patient-dashboard')}
                    className="bg-patient-teal hover:bg-patient-teal/90"
                  >
                    Return to Dashboard
                  </Button>
                </CardContent>
              </Card>
            </section>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookAppointment;
