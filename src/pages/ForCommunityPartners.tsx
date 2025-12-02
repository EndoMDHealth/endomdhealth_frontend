import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Video, 
  Users, 
  GraduationCap, 
  Heart,
  CheckCircle2
} from "lucide-react";
import happyChildGrass from "@/assets/happy-child-grass.jpg";

const ForCommunityPartners = () => {
  useEffect(() => {
    document.title = "Community Partners | EndoMD Health";
  }, []);

  const partnershipIncludes = [
    {
      icon: Video,
      title: "On-site & virtual pediatric endocrine consultations",
      description: "Bringing specialist care directly to your community through flexible consultation options."
    },
    {
      icon: Users,
      title: "Collaborative care plans",
      description: "Working together with local providers to develop comprehensive treatment strategies."
    },
    {
      icon: GraduationCap,
      title: "Educational workshops & training",
      description: "For school nurses, healthcare professionals, and families to better understand and manage endocrine conditions."
    },
    {
      icon: Heart,
      title: "Ongoing community engagement",
      description: "Through outreach programs, screenings, and awareness initiatives that promote early detection and intervention."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
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
                Your Partner for Healthier Communities and Happier Children
              </h1>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-lg md:text-xl text-foreground leading-relaxed">
                Pediatric endocrinologists are scarce in many areas. Families may wait long months to get answers to their questions. Through community-based partnerships, EndoMD Health brings expert care closer to families who need it most.
              </p>
              <p className="text-lg md:text-xl text-foreground leading-relaxed">
                Our collaboration with community organizations helps fill critical gaps in care, and ensures children receive timely diagnosis, treatment and ongoing management of conditions like diabetes, thyroid disorders, and growth concerns.
              </p>
              <p className="text-lg md:text-xl text-foreground leading-relaxed font-medium text-primary">
                We are passionate about collaborating with communities to give each child the access to specialized care that they deserve.
              </p>
            </div>
          </div>
        </section>

        {/* What Can Partnership Include Section */}
        <section className="py-12 md:py-16 bg-softTeal">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  What can a partnership include?
                </h2>
                <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {partnershipIncludes.map((item, index) => (
                  <Card 
                    key={index}
                    className="p-6 bg-background border-0 shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-accent" />
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

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Ready to Partner with Us?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Let's work together to bring specialized pediatric endocrine care to your community.
            </p>
            <Button 
              asChild
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-3 text-lg"
            >
              <a href="/contact-us">Contact Us Today</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ForCommunityPartners;
