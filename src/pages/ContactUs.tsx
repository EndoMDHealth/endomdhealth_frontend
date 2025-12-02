import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import contactTeamImage from "@/assets/contact-team.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const ContactUs = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    consent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      toast({
        title: "Consent Required",
        description: "Please agree to receive communications to submit the form.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We will respond shortly.",
    });
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      consent: false,
    });
  };

  useEffect(() => {
    document.title = "Contact Us | EndoMD Health";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-background py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Form */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
                  Contact us
                </h1>
                
                {/* Contact Form */}
                <div className="max-w-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="firstName" className="text-foreground font-medium">
                    First Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="mt-2 bg-muted/30 border-border"
                  />
                </div>

                <div>
                  <Label htmlFor="lastName" className="text-foreground font-medium">
                    Last Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="mt-2 bg-muted/30 border-border"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-foreground font-medium">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-2 bg-muted/30 border-border"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-foreground font-medium">
                    Phone <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-2 bg-muted/30 border-border"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-foreground font-medium">
                    How can we help you? <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-2 bg-muted/30 border-border"
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={(checked) => setFormData({ ...formData, consent: checked as boolean })}
                    className="mt-1"
                  />
                  <Label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed">
                    By checking this box, I agree to receive communications by text message from EndoMD Health regarding inquiries, services offered and general office information. You may opt out by replying STOP or ask for more information by replying HELP. Message frequency varies. Message and data rates may apply. You may review our{" "}
                    <a href="/privacy-policy" className="text-primary hover:text-accent underline">Privacy Policy</a>{" "}
                    to learn how your data is used.
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3"
                >
                  Submit
                </Button>
              </form>

              {/* Important Notice */}
              <div className="mt-8 space-y-4 text-muted-foreground">
                <p>
                  Please note that this form is not for urgent requests. For <strong className="text-foreground">urgent medical concerns</strong>, please proceed to your nearest <strong className="text-foreground">Emergency Room</strong> or call <strong className="text-foreground">911</strong>.
                </p>
                <p>
                  For non-urgent matters, we will respond to your message as soon as possible during regular business hours.
                </p>
              </div>
                </div>
              </div>

              {/* Right Column - Image */}
              <div className="hidden lg:block">
                <div className="sticky top-24">
                  <img
                    src={contactTeamImage}
                    alt="EndoMD Health medical team ready to assist you"
                    className="w-full h-auto rounded-2xl shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Information Section */}
        <section className="bg-muted/30 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl space-y-6 text-muted-foreground leading-relaxed">
              <p>
                At EndoMD Health, we prioritize open communication to ensure that you and your family receive the best pediatric endocrinology care. Whether you have questions about our services, need assistance scheduling an appointment, or want to learn more about how we can help your child thrive, our team is here to support you.
              </p>
              <p>
                Our Contact Us page is your gateway to connecting with our expert team of pediatric endocrinologists, care coordinators, and support staff. We understand the importance of timely and accessible care, so we've made it simple to reach us. You can send us a message using our convenient online form, and we'll get back to you promptly. If you prefer direct communication, feel free to email us at{" "}
                <a href="mailto:info@endomdhealth.com" className="text-primary hover:text-accent underline">info@endomdhealth.com</a>{" "}
                or give us a call at (571) 480-6053.
              </p>
              <p>
                EndoMD Health is dedicated to providing personalized and compassionate care for children with growth, weight, thyroid, or other endocrine-related concerns. Let us help answer your questions and guide you toward the resources and support your child needs.
              </p>
              <p>
                Please reach out to us if you have questions about EndoMD Health or need help to get started! You can send us an email or use this form to get in touch.
              </p>
              <p className="font-medium text-foreground">
                We look forward to hearing from you and being part of your child's health journey. Together, we can help your child thrive!
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactUs;
