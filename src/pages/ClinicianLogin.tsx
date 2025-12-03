import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, FileText, HelpCircle, Stethoscope } from "lucide-react";
import whiteMaleDoctorImage from "@/assets/white-male-doctor-portrait.jpg";

const ClinicianLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Login logic will be implemented here
    console.log("Clinician login attempt:", { email });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted/20 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
            <Stethoscope className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Healthcare Provider Portal
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access your e-Consult dashboard, submit requests, and manage patient consultations.
          </p>
        </div>
      </section>

      {/* Login Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-[1fr_auto] gap-6 items-start max-w-5xl mx-auto">
            {/* Login Box */}
            <div className="order-2 md:order-1">
              <div className="bg-card border border-border rounded-lg shadow-md p-8 md:p-10 max-w-lg mx-auto md:mx-0">
                <h2 className="text-3xl font-bold text-foreground mb-8">Clinician Login</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@practice.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full h-12 text-base"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-base">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full h-12 text-base"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg h-12"
                    size="lg"
                  >
                    Log In
                  </Button>

                  <div className="text-center space-y-3">
                    <Link
                      to="/forgot-password"
                      className="text-base text-primary hover:underline block"
                    >
                      Forgot your password?
                    </Link>
                    
                    <Button
                      variant="outline"
                      className="w-full text-base h-12"
                      asChild
                    >
                      <Link to="/provider-registration">Register as a Provider</Link>
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* Supporting Visual */}
            <div className="order-1 md:order-2 flex items-start justify-center md:justify-end">
              <img
                src={whiteMaleDoctorImage}
                alt="Professional male doctor in white coat"
                className="rounded-lg shadow-lg w-full max-w-[373px] h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">HIPAA Compliant</h3>
              <p className="text-sm text-muted-foreground">
                Secure, encrypted platform for patient consultations
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">e-Consult Dashboard</h3>
              <p className="text-sm text-muted-foreground">
                Submit requests and track consultation status
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Provider Support</h3>
              <p className="text-sm text-muted-foreground">
                <Link to="/contact-us" className="text-primary hover:underline">
                  Contact us
                </Link>{" "}
                for registration or technical assistance
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ClinicianLogin;
