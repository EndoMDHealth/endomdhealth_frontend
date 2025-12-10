import { useState } from 'react';
import { Target, CheckCircle, Circle, TrendingUp, FileText, Play, BookOpen, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import happyChild from '@/assets/child-grass-happy.jpg';

const TreatmentPlanSection = () => {
  const [goals] = useState([
    { id: 1, title: 'Maintain healthy thyroid levels', progress: 85, status: 'on-track' },
    { id: 2, title: 'Achieve target growth velocity', progress: 60, status: 'in-progress' },
    { id: 3, title: 'Regular medication adherence', progress: 95, status: 'on-track' },
  ]);

  const carePlanDetails = [
    {
      id: 1,
      category: 'Thyroid Management',
      details: 'Continue Levothyroxine 50mcg daily. Monitor TSH levels every 3 months. Adjust dosage based on lab results and symptoms.',
      nextAction: 'Lab work scheduled for January 15, 2025',
    },
    {
      id: 2,
      category: 'Growth Monitoring',
      details: 'Monthly height and weight measurements. Growth hormone therapy nightly. Track growth velocity to ensure target of 5cm/year.',
      nextAction: 'Next measurement due December 20, 2024',
    },
    {
      id: 3,
      category: 'Nutrition Plan',
      details: 'Balanced diet with adequate calcium and vitamin D. Daily multivitamin recommended. Limit processed foods and sugary drinks.',
      nextAction: 'Nutrition coaching session on December 18, 2024',
    },
  ];

  const toDoList = [
    { id: 1, task: 'Complete morning medication', completed: true, dueDate: 'Daily' },
    { id: 2, task: 'Log daily food intake', completed: false, dueDate: 'Daily' },
    { id: 3, task: 'Upload latest lab results', completed: false, dueDate: 'Dec 15, 2024' },
    { id: 4, task: 'Schedule follow-up appointment', completed: true, dueDate: 'Dec 10, 2024' },
  ];

  const resources = [
    { id: 1, type: 'article', title: 'Understanding Thyroid Health in Children', icon: BookOpen },
    { id: 2, type: 'video', title: 'How to Support Your Child\'s Growth', icon: Play },
    { id: 3, type: 'article', title: 'Nutrition Tips for Healthy Development', icon: FileText },
  ];

  return (
    <div className="space-y-6">
      {/* Goals & Progress */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl text-patient-navy flex items-center gap-2">
            <Target className="h-5 w-5 text-patient-gold" />
            Goals & Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.id} className="p-4 bg-patient-bg rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-patient-navy">{goal.title}</p>
                  <Badge
                    className={
                      goal.status === 'on-track'
                        ? 'bg-green-100 text-green-700 hover:bg-green-100'
                        : 'bg-patient-teal/20 text-patient-teal hover:bg-patient-teal/20'
                    }
                  >
                    {goal.status === 'on-track' ? 'On Track' : 'In Progress'}
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={goal.progress} className="flex-1 h-2" />
                  <span className="text-sm font-medium text-patient-teal">{goal.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Care Plan Details */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl text-patient-navy flex items-center gap-2">
            <FileText className="h-5 w-5 text-patient-gold" />
            Care Plan Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-2">
            {carePlanDetails.map((plan) => (
              <AccordionItem key={plan.id} value={`plan-${plan.id}`} className="border rounded-xl px-4">
                <AccordionTrigger className="hover:no-underline">
                  <span className="font-medium text-patient-navy">{plan.category}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pt-2 pb-4">
                    <p className="text-muted-foreground">{plan.details}</p>
                    <div className="flex items-center gap-2 p-3 bg-patient-gold/10 rounded-lg">
                      <ChevronRight className="h-4 w-4 text-patient-gold" />
                      <span className="text-sm font-medium text-patient-navy">{plan.nextAction}</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* To-Do List */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-patient-navy flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-patient-gold" />
              Patient To-Do List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {toDoList.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-3 rounded-xl ${
                    item.completed ? 'bg-green-50' : 'bg-patient-bg'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-300" />
                    )}
                    <span className={`text-sm ${item.completed ? 'text-muted-foreground line-through' : 'text-patient-navy'}`}>
                      {item.task}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.dueDate}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Progress Charts */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-patient-navy flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-patient-gold" />
              Progress Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <img src={happyChild} alt="Happy child" className="w-24 h-24 object-cover rounded-full mx-auto mb-4 opacity-80" />
              <p className="text-muted-foreground mb-4">Growth charts and lab trends will appear here</p>
              <Button variant="outline" className="border-patient-teal text-patient-teal hover:bg-patient-teal hover:text-white">
                View Growth Charts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Educational Resources */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl text-patient-navy flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-patient-gold" />
            Related Educational Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className="p-4 bg-patient-bg rounded-xl hover:bg-patient-teal/10 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-patient-teal/10 group-hover:bg-patient-teal/20">
                    <resource.icon className="h-5 w-5 text-patient-teal" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-patient-navy">{resource.title}</p>
                    <p className="text-xs text-muted-foreground capitalize">{resource.type}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-patient-teal opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TreatmentPlanSection;
