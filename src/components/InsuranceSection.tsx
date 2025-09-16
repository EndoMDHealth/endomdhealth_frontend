import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const InsuranceSection = () => {
  const insuranceLogos = [
    "Aetna", "Blue Cross Blue Shield", "Cigna", "United Healthcare", 
    "Medicaid", "Tricare", "Humana", "Kaiser Permanente"
  ];

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              In-network with most insurance plans, Medicaid and Tricare.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We work with your insurance to make quality pediatric endocrine care accessible to all families.
            </p>
          </div>

          {/* Insurance Logos Carousel */}
          <div className="relative overflow-hidden">
            <div className="flex space-x-8 py-6 animate-scroll">
              {[...insuranceLogos, ...insuranceLogos].map((insurance, index) => (
                <Card key={index} className="flex-shrink-0 px-6 py-4 bg-card hover:shadow-md transition-shadow">
                  <span className="text-lg font-semibold text-card-foreground whitespace-nowrap">
                    {insurance}
                  </span>
                </Card>
              ))}
            </div>
          </div>

          <Button 
            size="lg" 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Explore Coverage Options
          </Button>
        </div>
      </div>

    </section>
  );
};

export default InsuranceSection;