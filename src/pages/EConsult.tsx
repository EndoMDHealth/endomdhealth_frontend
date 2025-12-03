import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  FileText,
  Clock,
  CheckCircle2,
  Users,
  TrendingDown,
  Target,
  Heart,
  Shield,
  ArrowRight,
  Upload,
  MessageSquare,
  ClipboardCheck,
  Stethoscope,
} from "lucide-react";
import providerHeroImage from "@/assets/provider-econsult-hero.jpg";

const EConsult = () => {
  const benefits = [
    {
      icon: TrendingDown,
      title: "Reduces Unnecessary Referrals",
      description:
        "Get specialist guidance without always needing a full in-person consultation, saving time and resources.",
    },
    {
      icon: Target,
      title: "Clear Actionable Guidance",
      description: "Receive specific, documented recommendations you can implement immediately in your practice.",
    },
    {
      icon: Clock,
      title: "Fast Response Time",
      description: "Expert review and recommendations typically provided within 2 business days.",
    },
    {
      icon: Users,
      title: "Improved Care Coordination",
      description: "Seamless collaboration between community clinicians and specialists for optimal patient outcomes.",
    },
    {
      icon: Shield,
      title: "Insurance-Friendly Model",
      description: "Structured to work within existing insurance frameworks and billing practices.",
    },
    {
      icon: Heart,
      title: "Better Patient Experience",
      description:
        "Patients benefit from quicker answers and avoid unnecessary specialist appointments when appropriate.",
    },
  ];

  const processSteps = [
    {
      number: "1",
      title: "Access the Secure Portal",
      description: "Log into your secure provider portal to begin the e-Consult process.",
    },
    {
      number: "2",
      title: "Submit Your Request",
      description:
        "Complete the online form with patient details, clinical questions, and relevant history. Be specific about what guidance you're seeking.",
    },
    {
      number: "3",
      title: "Attach Supporting Documents",
      description:
        "Upload lab results, growth charts, imaging, or other relevant documents. Ensure you have patient/family consent for submission and billing.",
    },
    {
      number: "4",
      title: "Specialist Review",
      description:
        "Our pediatric endocrinologist reviews your case within approximately 2 business days (not for urgent/emergency cases).",
    },
    {
      number: "5",
      title: "Receive Recommendations",
      description:
        "Get direct, actionable guidance including diagnosis suggestions, management steps, and whether an in-person consult is needed.",
    },
    {
      number: "6",
      title: "Continue Care or Refer",
      description:
        "Implement the recommendations in your practice, or proceed with a full specialty referral if recommended.",
    },
  ];

  const appropriateConditions = [
    "Obesity and metabolic concerns",
    "Growth problems and short stature",
    "Type 2 Diabetes management questions",
    "Puberty concerns (early or delayed)",
    "Polycystic Ovary Syndrome (PCOS)",
    "Thyroid disorders and questions",
    "Lab result interpretation",
    "General endocrine questions",
  ];

  const faqs = [
    {
      question: "What types of questions are appropriate for e-Consults?",
      answer:
        "e-Consults work best for questions that don't require a complete medical history review or in-person physical examination. They're ideal for lab interpretation, management guidance on established conditions, second opinions on treatment approaches, and determining if a full specialty referral is necessary.",
    },
    {
      question: "What is the typical turnaround time?",
      answer:
        "Most e-Consults receive a response within approximately 2 business days. However, this service is NOT for urgent or emergency situations. If a patient requires immediate attention, please direct them to appropriate emergency services.",
    },
    {
      question: "What conditions are appropriate for e-Consult?",
      answer:
        "Common endocrine issues including obesity/metabolic concerns, growth problems, Type 2 Diabetes questions, puberty issues, PCOS, thyroid disorders, and lab result questions are all appropriate. The key is whether the question can be adequately addressed without a comprehensive in-person evaluation.",
    },
    {
      question: "Do I need patient consent for e-Consults?",
      answer:
        "Yes, absolutely. The referring provider must obtain patient and/or family consent before submitting an e-Consult request. This consent covers both the consultation itself and any associated billing.",
    },
    {
      question: "Are there geographic or eligibility requirements?",
      answer:
        "e-Consult services are currently available to providers practicing in Virginia and Maryland. The patient must also reside in one of these states. Contact us if you're interested in services for other locations.",
    },
    {
      question: "What happens if an in-person visit is needed?",
      answer:
        "If the specialist determines that an in-person consultation would be beneficial, we'll provide that recommendation along with information on how to schedule a full appointment. Otherwise, you can continue managing the patient with the guidance provided.",
    },
    {
      question: "How is billing handled?",
      answer:
        "e-Consults are billed through established insurance channels. Ensure you have patient consent for billing before submission. Our team can provide additional details on billing codes and documentation requirements.",
    },
    {
      question: "Can I submit urgent or emergency cases?",
      answer:
        "No. e-Consults are designed for non-urgent consultation only. Any urgent medical concerns should be directed to emergency services or scheduled for an immediate in-person evaluation.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 items-center">
            <div className="md:col-span-3">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">e-Consults</h1>
              <p className="text-xl md:text-2xl mb-4 text-muted-foreground font-medium">
                A Clinician's Solution to Improved Care Collaboration
              </p>
              <p className="text-lg mb-8 text-muted-foreground max-w-3xl">
                Streamline specialty care access with our e-Consult service. Get expert pediatric endocrinology guidance
                without the wait.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8" asChild>
                  <Link to="/clinician-login">
                    Submit e-Consult Request
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border hover:bg-secondary"
                >
                  Contact Us
                </Button>
              </div>
            </div>
            <div className="md:col-span-1 hidden md:block">
              <img 
                src={providerHeroImage} 
                alt="Professional healthcare provider in clinical setting" 
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What is E-Consult Section */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-foreground">What is an e-Consult?</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-lg mb-4">
                An e-Consult is a convenient, efficient way for community clinicians to obtain timely specialist advice
                and guidance on patient care without requiring an immediate full specialty referral. Through our secure
                online platform, you can submit clinical questions, share relevant patient information and test results,
                and receive expert recommendations from our board-certified pediatric endocrinologist.
              </p>
              <p className="text-lg mb-4">
                This service reduces unnecessary specialty referrals, improves resource allocation, and provides
                documented guidance that benefits both community clinicians and specialty providers. E-Consults support
                better care coordination while respecting your ongoing patient-provider relationship.
              </p>
              <div className="bg-accent/10 border-l-4 border-accent p-4 rounded-r-lg mt-6">
                <p className="text-foreground font-semibold flex items-start">
                  <Shield className="h-5 w-5 text-accent mr-2 mt-1 flex-shrink-0" />
                  <span>
                    <strong>Important:</strong> e-Consults are for non-urgent consultation only. Any urgent medical
                    concerns should be directed to emergency services or scheduled for immediate in-person evaluation.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Why Choose Our e-Consult Service?
          </h2>
          <p className="text-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Benefits for clinicians, patients, and the entire care team
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-border hover:border-accent/50 transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">How e-Consults Work</h2>
          <p className="text-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            A simple, streamlined process from submission to actionable recommendations
          </p>
          <div className="max-w-4xl mx-auto space-y-6">
            {processSteps.map((step, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-2xl font-bold">
                    {step.number}
                  </div>
                </div>
                <Card className="flex-1 border-border">
                  <CardHeader>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appropriate Conditions Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-foreground">
              Common Conditions for e-Consults
            </h2>
            <p className="text-lg text-center text-muted-foreground mb-10">
              Our e-Consult service is ideal for the following pediatric endocrine concerns:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {appropriateConditions.map((condition, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-secondary rounded-lg border border-border hover:border-accent/50 transition-colors"
                >
                  <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground font-medium">{condition}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-center text-muted-foreground mb-10">
              Key information about our e-Consult service
            </p>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-background border border-border rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left hover:text-accent text-lg font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base pt-2">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Stethoscope className="h-16 w-16 mx-auto mb-6 text-accent" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
              Submit your first e-Consult request today and experience streamlined specialty care collaboration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8" asChild>
                <Link to="/clinician-login">
                  Submit E-Consult Request
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/20"
              >
                Request Your State
              </Button>
            </div>
            <p className="text-sm text-primary-foreground/70 mt-6">
              Currently serving providers in Virginia and Maryland
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EConsult;
