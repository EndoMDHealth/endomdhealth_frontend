import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import unitedhealthcareLogo from "@/assets/logos/unitedhealthcare-logo.jpg";
import anthemLogo from "@/assets/logos/anthem-logo.jpg";
import cignaLogo from "@/assets/logos/cigna-logo.jpg";
import aetnaLogo from "@/assets/logos/aetna-logo.jpg";
import humanaLogo from "@/assets/logos/humana-logo.jpg";
import sentaraLogo from "@/assets/logos/sentara-logo.jpg";
import carefirstLogo from "@/assets/logos/carefirst-logo.jpg";

const InsuranceSection = () => {
  const insuranceLogos = [
    { name: "Anthem Blue Cross Blue Shield", logo: anthemLogo },
    { name: "UnitedHealthcare", logo: unitedhealthcareLogo },
    { name: "Cigna", logo: cignaLogo },
    { name: "Sentara", logo: sentaraLogo },
    { name: "Aetna", logo: aetnaLogo },
    { name: "Humana", logo: humanaLogo },
    { name: "CareFirst", logo: carefirstLogo }
  ];

  return (
    <section className="py-16 bg-warm-peach">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-primary leading-tight">
              We Accept Most Major Insurance Plans,{" "}
              <span className="text-sunshine-boost">Including Medicaid</span>
            </h2>
          </div>

          {/* Rotating Insurance Logos Tape */}
          <div className="w-full overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg py-8">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-5xl mx-auto"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {insuranceLogos.map((insurance, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/3 md:basis-1/5">
                    <div className="p-4">
                      <Card className="border-none shadow-none bg-transparent">
                        <div className="aspect-[3/2] flex items-center justify-center p-4">
                          <img
                            src={insurance.logo}
                            alt={`${insurance.name} logo`}
                            className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
                          />
                        </div>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          <div className="space-y-4">
            <p className="text-lg text-primary/80 max-w-2xl mx-auto">
              See our rates without insurance or get in touch and we can let you know.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsuranceSection;