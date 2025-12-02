import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, FileText, HelpCircle } from "lucide-react";
import familyImage from "@/assets/family-telehealth-couch.jpg";

const ForPatients = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Login logic will be implemented here
    console.log("Login attempt:", { email });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted/20 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Patient Portal
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access your appointments, health records, and care tools in one place.
          </p>
        </div>
      </section>

      {/* Login Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Login Box */}
            <div className="order-2 md:order-1">
              <div className="bg-card border border-border rounded-lg shadow-md p-8 max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-foreground mb-6">Patient Login</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                    size="lg"
                  >
                    Log In
                  </Button>

                  <div className="text-center space-y-2">
                    <Link
                      to="/forgot-password"
                      className="text-sm text-primary hover:underline block"
                    >
                      Forgot your password?
                    </Link>
                    
                      <Button
                        variant="outline"
                        className="w-full"
                        asChild
                      >
                        <Link to="/create-account">Create an Account</Link>
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Supporting Visual */}
            <div className="order-1 md:order-2">
              <img
                src={familyImage}
                alt="Parent and child using healthcare portal together"
                className="rounded-lg shadow-lg w-full h-auto"
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
              <h3 className="font-semibold text-foreground mb-2">Secure Portal</h3>
              <p className="text-sm text-muted-foreground">
                HIPAA-compliant and encrypted for your privacy
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Easy Access</h3>
              <p className="text-sm text-muted-foreground">
                View visits, labs, and messages anytime
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Support Available</h3>
              <p className="text-sm text-muted-foreground">
                <Link to="/contact" className="text-primary hover:underline">
                  Contact us
                </Link>{" "}
                for help with your account
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ForPatients;
