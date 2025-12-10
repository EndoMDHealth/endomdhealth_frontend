import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Shield, FileText, HelpCircle, Calendar, Upload, MapPin, CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import familyImage from "@/assets/family-telehealth-couch.jpg";

const ForPatients = () => {
  const features = [
    {
      icon: FileText,
      title: 'View Your Health Records',
      description: 'Access lab results, visit summaries, and medical documents anytime',
    },
    {
      icon: Calendar,
      title: 'Manage Appointments',
      description: 'Schedule, reschedule, or cancel appointments with ease',
    },
    {
      icon: Upload,
      title: 'Upload Documents',
      description: 'Share labs, imaging, and other documents with your care team',
    },
    {
      icon: MapPin,
      title: 'Find Labs Near You',
      description: 'Locate nearby lab facilities for your testing needs',
    },
    {
      icon: CreditCard,
      title: 'Manage Billing',
      description: 'View invoices, update payment methods, and track payments',
    },
    {
      icon: HelpCircle,
      title: 'Get Support',
      description: 'Message your care team and access educational resources',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted/20 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Your Health, <span className="text-patient-teal">Your Portal</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Access your appointments, health records, and care tools in one secure, easy-to-use patient portal designed for families.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-patient-teal hover:bg-patient-teal/90 text-white"
                >
                  <Link to="/patient-login">Log In to Portal</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                >
                  <Link to="/patient-login">Create Account</Link>
                </Button>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <img
                src={familyImage}
                alt="Parent and child using healthcare portal together"
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Everything You Need in One Place
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our patient portal gives you 24/7 access to your child's health information and care tools.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="border hover:border-patient-teal/50 hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-patient-teal/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-patient-teal" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-patient-teal/10 text-patient-teal mb-3">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Secure & HIPAA Compliant</h3>
              <p className="text-sm text-muted-foreground">
                Your health data is encrypted and protected
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-patient-teal/10 text-patient-teal mb-3">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">24/7 Access</h3>
              <p className="text-sm text-muted-foreground">
                View your records anytime, anywhere
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-patient-teal/10 text-patient-teal mb-3">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Support Available</h3>
              <p className="text-sm text-muted-foreground">
                <Link to="/contact-us" className="text-patient-teal hover:underline">
                  Contact us
                </Link>{" "}
                for help with your account
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Log in to your patient portal or create an account to access your child's health information.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-patient-teal hover:bg-patient-teal/90 text-white"
          >
            <Link to="/patient-login">Access Patient Portal</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ForPatients;
