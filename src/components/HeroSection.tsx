import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Users, CheckCircle2 } from "lucide-react";
import warmFamilyPortrait from "@/assets/warm-family-portrait.jpg";

const HeroSection = () => {
  return (
    <section className="py-8 lg:py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                Specialized <span className="text-accent">Weight, Growth & Hormone </span> Care for Children & Young
                Adults
              </h1>

              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-muted-foreground">
                    <strong className="font-semibold text-foreground">No more waiting</strong> long months for answers
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-muted-foreground">
                    <strong className="font-semibold text-foreground">No more missed</strong> work or school
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-muted-foreground">
                    <strong className="font-semibold text-foreground">Expert & compassionate care</strong> – on your
                    schedule
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg shadow-md"
                asChild
              >
                <Link to="/login">Get Started</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 py-6 text-lg"
                asChild
              >
                <Link to="/for-parents">Learn More</Link>
              </Button>
            </div>

            {/* Info Cards */}
            <div className="flex flex-col sm:flex-row gap-6 mt-8">
              <div className="flex items-center space-x-3 bg-card border border-border rounded-lg px-6 py-4 shadow-sm">
                <div className="p-2 bg-accent/10 rounded-full">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Serving</p>
                  <p className="text-lg font-bold text-foreground">Virginia & Maryland</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-card border border-border rounded-lg px-6 py-4 shadow-sm">
                <div className="p-2 bg-accent/10 rounded-full">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Age range</p>
                  <p className="text-lg font-bold text-foreground">Birth - 25 years</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={warmFamilyPortrait}
                alt="Happy family with children smiling together, representing pediatric endocrinology care"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
