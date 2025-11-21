import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, Clock, MessageSquare, MapPin, Target, Users, Award, Heart, Calendar, FileText, Stethoscope, ClipboardList, Repeat } from "lucide-react";

const MedicalConsult = () => {
  const services = [
    "Comprehensive medical evaluation",
    "Lab interpretation",
    "Medication adjustments",
    "Dietary coaching",
    "Mindset coaching",
    "Second opinions"
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Fast Appointments",
      description: "Avoid the typical 3-6 month wait to see a specialist with quick, easy scheduling."
    },
    {
      icon: MessageSquare,
      title: "Direct Communication",
      description: "Enjoy easy access to your specialist with prompt responses, without waiting days."
    },
    {
      icon: MapPin,
      title: "Convenient Access",
      description: "No need to take a day off school or work or drive 2-3 hours to see a specialist."
    },
    {
      icon: Target,
      title: "Root Cause Treatment",
      description: "Address the underlying causes of your child's endocrine issues for effective, long-term solutions."
    },
    {
      icon: Users,
      title: "Skip the Waiting Room",
      description: "Save time by eliminating lengthy clinic waiting times with virtual consultations."
    },
    {
      icon: Award,
      title: "Comprehensive Coaching",
      description: "Benefit from weekly nutrition and success coaching to support your child's optimal mental and physical health."
    },
    {
      icon: Heart,
      title: "Ongoing Expert Care",
      description: "Receive expert medical care for managing weight, growth, and hormone-related concerns continuously."
    },
    {
      icon: CheckCircle2,
      title: "Outstanding Care",
      description: "We don't rush to get you out the door. We give your child the time and care needed to make a meaningful difference."
    }
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

  const testimonials = [
    {
      quote: "Dr. Davallow was absolutely amazing!! She didn't discount any of my concerns, she listened and was empathetic. I wish all medical professionals were as wonderful as she is!",
      author: "Isabella (Parent)"
    },
    {
      quote: "We just had a wonderful telemedicine visit with Dr. Davallow on Zoom! She listened to all of our concerns and answered every question we asked, while making us feel comfortable and relaxed. I am so thankful she was referred to us by our Pediatrician.",
      author: "Erin (Parent)"
    },
    {
      quote: "Dr. Davallow is warm and appropriately friendly and professional. She listens with care and addresses questions or concerns.",
      author: "Jason (Parent)"
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={index} className="relative hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/20" />
                  )}
                </Card>
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

      {/* Why Choose Us Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose EndoMD Health?
            </h2>
            <p className="text-lg text-muted-foreground">
              We want to see your child thrive and deliver outstanding convenient care to achieve this result.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-all hover:scale-105">
                  <CardHeader>
                    <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {benefit.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Parents are Saying
            </h2>
            <p className="text-lg text-muted-foreground">
              We select our team members carefully to ensure your child receives outstanding care.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-muted/50 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <svg className="h-8 w-8 text-primary/40" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-foreground mb-4 italic">"{testimonial.quote}"</p>
                  <p className="text-sm font-semibold text-primary">— {testimonial.author}</p>
                </CardContent>
              </Card>
            ))}
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
