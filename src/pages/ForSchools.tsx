import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import happyChildGrass from "@/assets/happy-child-grass.jpg";
import realClassroomKids from "@/assets/real-classroom-kids.jpg";
import childDoctorConsultation from "@/assets/child-doctor-consultation.jpg";
import diverseChildStudying from "@/assets/diverse-child-studying.jpg";
import familyTelehealthCouch from "@/assets/family-telehealth-couch.jpg";

const ForSchools = () => {
  useEffect(() => {
    document.title = "For Schools | EndoMD Health";
  }, []);

  const whyEndoMDPoints = [
    {
      title: "Fast, convenient specialist care",
      description: "Resulting in better health outcomes for students.",
      image: childDoctorConsultation,
      imageAlt: "Child receiving specialist care consultation",
      bgColor: "bg-accent/10"
    },
    {
      title: "Assist schools in making informed decisions",
      description: "That improve health equity across your student population.",
      image: diverseChildStudying,
      imageAlt: "Child engaged in studying at school",
      bgColor: "bg-primary/10"
    },
    {
      title: "Virtual consults reduce student absenteeism",
      description: "And enhance academic achievement.",
      image: familyTelehealthCouch,
      imageAlt: "Family using telehealth consultation at home",
      bgColor: "bg-softTeal"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section - matching Community Partners design */}
        <section className="relative">
          <div className="w-full h-[400px] md:h-[500px] overflow-hidden">
            <img 
              src={happyChildGrass} 
              alt="Happy child smiling while laying on grass"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container mx-auto">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground max-w-4xl leading-tight">
                We Collaborate with Schools to Bridge Care Gaps and Improve Health Equity
              </h1>
            </div>
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

        {/* Why EndoMD Health Section - matching Expected Results design */}
        <section className="py-12 md:py-20 bg-gradient-to-br from-primary/5 via-accent/10 to-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Why EndoMD Health?
              </h2>
              <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Partnering with schools to deliver exceptional healthcare outcomes for students.
              </p>
            </div>

            <div className="max-w-6xl mx-auto space-y-8">
              {whyEndoMDPoints.map((item, index) => (
                <Card 
                  key={index}
                  className={`overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${item.bgColor}`}
                >
                  <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-stretch`}>
                    {/* Image */}
                    <div className="w-full md:w-2/5 h-64 md:h-auto">
                      <img 
                        src={item.image} 
                        alt={item.imageAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="w-full md:w-3/5 p-6 md:p-10 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-lg">
                          {index + 1}
                        </div>
                        <div className="h-1 flex-1 bg-gradient-to-r from-accent to-transparent rounded-full" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
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
                      src={realClassroomKids} 
                      alt="Students in a classroom engaged in learning"
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
