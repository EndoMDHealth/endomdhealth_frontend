import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Clock, Shield } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import serviceAreaMap from "@/assets/service-area-map.jpg";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary to-medical-trust text-primary-foreground overflow-hidden">
      {/* Hero Background with Image Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Child with parent in pediatric consultation" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-medical-trust/80" />
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Specialized pediatric endocrine care – guiding your child through every stage of growth.
              </h1>
              <p className="text-xl md:text-2xl text-primary-foreground/90 leading-relaxed">
                Serving patients ages Birth–23 years in Maryland and Virginia.
              </p>
            </div>

            {/* Value Props */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-primary-foreground/10 border-primary-foreground/20 p-4">
                <div className="flex items-center space-x-2 text-primary-foreground">
                  <Clock className="h-5 w-5 text-accent" />
                  <span className="font-semibold">Seen in ~1 week</span>
                </div>
              </Card>
              <Card className="bg-primary-foreground/10 border-primary-foreground/20 p-4">
                <div className="flex items-center space-x-2 text-primary-foreground">
                  <MapPin className="h-5 w-5 text-accent" />
                  <span className="font-semibold">Virtual & in-person</span>
                </div>
              </Card>
              <Card className="bg-primary-foreground/10 border-primary-foreground/20 p-4">
                <div className="flex items-center space-x-2 text-primary-foreground">
                  <Shield className="h-5 w-5 text-accent" />
                  <span className="font-semibold">Insurance accepted</span>
                </div>
              </Card>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8">
                Request an Appointment
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Learn More About Us
              </Button>
            </div>
          </div>

          {/* Service Area Map */}
          <div className="relative">
            <Card className="bg-primary-foreground/95 p-8 text-primary">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Our Service Area</h3>
                  <p className="text-muted-foreground">
                    Providing specialized pediatric endocrinology care across Maryland and Virginia
                  </p>
                </div>
                
                <div className="relative">
                  <img 
                    src={serviceAreaMap} 
                    alt="Service area map showing Maryland and Virginia" 
                    className="w-full h-48 object-contain rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-primary">Maryland</h4>
                    <p className="text-muted-foreground">Comprehensive coverage</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Virginia</h4>
                    <p className="text-muted-foreground">Statewide service</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;