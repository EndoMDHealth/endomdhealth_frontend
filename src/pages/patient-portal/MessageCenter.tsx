import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mail, 
  Send, 
  Paperclip, 
  Search,
  Circle,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import PatientPortalHeader from '@/components/patient-portal/PatientPortalHeader';
import Footer from '@/components/Footer';

const MessageCenter = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Patient';
  
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock messages data
  const messages = [
    {
      id: 1,
      from: 'Dr. Ladan Davallow',
      subject: 'Lab Results Review',
      preview: 'Your recent lab results are in. I wanted to discuss...',
      date: 'Dec 5, 2024',
      unread: true,
      fullMessage: 'Your recent lab results are in. I wanted to discuss your thyroid panel with you. Everything looks good, but I noticed a slight variation that we should monitor. Please schedule a follow-up appointment at your convenience.',
    },
    {
      id: 2,
      from: 'Care Team',
      subject: 'Appointment Reminder',
      preview: 'Reminder: You have an upcoming appointment on...',
      date: 'Dec 3, 2024',
      unread: false,
      fullMessage: 'Reminder: You have an upcoming appointment on December 20, 2024 at 10:00 AM with Dr. Davallow. Please arrive 15 minutes early to complete any necessary paperwork.',
    },
    {
      id: 3,
      from: 'Nutrition Coach',
      subject: 'Coaching Session Summary',
      preview: 'Thank you for attending your nutrition coaching...',
      date: 'Nov 28, 2024',
      unread: false,
      fullMessage: 'Thank you for attending your nutrition coaching session. Here is a summary of what we discussed: Focus on increasing vegetable intake, reducing processed foods, and maintaining consistent meal times. Your next session is scheduled for December 15.',
    },
  ];

  const selectedMessageData = messages.find(m => m.id === selectedMessage);

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
              <Mail className="h-8 w-8 text-patient-gold" />
              Message Center
            </h1>
            <p className="text-muted-foreground mt-1">Communicate securely with your care team</p>
          </div>

          <Tabs defaultValue="inbox" className="space-y-6">
            <TabsList className="bg-white border rounded-xl p-1">
              <TabsTrigger value="inbox" className="rounded-lg data-[state=active]:bg-patient-teal data-[state=active]:text-white">
                Inbox
              </TabsTrigger>
              <TabsTrigger value="compose" className="rounded-lg data-[state=active]:bg-patient-teal data-[state=active]:text-white">
                Compose
              </TabsTrigger>
              <TabsTrigger value="sent" className="rounded-lg data-[state=active]:bg-patient-teal data-[state=active]:text-white">
                Sent
              </TabsTrigger>
            </TabsList>

            <TabsContent value="inbox">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Message List */}
                <Card className="lg:col-span-1 rounded-2xl shadow-lg">
                  <CardHeader className="pb-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search messages..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 rounded-xl"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {messages.map((message) => (
                        <button
                          key={message.id}
                          onClick={() => setSelectedMessage(message.id)}
                          className={`w-full p-4 text-left hover:bg-patient-teal/5 transition-colors ${
                            selectedMessage === message.id ? 'bg-patient-teal/10' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="relative">
                              <div className="w-10 h-10 rounded-full bg-patient-navy/10 flex items-center justify-center">
                                <User className="h-5 w-5 text-patient-navy" />
                              </div>
                              {message.unread && (
                                <Circle className="absolute -top-1 -right-1 h-3 w-3 fill-patient-teal text-patient-teal" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start">
                                <p className={`text-sm truncate ${message.unread ? 'font-bold text-patient-navy' : 'font-medium text-foreground'}`}>
                                  {message.from}
                                </p>
                                <span className="text-xs text-muted-foreground ml-2">{message.date}</span>
                              </div>
                              <p className={`text-sm truncate ${message.unread ? 'font-semibold' : ''}`}>
                                {message.subject}
                              </p>
                              <p className="text-xs text-muted-foreground truncate mt-1">
                                {message.preview}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Message Detail */}
                <Card className="lg:col-span-2 rounded-2xl shadow-lg">
                  <CardContent className="p-6">
                    {selectedMessageData ? (
                      <div>
                        <div className="flex items-start gap-4 mb-6 pb-4 border-b">
                          <div className="w-12 h-12 rounded-full bg-patient-navy flex items-center justify-center">
                            <User className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-patient-navy">{selectedMessageData.from}</h3>
                            <p className="text-lg font-semibold">{selectedMessageData.subject}</p>
                            <p className="text-sm text-muted-foreground">{selectedMessageData.date}</p>
                          </div>
                        </div>
                        <p className="text-foreground leading-relaxed mb-6">
                          {selectedMessageData.fullMessage}
                        </p>
                        <div className="flex gap-3">
                          <Button className="bg-patient-teal hover:bg-patient-teal/90 text-white rounded-xl">
                            <Send className="h-4 w-4 mr-2" />
                            Reply
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-patient-teal/10 flex items-center justify-center">
                          <Mail className="h-10 w-10 text-patient-teal" />
                        </div>
                        <p className="text-muted-foreground">Select a message to read</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="compose">
              <Card className="rounded-2xl shadow-lg max-w-2xl">
                <CardHeader>
                  <CardTitle className="text-patient-navy">New Message</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">To</label>
                    <Input placeholder="Select recipient..." className="rounded-xl" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Subject</label>
                    <Input placeholder="Enter subject..." className="rounded-xl" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Message</label>
                    <Textarea 
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="min-h-[200px] rounded-xl"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" className="rounded-xl">
                      <Paperclip className="h-4 w-4 mr-2" />
                      Attach File
                    </Button>
                    <Button className="bg-patient-teal hover:bg-patient-teal/90 text-white rounded-xl">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sent">
              <Card className="rounded-2xl shadow-lg">
                <CardContent className="p-12 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-patient-gold/10 flex items-center justify-center">
                    <Send className="h-10 w-10 text-patient-gold" />
                  </div>
                  <h3 className="text-lg font-semibold text-patient-navy mb-2">No sent messages</h3>
                  <p className="text-muted-foreground">Messages you send will appear here</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MessageCenter;
