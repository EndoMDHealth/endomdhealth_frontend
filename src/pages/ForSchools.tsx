import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Scale, 
  Monitor,
} from "lucide-react";
import classroomKids from "@/assets/classroom-kids.jpg";

const ForSchools = () => {
  useEffect(() => {
    document.title = "For Schools | EndoMD Health";
  }, []);

  const whyEndoMDPoints = [
    {
      icon: Zap,
      title: "Fast, convenient specialist care",
      description: "Resulting in better health outcomes for students."
    },
    {
      icon: Scale,
      title: "Assist schools in making informed decisions",
      description: "That improve health equity across your student population."
    },
    {
      icon: Monitor,
      title: "Virtual consults reduce student absenteeism",
      description: "And enhance academic achievement."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-primary">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground max-w-4xl leading-tight text-center mx-auto">
              We Collaborate with Schools to Bridge Care Gaps and Improve Health Equity
            </h1>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-lg md:text-xl text-foreground leading-relaxed">
                Schools are increasingly responsible for supporting student well-being, often without the necessary resources to do so effectively.
              </p>
              <p className="text-lg md:text-xl text-foreground leading-relaxed">
                At EndoMD Health, we help bridge this gap by providing immediate access to specialist healthcare services, ensuring students receive the care they need without delay.
              </p>
              <p className="text-lg md:text-xl text-foreground leading-relaxed font-medium text-primary">
                EndoMD Health's approach focuses on the unique needs of each child, delivering both physical and mental health support at school and at home within days of referral.
              </p>
            </div>
          </div>
        </section>

        {/* Why EndoMD Health Section */}
        <section className="py-12 md:py-16 bg-softTeal">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  Why EndoMD Health?
                </h2>
                <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {whyEndoMDPoints.map((item, index) => (
                  <Card 
                    key={index}
                    className="p-6 bg-background border-0 shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex flex-col items-center text-center gap-4">
                      <div className="flex-shrink-0 w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                        <item.icon className="w-7 h-7 text-accent" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-foreground">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Interested in a Partnership CTA */}
        <section className="py-12 md:py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-6">
              Interested in a partnership?
            </h2>
            <Button 
              asChild
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-3 text-lg"
            >
              <a href="/contact-us">Contact Us</a>
            </Button>
          </div>
        </section>

        {/* Holistic Approach Section */}
        <section className="py-12 md:py-20 bg-gradient-to-br from-primary/5 via-accent/10 to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="flex flex-col md:flex-row items-stretch">
                  {/* Image */}
                  <div className="w-full md:w-2/5 h-64 md:h-auto">
                    <img 
                      src={classroomKids} 
                      alt="Students in a classroom smiling and engaged"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center bg-background">
                    <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground leading-relaxed">
                      We offer a <span className="text-accent">holistic approach</span> by investing in each student's medical, mindset, lifestyle, and nutritional needs, to ensure long-lasting results.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Detailed Program Description */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-lg md:text-xl text-foreground leading-relaxed">
                Our school-based health program focuses on everything from wellness and prevention to managing chronic conditions, with the goal of achieving the best possible health outcomes for students.
              </p>
              <p className="text-lg md:text-xl text-foreground leading-relaxed">
                Our team of medical specialists and coaches work closely with families to provide personalized treatment plans that empower students to manage their health, while remaining engaged and ready to learn.
              </p>
            </div>
          </div>
        </section>

        {/* Resources for Schools CTA */}
        <section className="py-12 md:py-16 bg-softTeal">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Looking for Educational Resources?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Access our library of resources designed to help schools support student health and well-being.
            </p>
            <Button 
              asChild
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-3 text-lg"
            >
              <a href="/resources">Resources for Schools</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ForSchools;
