import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, Calendar, FileText, Stethoscope, ClipboardList, Repeat } from "lucide-react";

const MedicalConsult = () => {
  const services = [
    "Comprehensive medical evaluation",
    "Lab interpretation",
    "Medication adjustments",
    "Dietary coaching",
    "Mindset coaching",
    "Second opinions"
  ];

  const steps = [
    {
      icon: Calendar,
      title: "Check Insurance Coverage & Book a Visit",
      description: "We take most major insurance plans that help with the cost of a consult. Out-of-network patients can select direct pay"
    },
    {
      icon: FileText,
      title: "Complete Intake Form & Labs",
      description: "Fill out the intake form, upload medical records, complete pending labs"
    },
    {
      icon: Stethoscope,
      title: "Medical Consult",
      description: "Meet with a specialist for a detailed evaluation"
    },
    {
      icon: ClipboardList,
      title: "Personalized Treatment Plan",
      description: "Receive a customized treatment plan tailored to your child's needs"
    },
    {
      icon: Repeat,
      title: "Regular Follow-ups & Support",
      description: "Book check-ins with your specialist to monitor progress"
    }
  ];

  const faqs = [
    {
      question: "What can I expect during a virtual consultation?",
      answer: "During a virtual consultation with our pediatric endocrinologist, you can expect a caring and personalized experience for your child. We'll start by talking about your child's health history, growth, and any concerns you have. Your doctor will review recent test results and go over any symptoms or medications your child is taking. Together, we'll create a personalized plan to help your child manage their hormone condition. You'll have plenty of time to ask questions and get clear advice. Our goal is to provide expert care and support, all from the comfort of your home."
    },
    {
      question: "I prefer an in-person appointment. Do you offer that?",
      answer: "Yes. We offer in-person appointments in Richmond, Virginia. To book an in-person consultation, please mention your preference upon booking."
    },
    {
      question: "Do I need health insurance for a consultation?",
      answer: "At EndoMD Health, we accept patients with or without health insurance. We are currently in-network with Cigna and Anthem Blue Cross Blue Shield; and are working on actively expanding our insurance coverage. If you do not have health insurance, you can still book an appointment with a specialist and receive care. We charge a low fee of $250 for an initial consult without insurance, and $150 for a follow-up consult."
    },
    {
      question: "Where can I get my labs done?",
      answer: "We partner with Quest Diagnostics for labs. Quest has convenient locations across the nation. Once our physician puts in a lab request you can just show up to a Quest location and have your labs done. We will receive the results directly from Quest and will update you."
    },
    {
      question: "How soon can I meet with the pediatric endocrinologist?",
      answer: "As soon as you finish your medical questionnaire and obtain the required labs, our team will send you options to schedule your video visit with your doctor. Our goal is to get your child scheduled within 1-2 business days."
    },
    {
      question: "Can I get a second opinion through EndoMD Health?",
      answer: "Yes, we provide second opinions and would be happy to look at your child's past medical history, labs and other relevant medical information to diagnose and treat their hormone problem. Our goal is that you are completely satisfied and confident in your child's diagnosis and treatment plan."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Comprehensive Medical Consult
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Get the Care Your Child Deserves
            </p>
            <p className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
              We understand that your child is unique and deserves individualized care and we provide that.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto">
              {services.map((service, index) => (
                <div key={index} className="flex items-center gap-3 text-left">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{service}</span>
                </div>
              ))}
            </div>

            <Button size="lg" className="text-lg px-8">
              Get Started
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Working with us is simple! We like to keep our process short and sweet.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex gap-6 items-start">
                  {/* Step Number in Accent Yellow */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-[hsl(var(--accent))] flex items-center justify-center">
                      <span className="text-2xl font-bold text-[hsl(var(--accent-foreground))]">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  
                  {/* Step Content */}
                  <div className="flex-1 pt-2">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className="h-6 w-6 text-primary" />
                      <h3 className="text-xl font-semibold text-foreground">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-[50px] mt-20 w-0.5 h-12 bg-[hsl(var(--accent))]/30" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="text-lg px-8">
              Get Started
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Take the first step towards better health for your child. Schedule your comprehensive medical consult today.
          </p>
          <Button size="lg" className="text-lg px-8">
            Book Your Consult
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MedicalConsult;
