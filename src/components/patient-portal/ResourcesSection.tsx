import { BookOpen, Play, Apple, HelpCircle, Headphones } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const ResourcesSection = () => {
  const resources = [
    {
      icon: BookOpen,
      title: 'Educational Articles',
      description: 'Learn about pediatric endocrinology conditions',
      link: '/resources',
    },
    {
      icon: Play,
      title: 'Videos & Webinars',
      description: 'Watch helpful educational content',
      link: '/resources',
    },
    {
      icon: Apple,
      title: 'Nutrition Coaching Info',
      description: 'Discover our nutrition programs',
      link: '/nutrition-coaching',
    },
    {
      icon: HelpCircle,
      title: 'FAQs',
      description: 'Find answers to common questions',
      link: '/resources',
    },
    {
      icon: Headphones,
      title: 'Contact Support',
      description: 'Get help with your account',
      link: '/contact-us',
    },
  ];

  return (
    <section className="py-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">Resources & Support</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {resources.map((resource, index) => (
          <Link key={index} to={resource.link}>
            <Card className="h-full cursor-pointer transition-all duration-300 hover:shadow-md hover:border-patient-teal/50 border group">
              <CardContent className="p-4 flex flex-col items-center text-center h-full">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-3 group-hover:bg-patient-teal/10 transition-colors">
                  <resource.icon className="h-5 w-5 text-patient-teal" />
                </div>
                <h3 className="font-medium text-foreground text-sm mb-1">{resource.title}</h3>
                <p className="text-xs text-muted-foreground">{resource.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ResourcesSection;
