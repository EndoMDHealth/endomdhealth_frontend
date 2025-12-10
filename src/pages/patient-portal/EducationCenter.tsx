import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  Video, 
  FileText, 
  Play,
  Search,
  Filter,
  Clock,
  User,
  Apple
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import PatientPortalHeader from '@/components/patient-portal/PatientPortalHeader';
import Footer from '@/components/Footer';

const EducationCenter = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Patient';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['All', 'Growth', 'Metabolism', 'Diabetes', 'Nutrition', 'Thyroid'];

  // Mock data
  const coachingSessions = [
    {
      id: 1,
      title: 'Healthy Eating Habits for Children',
      date: 'Nov 20, 2024',
      duration: '45 min',
      coach: 'Sarah Mitchell, RD',
      type: 'Nutrition',
    },
    {
      id: 2,
      title: 'Managing Blood Sugar Levels',
      date: 'Nov 5, 2024',
      duration: '30 min',
      coach: 'Dr. Ladan Davallow',
      type: 'Diabetes',
    },
  ];

  const articles = [
    {
      id: 1,
      title: 'Understanding Growth Patterns in Children',
      category: 'Growth',
      readTime: '5 min read',
      excerpt: 'Learn about normal growth patterns and when to seek medical advice...',
    },
    {
      id: 2,
      title: 'Nutrition Tips for Active Kids',
      category: 'Nutrition',
      readTime: '4 min read',
      excerpt: 'Discover the best foods to fuel your child\'s active lifestyle...',
    },
    {
      id: 3,
      title: 'Managing Type 1 Diabetes in School',
      category: 'Diabetes',
      readTime: '6 min read',
      excerpt: 'Tips for parents and educators on supporting children with diabetes...',
    },
    {
      id: 4,
      title: 'Thyroid Health in Adolescents',
      category: 'Thyroid',
      readTime: '5 min read',
      excerpt: 'What parents need to know about thyroid function in teenagers...',
    },
  ];

  const videos = [
    {
      id: 1,
      title: 'Introduction to Pediatric Endocrinology',
      duration: '12:30',
      category: 'General',
      thumbnail: '/placeholder.svg',
    },
    {
      id: 2,
      title: 'Healthy Meal Planning',
      duration: '18:45',
      category: 'Nutrition',
      thumbnail: '/placeholder.svg',
    },
  ];

  return (
    <div className="min-h-screen bg-patient-bg flex flex-col">
      <PatientPortalHeader firstName={firstName} />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/patient-dashboard')}
            className="mb-4 text-patient-navy hover:bg-patient-teal/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-patient-navy flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-patient-gold" />
              Education Center
            </h1>
            <p className="text-muted-foreground mt-1">Resources to help you understand your child's health</p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category.toLowerCase() ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.toLowerCase())}
                  className={`rounded-xl ${
                    selectedCategory === category.toLowerCase()
                      ? 'bg-patient-teal hover:bg-patient-teal/90 text-white'
                      : 'hover:bg-patient-teal/10'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <Tabs defaultValue="sessions" className="space-y-6">
            <TabsList className="bg-white border rounded-xl p-1 flex-wrap h-auto">
              <TabsTrigger value="sessions" className="rounded-lg data-[state=active]:bg-patient-teal data-[state=active]:text-white">
                <Video className="h-4 w-4 mr-2" />
                Coaching Sessions
              </TabsTrigger>
              <TabsTrigger value="articles" className="rounded-lg data-[state=active]:bg-patient-teal data-[state=active]:text-white">
                <FileText className="h-4 w-4 mr-2" />
                Articles
              </TabsTrigger>
              <TabsTrigger value="videos" className="rounded-lg data-[state=active]:bg-patient-teal data-[state=active]:text-white">
                <Play className="h-4 w-4 mr-2" />
                Videos & Webinars
              </TabsTrigger>
              <TabsTrigger value="nutrition" className="rounded-lg data-[state=active]:bg-patient-teal data-[state=active]:text-white">
                <Apple className="h-4 w-4 mr-2" />
                Nutrition Info
              </TabsTrigger>
            </TabsList>

            {/* Coaching Sessions Tab */}
            <TabsContent value="sessions">
              {coachingSessions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {coachingSessions.map((session) => (
                    <Card key={session.id} className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                      <CardContent className="p-6">
                        <Badge className="bg-patient-gold/10 text-patient-gold mb-3">{session.type}</Badge>
                        <h3 className="font-bold text-patient-navy mb-2">{session.title}</h3>
                        <div className="space-y-2 text-sm text-muted-foreground mb-4">
                          <p className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {session.date} • {session.duration}
                          </p>
                          <p className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            {session.coach}
                          </p>
                        </div>
                        <Button className="w-full bg-patient-teal hover:bg-patient-teal/90 text-white rounded-xl">
                          <Play className="h-4 w-4 mr-2" />
                          Watch
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="rounded-2xl shadow-lg">
                  <CardContent className="p-12 text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-patient-teal/10 flex items-center justify-center">
                      <Video className="h-10 w-10 text-patient-teal" />
                    </div>
                    <h3 className="text-lg font-semibold text-patient-navy mb-2">No sessions available yet</h3>
                    <p className="text-muted-foreground">Recorded coaching sessions will appear here</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Articles Tab */}
            <TabsContent value="articles">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {articles.map((article) => (
                  <Card key={article.id} className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <Badge className="bg-patient-teal/10 text-patient-teal">{article.category}</Badge>
                        <span className="text-xs text-muted-foreground">{article.readTime}</span>
                      </div>
                      <h3 className="font-bold text-patient-navy mb-2">{article.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{article.excerpt}</p>
                      <Button variant="outline" className="rounded-xl hover:bg-patient-teal/10 hover:text-patient-teal">
                        Read More →
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Videos Tab */}
            <TabsContent value="videos">
              {videos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {videos.map((video) => (
                    <Card key={video.id} className="rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="relative aspect-video bg-patient-navy/10">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-patient-teal flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                            <Play className="h-8 w-8 text-white ml-1" />
                          </div>
                        </div>
                        <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </span>
                      </div>
                      <CardContent className="p-4">
                        <Badge className="bg-patient-gold/10 text-patient-gold mb-2">{video.category}</Badge>
                        <h3 className="font-semibold text-patient-navy">{video.title}</h3>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="rounded-2xl shadow-lg">
                  <CardContent className="p-12 text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-patient-gold/10 flex items-center justify-center">
                      <Play className="h-10 w-10 text-patient-gold" />
                    </div>
                    <h3 className="text-lg font-semibold text-patient-navy mb-2">No videos available</h3>
                    <p className="text-muted-foreground">Educational videos will appear here</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Nutrition Info Tab */}
            <TabsContent value="nutrition">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="rounded-2xl shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-patient-navy flex items-center gap-2">
                      <Apple className="h-5 w-5 text-patient-gold" />
                      Upcoming Nutrition Sessions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-patient-teal/5 rounded-xl border border-patient-teal/20">
                      <p className="font-semibold text-patient-navy">Next Session: December 15, 2024</p>
                      <p className="text-sm text-muted-foreground">10:00 AM with Sarah Mitchell, RD</p>
                      <p className="text-sm text-muted-foreground mt-1">Topic: Healthy Holiday Eating</p>
                      <Button size="sm" className="mt-3 bg-patient-teal hover:bg-patient-teal/90 text-white rounded-xl">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-patient-navy">Nutrition Topics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {['Balanced Meal Planning', 'Healthy Snack Ideas', 'Reading Nutrition Labels', 'Managing Food Allergies'].map((topic) => (
                        <li key={topic} className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl hover:bg-patient-teal/5 cursor-pointer transition-colors">
                          <div className="w-8 h-8 rounded-lg bg-patient-gold/10 flex items-center justify-center">
                            <FileText className="h-4 w-4 text-patient-gold" />
                          </div>
                          <span className="font-medium text-patient-navy">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EducationCenter;
