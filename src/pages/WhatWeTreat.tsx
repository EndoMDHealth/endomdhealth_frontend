import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scale, Heart, TrendingUp, Users, Activity, Sparkles } from "lucide-react";
import heroImage from "@/assets/happy-child-activity.jpg";

const conditions = [
  {
    icon: Scale,
    iconColor: "text-accent",
    bgColor: "bg-accent/10",
    title: "Achieve a Healthy Weight",
    description: [
      "Effectively manage and prevent overeating",
      "Foster lifelong healthy eating habits",
      "Use medication when appropriate to support weight management",
      "Provide psychological support for emotional well-being",
    ],
  },
  {
    icon: Activity,
    iconColor: "text-accent",
    bgColor: "bg-accent/10",
    title: "Manage Type 2 Diabetes",
    description: [
      "Monitor and stabilize blood sugar levels",
      "Develop personalized wellness plans",
      "Employ targeted medical interventions when needed",
      "Support long-term metabolic health",
    ],
  },
  {
    icon: TrendingUp,
    iconColor: "text-accent",
    bgColor: "bg-accent/10",
    title: "Address Growth Concerns",
    description: [
      "Conduct thorough assessments of growth patterns",
      "Provide psychological support for families",
      "Evaluate and administer growth hormone treatments when indicated",
      "Monitor development milestones closely",
    ],
  },
  {
    icon: Users,
    iconColor: "text-accent",
    bgColor: "bg-accent/10",
    title: "Address Puberty Concerns",
    description: [
      "Assess root cause of early and late puberty",
      "Support natural puberty progression",
      "Maintain hormonal balance through expert care",
      "Provide family education and guidance",
    ],
  },
  {
    icon: Sparkles,
    iconColor: "text-accent",
    bgColor: "bg-accent/10",
    title: "Manage Thyroid Issues",
    description: [
      "Optimize thyroid function through advanced therapies",
      "Enhance daily energy and sleep quality",
      "Address autoimmune thyroid disorders",
      "Monitor and adjust treatment for best outcomes",
    ],
  },
  {
    icon: Heart,
    iconColor: "text-accent",
    bgColor: "bg-accent/10",
    title: "Balance Hormones",
    description: [
      "Diagnose & treat hormonal imbalances such as PCOS",
      "Utilize hormone therapy for weight, growth, and development",
      "Enhance energy, concentration, and sleep quality",
      "Support overall endocrine health",
    ],
  },
];

const WhatWeTreat = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section with Image */}
      <section className="relative bg-gradient-to-b from-primary/5 to-background py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 animate-fade-in">
                Conditions We Treat
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-6">
                A better life for your child is a click away, start the journey today
              </p>
              <Button size="lg" className="text-lg px-8 py-6 hover-scale" asChild>
                <a href="/for-parents">Get Started</a>
              </Button>
            </div>
            <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg">
              <img
                src={heroImage}
                alt="Happy child playing outdoors - healthy and active lifestyle"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Conditions Grid - Reduced top spacing */}
      <main className="container mx-auto px-4 py-4 md:py-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {conditions.map((condition, index) => {
            const Icon = condition.icon;
            return (
              <Card
                key={index}
                className="hover-scale hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30"
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 rounded-full ${condition.bgColor} flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon className={`w-8 h-8 ${condition.iconColor}`} />
                  </div>
                  <CardTitle className="text-xl md:text-2xl">{condition.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2.5">
                    {condition.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                        <span className="text-sm md:text-base leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>

      {/* CTA Section - Reduced top spacing */}
      <section className="bg-gradient-to-t from-primary/5 to-background py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">
            Ready to Start Your Child's Journey to Better Health?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our expert team is here to provide comprehensive, compassionate care for your child's endocrine needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <a href="/for-parents">Get Started</a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
              <a href="/resources">Learn More</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WhatWeTreat;
