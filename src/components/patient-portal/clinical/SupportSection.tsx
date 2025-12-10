import { useState } from 'react';
import { HelpCircle, MessageSquare, Mail, Phone, Play, ChevronRight, Send, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from 'sonner';
import happyChild from '@/assets/child-grass-happy.jpg';

const SupportSection = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const faqs = [
    {
      id: 1,
      question: 'How do I schedule an appointment?',
      answer: 'You can schedule an appointment through the "See My Doctor" section of the portal, or by calling our office at (703) 555-1234. For urgent matters, please call the office directly.',
    },
    {
      id: 2,
      question: 'How can I view my lab results?',
      answer: 'Lab results are available in the "Health Record" section under "Lab Results". Results are typically posted within 3-5 business days after your lab work is completed.',
    },
    {
      id: 3,
      question: 'How do I request a prescription refill?',
      answer: 'Go to the "Prescriptions" section and click the "Request Refill" button next to the medication you need. Please allow 48-72 hours for processing.',
    },
    {
      id: 4,
      question: 'Can I message my doctor through the portal?',
      answer: 'Yes! You can send non-urgent messages to your care team through the portal. For urgent medical concerns, please call our office or visit the nearest emergency room.',
    },
    {
      id: 5,
      question: 'How do I update my insurance information?',
      answer: 'Visit the "Insurance Information" section to view and update your insurance details. You can also upload new insurance cards directly through the portal.',
    },
    {
      id: 6,
      question: 'What should I do if I need medical advice after hours?',
      answer: 'For after-hours medical advice, please call our main number and follow the prompts for the on-call provider. For emergencies, call 911 or go to the nearest emergency room.',
    },
  ];

  const tutorials = [
    { id: 1, title: 'Getting Started with Your Patient Portal', duration: '3:45' },
    { id: 2, title: 'How to View and Download Lab Results', duration: '2:30' },
    { id: 3, title: 'Scheduling Appointments Online', duration: '4:15' },
    { id: 4, title: 'Managing Prescriptions and Refills', duration: '3:00' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Your message has been sent! We\'ll respond within 1-2 business days.');
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="space-y-6">
      {/* Quick Contact */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-sm bg-patient-teal/5 hover:bg-patient-teal/10 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="p-3 rounded-full bg-patient-teal/10 w-fit mx-auto mb-3">
              <Phone className="h-6 w-6 text-patient-teal" />
            </div>
            <p className="font-semibold text-patient-navy">Call Us</p>
            <p className="text-sm text-muted-foreground mt-1">(703) 555-1234</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-patient-gold/5 hover:bg-patient-gold/10 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="p-3 rounded-full bg-patient-gold/10 w-fit mx-auto mb-3">
              <Mail className="h-6 w-6 text-patient-gold" />
            </div>
            <p className="font-semibold text-patient-navy">Email Us</p>
            <p className="text-sm text-muted-foreground mt-1">support@endomdhealth.com</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-green-50 hover:bg-green-100 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="p-3 rounded-full bg-green-100 w-fit mx-auto mb-3">
              <MessageSquare className="h-6 w-6 text-green-600" />
            </div>
            <p className="font-semibold text-patient-navy">Live Chat</p>
            <p className="text-sm text-muted-foreground mt-1">Available 9AM - 5PM EST</p>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl text-patient-navy flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-patient-gold" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={`faq-${faq.id}`} className="border rounded-xl px-4">
                <AccordionTrigger className="hover:no-underline text-left">
                  <span className="font-medium text-patient-navy">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground pb-2">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Form */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-patient-navy flex items-center gap-2">
              <Mail className="h-5 w-5 text-patient-gold" />
              Contact Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-patient-navy text-sm">Your Name</Label>
                  <Input
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="John Doe"
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label className="text-patient-navy text-sm">Email Address</Label>
                  <Input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="john@email.com"
                    className="mt-1"
                    required
                  />
                </div>
              </div>
              <div>
                <Label className="text-patient-navy text-sm">Subject</Label>
                <Input
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  placeholder="How can we help?"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label className="text-patient-navy text-sm">Message</Label>
                <Textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Describe your question or issue..."
                  className="mt-1 min-h-[120px]"
                  required
                />
              </div>
              <div className="flex items-center gap-3">
                <Button type="button" variant="outline" className="border-patient-teal text-patient-teal">
                  <Paperclip className="h-4 w-4 mr-2" />
                  Attach File
                </Button>
                <Button type="submit" className="bg-patient-teal hover:bg-patient-teal/90 flex-1">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Tutorials */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-patient-navy flex items-center gap-2">
              <Play className="h-5 w-5 text-patient-gold" />
              How-To Videos
            </CardTitle>
          </CardHeader>
          <CardContent>
            {tutorials.length > 0 ? (
              <div className="space-y-3">
                {tutorials.map((tutorial) => (
                  <div
                    key={tutorial.id}
                    className="flex items-center justify-between p-4 bg-patient-bg rounded-xl hover:bg-patient-teal/10 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-patient-teal/10 group-hover:bg-patient-teal/20">
                        <Play className="h-5 w-5 text-patient-teal" />
                      </div>
                      <div>
                        <p className="font-medium text-patient-navy">{tutorial.title}</p>
                        <p className="text-xs text-muted-foreground">{tutorial.duration}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-patient-teal opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <img src={happyChild} alt="Happy child" className="w-32 h-32 object-cover rounded-full mx-auto mb-4 opacity-80" />
                <p className="text-muted-foreground">No tutorials available yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupportSection;
