import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Video, Play, Search, Filter, Clock, User, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import PatientPortalHeader from '@/components/patient-portal/PatientPortalHeader';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import happyChild from '@/assets/child-grass-happy.jpg';

const CoachingSessions = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Patient';

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');

  // Sample data
  const sessions = [
    {
      id: 1,
      title: 'Healthy Eating Habits for Kids',
      date: '2024-12-01',
      duration: '45 min',
      coach: 'Sarah Johnson, RD',
      type: 'Nutrition',
      thumbnail: '/placeholder.svg',
    },
    {
      id: 2,
      title: 'Managing Blood Sugar Through Diet',
      date: '2024-11-20',
      duration: '30 min',
      coach: 'Dr. Emily Chen',
      type: 'Endocrinology',
      thumbnail: '/placeholder.svg',
    },
    {
      id: 3,
      title: 'Active Lifestyle Tips for Children',
      date: '2024-11-10',
      duration: '35 min',
      coach: 'Mike Thompson, CPT',
      type: 'Lifestyle',
      thumbnail: '/placeholder.svg',
    },
    {
      id: 4,
      title: 'Understanding Thyroid Health',
      date: '2024-10-28',
      duration: '40 min',
      coach: 'Dr. Ladan Davallow',
      type: 'Endocrinology',
      thumbnail: '/placeholder.svg',
    },
  ];

  const filteredSessions = sessions
    .filter(session => {
      const matchesSearch = session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.coach.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterType === 'all' || session.type.toLowerCase() === filterType;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

  const handleWatch = (sessionTitle: string) => {
    toast.info(`Opening: ${sessionTitle}`);
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'nutrition':
        return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'lifestyle':
        return 'bg-patient-teal/20 text-patient-teal hover:bg-patient-teal/20';
      case 'endocrinology':
        return 'bg-patient-gold/20 text-amber-700 hover:bg-patient-gold/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
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
              onClick={() => navigate('/patient-dashboard')}
              className="mb-4 text-patient-navy hover:bg-patient-teal/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-patient-navy text-center">
              Access Recorded Coaching Sessions
            </h1>
            <p className="text-center text-muted-foreground mt-2">
              Review past nutrition, lifestyle, and endocrinology sessions
            </p>
          </div>

          {/* Search & Filters */}
          <section className="mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search sessions or coaches..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-[160px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="nutrition">Nutrition</SelectItem>
                        <SelectItem value="lifestyle">Lifestyle</SelectItem>
                        <SelectItem value="endocrinology">Endocrinology</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={sortOrder} onValueChange={setSortOrder}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Sort" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Session Library */}
          <section className="mb-8">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-patient-navy flex items-center gap-2">
                  <Video className="h-5 w-5 text-patient-gold" />
                  Recorded Session Library
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredSessions.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredSessions.map((session) => (
                      <Card key={session.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="flex">
                          <div className="w-32 h-32 bg-gradient-to-br from-patient-teal to-patient-navy flex items-center justify-center flex-shrink-0">
                            <Play className="h-10 w-10 text-white" />
                          </div>
                          <CardContent className="p-4 flex-1">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h3 className="font-semibold text-patient-navy line-clamp-2">{session.title}</h3>
                              <Badge className={getTypeBadgeColor(session.type)}>{session.type}</Badge>
                            </div>
                            <div className="space-y-1 text-sm text-muted-foreground mb-3">
                              <div className="flex items-center gap-2">
                                <User className="h-3 w-3" />
                                <span>{session.coach}</span>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{session.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{session.duration}</span>
                                </div>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              className="bg-patient-teal hover:bg-patient-teal/90 w-full"
                              onClick={() => handleWatch(session.title)}
                            >
                              <Play className="h-4 w-4 mr-2" />
                              Watch
                            </Button>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <img src={happyChild} alt="Happy child" className="w-32 h-32 object-cover rounded-full mx-auto mb-4 opacity-80" />
                    <h3 className="text-lg font-semibold text-patient-navy mb-2">No sessions available yet</h3>
                    <p className="text-muted-foreground">
                      {searchQuery || filterType !== 'all'
                        ? 'Try adjusting your search or filters'
                        : 'Your recorded coaching sessions will appear here'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CoachingSessions;