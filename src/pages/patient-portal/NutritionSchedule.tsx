import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CalendarCheck, Calendar, Clock, User, Bell, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import PatientPortalHeader from '@/components/patient-portal/PatientPortalHeader';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import happyChild from '@/assets/child-grass-happy.jpg';

const NutritionSchedule = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Patient';

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [filterCoach, setFilterCoach] = useState('all');

  // Sample data
  const upcomingSessions = [
    {
      id: 1,
      date: '2024-12-15',
      time: '10:00 AM',
      coach: 'Sarah Johnson, RD',
      topic: 'Meal Planning for Growing Kids',
      type: 'nutrition',
    },
    {
      id: 2,
      date: '2024-12-18',
      time: '2:30 PM',
      coach: 'Mike Thompson, CPT',
      topic: 'Exercise & Energy Balance',
      type: 'lifestyle',
    },
    {
      id: 3,
      date: '2024-12-22',
      time: '11:00 AM',
      coach: 'Sarah Johnson, RD',
      topic: 'Healthy Snacking Strategies',
      type: 'nutrition',
    },
  ];

  // Generate calendar days for the current month
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];
    
    // Empty cells for days before the first of the month
    for (let i = 0; i < startingDay; i++) {
      days.push({ day: null, hasSession: false });
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const hasSession = upcomingSessions.some(s => s.date === dateStr);
      days.push({ day, hasSession, date: dateStr });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  const navigateMonth = (direction: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1));
  };

  const handleAddToCalendar = (session: typeof upcomingSessions[0]) => {
    toast.success(`Added "${session.topic}" to your calendar`);
  };

  const handleSetReminder = (session: typeof upcomingSessions[0]) => {
    toast.success(`Reminder set for "${session.topic}"`);
  };

  const filteredSessions = filterCoach === 'all'
    ? upcomingSessions
    : upcomingSessions.filter(s => s.coach.includes(filterCoach));

  return (
    <div className="min-h-screen bg-patient-bg flex flex-col">
      <PatientPortalHeader firstName={firstName} />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          {/* Back Button & Title */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/patient-dashboard')}
              className="mb-4 text-patient-navy hover:bg-patient-teal/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-patient-navy text-center">
              Nutrition Coaching Schedule
            </h1>
            <p className="text-center text-muted-foreground mt-2">
              View and manage your upcoming coaching sessions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar View */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-patient-navy flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-patient-gold" />
                      Monthly View
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigateMonth(-1)}
                        className="text-patient-navy"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                      <span className="font-medium text-patient-navy min-w-[150px] text-center">
                        {monthName}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigateMonth(1)}
                        className="text-patient-navy"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Weekday Headers */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((cell, index) => (
                      <div
                        key={index}
                        className={`aspect-square p-2 rounded-lg text-center text-sm transition-colors ${
                          cell.day === null
                            ? 'bg-transparent'
                            : cell.hasSession
                            ? 'bg-patient-teal text-white font-semibold cursor-pointer hover:bg-patient-teal/90'
                            : 'bg-patient-bg hover:bg-muted cursor-pointer'
                        }`}
                      >
                        {cell.day}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-patient-teal" />
                      <span className="text-sm text-muted-foreground">Session scheduled</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Sessions */}
            <div>
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <CardTitle className="text-xl text-patient-navy flex items-center gap-2">
                      <CalendarCheck className="h-5 w-5 text-patient-gold" />
                      Upcoming
                    </CardTitle>
                    <Select value={filterCoach} onValueChange={setFilterCoach}>
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Filter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Coaches</SelectItem>
                        <SelectItem value="Sarah">Sarah J.</SelectItem>
                        <SelectItem value="Mike">Mike T.</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  {filteredSessions.length > 0 ? (
                    <div className="space-y-4">
                      {filteredSessions.map((session) => (
                        <Card key={session.id} className="border-l-4 border-l-patient-teal">
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div>
                                <Badge
                                  className={
                                    session.type === 'nutrition'
                                      ? 'bg-green-100 text-green-700 hover:bg-green-100'
                                      : 'bg-patient-teal/20 text-patient-teal hover:bg-patient-teal/20'
                                  }
                                >
                                  {session.type}
                                </Badge>
                                <h4 className="font-semibold text-patient-navy mt-2">{session.topic}</h4>
                              </div>
                              <div className="space-y-1 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                  <User className="h-3 w-3" />
                                  <span>{session.coach}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-3 w-3" />
                                  <span>{session.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-3 w-3" />
                                  <span>{session.time}</span>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex-1 border-patient-teal text-patient-teal hover:bg-patient-teal hover:text-white"
                                  onClick={() => handleAddToCalendar(session)}
                                >
                                  <Plus className="h-3 w-3 mr-1" />
                                  Add to Calendar
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-patient-gold hover:bg-patient-gold/10"
                                  onClick={() => handleSetReminder(session)}
                                >
                                  <Bell className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <img src={happyChild} alt="Happy child" className="w-24 h-24 object-cover rounded-full mx-auto mb-4 opacity-80" />
                      <p className="text-muted-foreground">No upcoming sessions scheduled</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NutritionSchedule;