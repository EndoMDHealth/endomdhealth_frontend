import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Users,
  TrendingUp,
  Calendar,
  Target,
  Smile,
  Brain,
  Zap,
  CheckCircle,
  Apple,
  Dumbbell,
  Moon,
  Droplet,
  BookOpen,
  ArrowRight,
  HelpCircle,
  Scale,
  AlertCircle,
  Activity,
} from "lucide-react";
import teenHealthyImage from "@/assets/teen-healthy-cooking.jpg";
import healthyPlateImage from "@/assets/healthy-colorful-plate.jpg";

const NutritionCoaching = () => {
  const struggles = [
    {
      icon: Scale,
      question: "Do you feel trapped in a cycle of restrictive dieting?",
    },
    {
      icon: Target,
      question: "Are you struggling to stay consistent without the right support?",
    },
    {
      icon: Activity,
      question: "Are you putting in effort at the gym but not seeing results?",
    },
    {
      icon: AlertCircle,
      question: "Are you trying (and failing) to make rigid diets fit into your busy life?",
    },
    {
      icon: Calendar,
      question: "Do you feel 'off track' in your nutrition every time a holiday or big life event comes around?",
    },
  ];

  const offerings = [
    {
      icon: Apple,
      title: "Personalized Nutrition Guidance",
      description: "Tailored to your age, culture, and family routines",
    },
    {
      icon: Heart,
      title: "Evidence-Based Metabolic Support",
      description: "Rooted in pediatric endocrinology expertise",
    },
    {
      icon: Calendar,
      title: "Accountability & Check-Ins",
      description: "Weekly support for sustainable habit building",
    },
    {
      icon: Dumbbell,
      title: "Lifestyle Strategies",
      description: "Sleep, movement, hydration, and stress management",
    },
    {
      icon: Smile,
      title: "Food-Relationship Coaching",
      description: "Reduce guilt, confusion, and restriction",
    },
    {
      icon: Users,
      title: "Virtual Convenience",
      description: "Family involvement optional, flexible scheduling",
    },
  ];

  const results = [
    {
      icon: CheckCircle,
      title: "More Consistent Habits",
      description: "Build routines that stick without feeling restrictive",
    },
    {
      icon: TrendingUp,
      title: "Greater Confidence",
      description: "Feel empowered in your nutrition choices",
    },
    {
      icon: Zap,
      title: "Improved Energy & Focus",
      description: "Better performance at school and in activities",
    },
    {
      icon: Brain,
      title: "Reduced Stress Around Food",
      description: "Make peace with eating and enjoy meals again",
    },
    {
      icon: BookOpen,
      title: "Better Understanding",
      description: "Learn how metabolism and nutrition really work",
    },
    {
      icon: Target,
      title: "Improved Long-Term Wellness",
      description: "Create sustainable habits for lifelong health",
    },
  ];

  const approach = [
    "Non-restrictive and flexible",
    "Culturally inclusive and respectful",
    "Shame-free and judgment-free",
    "Realistic for school schedules and busy households",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left Content */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                Nutrition & Lifestyle Coaching for <span className="text-accent">Teens and Young Adults</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Personalized support to build healthier habits, improve confidence, and create a sustainable
                relationship with food.
              </p>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={teenHealthyImage}
                  alt="Teen preparing healthy food in modern kitchen"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem-Recognition Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              Do You Recognize These Nutrition Struggles?
            </h2>
            <div className="space-y-4 mb-12">
              {struggles.map((struggle, index) => {
                const Icon = struggle.icon;
                return (
                  <Card key={index} className="border-l-4 border-l-accent">
                    <CardContent className="p-6 flex items-start space-x-4">
                      <div className="p-2 bg-accent/10 rounded-full flex-shrink-0">
                        <Icon className="h-6 w-6 text-accent" />
                      </div>
                      <p className="text-lg text-muted-foreground pt-2">{struggle.question}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <div className="mt-12">
              <Card className="border-2 border-accent/30 shadow-lg">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <img
                        src={healthyPlateImage}
                        alt="Colorful healthy plate with vegetables, protein, and whole grains"
                        className="w-full h-auto rounded-lg shadow-md"
                      />
                    </div>
                    <div>
                      <p className="text-2xl md:text-3xl font-semibold text-accent leading-relaxed">
                        You want less overthinking, less second-guessing, and more peace with food instead.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                What Nutrition & Lifestyle Coaching Includes
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive support designed specifically for teens and young adults
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {offerings.map((offering, index) => {
                const Icon = offering.icon;
                return (
                  <Card key={index} className="border shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6 space-y-4">
                      <div className="p-3 bg-accent/10 rounded-full w-fit">
                        <Icon className="h-8 w-8 text-accent" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">{offering.title}</h3>
                      <p className="text-muted-foreground">{offering.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Teen & Parent Friendly Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-accent/20 shadow-lg">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-foreground">
                  Our Supportive Approach
                </h2>
                <p className="text-lg text-muted-foreground text-center mb-8">
                  We believe in creating lasting change through understanding, not restriction.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  {approach.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                      <p className="text-lg text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Results Section - Flowing Layout */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">What Teens Can Expect</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Real, sustainable improvements in health and confidence
              </p>
            </div>

            {/* Flowing Grid Layout */}
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
              {results.map((result, index) => {
                const Icon = result.icon;
                const isLeft = index % 2 === 0;
                return (
                  <div 
                    key={index} 
                    className={`flex items-start gap-5 group ${isLeft ? 'md:pr-8' : 'md:pl-8'}`}
                  >
                    {/* Icon */}
                    <div className="relative flex-shrink-0">
                      <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                        <Icon className="h-7 w-7 text-accent" />
                      </div>
                      {/* Decorative dot */}
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-accent/40" />
                    </div>
                    
                    {/* Content */}
                    <div className="pt-1">
                      <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                        {result.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {result.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Subtle decorative divider */}
            <div className="flex items-center justify-center mt-16 gap-3">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent/30" />
              <div className="w-2 h-2 rounded-full bg-accent/50" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent/30" />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Ready to Start Your Nutrition Journey?
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              We'll help you build sustainable, supportive habits—without restrictive diets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-10 py-6 text-lg"
              >
                Book a Coaching Session
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-10 py-6 text-lg"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NutritionCoaching;
