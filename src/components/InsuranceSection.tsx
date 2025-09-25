import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import unitedhealthcareLogo from "@/assets/logos/uhc-logo.svg";
import anthemLogo from "@/assets/logos/anthem-logo.jpg";
import cignaLogo from "@/assets/logos/cigna-logo.webp";
import aetnaLogo from "@/assets/logos/aetna-logo.svg";
import humanaLogo from "@/assets/logos/humana-logo.jpg";
import sentaraLogo from "@/assets/logos/sentara-logo-new.jpg";
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
            <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
              We accept most major insurance plans,{" "}
              <span className="text-sunshine-boost">including Medicaid, Tricare, ChampVA</span>
            </h2>
          </div>

          {/* Continuously Rotating Insurance Logos Tape */}
          <div className="w-full overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg py-6">
            <div className="relative">
              <div className="flex animate-scroll space-x-3 md:space-x-4">
                {/* First set of logos */}
                {insuranceLogos.map((insurance, index) => {
                  const isLargerLogo = ['Anthem Blue Cross Blue Shield', 'UnitedHealthcare', 'Aetna', 'Humana', 'CareFirst'].includes(insurance.name);
                  return (
                    <div key={`first-${index}`} className="flex-shrink-0">
                      <div className={`${isLargerLogo ? 'w-48 h-28 md:w-48 md:h-28' : 'w-32 h-20 md:w-40 md:h-24'} flex items-center justify-center p-4`}>
                        <img
                          src={insurance.logo}
                          alt={`${insurance.name} logo`}
                          className={`${isLargerLogo ? 'scale-125' : ''} max-w-full max-h-full object-contain transition-all duration-300 hover:scale-110`}
                        />
                      </div>
                    </div>
                  );
                })}
                {/* Second set of logos for seamless loop */}
                {insuranceLogos.map((insurance, index) => {
                  const isLargerLogo = ['Anthem Blue Cross Blue Shield', 'UnitedHealthcare', 'Aetna', 'Humana', 'CareFirst'].includes(insurance.name);
                  return (
                    <div key={`second-${index}`} className="flex-shrink-0">
                      <div className={`${isLargerLogo ? 'w-40 h-24 md:w-48 md:h-28' : 'w-32 h-20 md:w-40 md:h-24'} flex items-center justify-center p-4`}>
                        <img
                          src={insurance.logo}
                          alt={`${insurance.name} logo`}
                          className={`${isLargerLogo ? 'scale-125' : ''} max-w-full max-h-full object-contain transition-all duration-300 hover:scale-110`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default InsuranceSection;