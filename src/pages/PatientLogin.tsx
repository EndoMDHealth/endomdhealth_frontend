import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, FileText, HelpCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import familyImage from "@/assets/family-telehealth-couch.jpg";

const PatientLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState("");
  
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/patient-dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          toast({
            title: "Sign Up Failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Account Created",
            description: "Please check your email to verify your account.",
          });
          navigate('/verify-email');
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: "Login Failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "You have successfully logged in.",
          });
          navigate('/patient-dashboard');
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
              <div className="bg-card border border-border rounded-xl shadow-lg p-8 max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {isSignUp ? 'Create Account' : 'Patient Login'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {isSignUp && (
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="w-full"
                      />
                    </div>
                  )}
                  
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
                    className="w-full bg-patient-teal text-white hover:bg-patient-teal/90"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        {isSignUp ? 'Creating Account...' : 'Logging In...'}
                      </>
                    ) : (
                      isSignUp ? 'Create Account' : 'Log In'
                    )}
                  </Button>

                  <div className="text-center space-y-3">
                    {!isSignUp && (
                      <Link
                        to="/reset-password"
                        className="text-sm text-primary hover:underline block"
                      >
                        Forgot your password?
                      </Link>
                    )}
                    
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => setIsSignUp(!isSignUp)}
                    >
                      {isSignUp ? 'Already have an account? Log In' : 'Create an Account'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* Supporting Visual */}
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

      {/* Info Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-patient-teal/10 text-patient-teal mb-3">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Secure Portal</h3>
              <p className="text-sm text-muted-foreground">
                HIPAA-compliant and encrypted for your privacy
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-patient-teal/10 text-patient-teal mb-3">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Easy Access</h3>
              <p className="text-sm text-muted-foreground">
                View visits, labs, and messages anytime
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

      <Footer />
    </div>
  );
};

export default PatientLogin;
