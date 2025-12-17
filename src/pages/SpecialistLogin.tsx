import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Shield, FileText, HelpCircle, Stethoscope, Loader2, ArrowRight, Activity } from "lucide-react";
import doctorImage from "@/assets/dr-davallow.png";

const SpecialistLogin = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signIn, signUp } = useAuth();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState(searchParams.get('register') ? 'register' : 'login');
  const [isLoading, setIsLoading] = useState(false);
  
  const from = (location.state as { from?: string })?.from || '/specialist-dashboard';
  
  // Login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Register form
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [specialty, setSpecialty] = useState("Pediatric Endocrinology");
  const [npiNumber, setNpiNumber] = useState("");
  const [medicalLicense, setMedicalLicense] = useState("");
  const [state, setState] = useState("");

  useEffect(() => {
    document.title = "Specialist Login | EndoMD Health";
  }, []);

  useEffect(() => {
    const checkSpecialistStatus = async () => {
      if (user) {
        const { data } = await supabase
          .from('physician_roles')
          .select('id, role')
          .eq('user_id', user.id)
          .eq('role', 'specialist')
          .maybeSingle();
        
        if (data) {
          navigate(from, { replace: true });
        }
      }
    };
    
    checkSpecialistStatus();
  }, [user, navigate, from]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await signIn(loginEmail, loginPassword);

    if (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    const { data: session } = await supabase.auth.getSession();
    if (session.session?.user) {
      const { data: specialistData } = await supabase
        .from('physician_roles')
        .select('id, role')
        .eq('user_id', session.session.user.id)
        .eq('role', 'specialist')
        .maybeSingle();

      if (specialistData) {
        toast({
          title: "Welcome back!",
          description: "Redirecting to your specialist dashboard...",
        });
        navigate(from, { replace: true });
      } else {
        toast({
          title: "Access Denied",
          description: "This portal is for registered pediatric endocrinologists only. Please register first.",
          variant: "destructive",
        });
        setActiveTab('register');
      }
    }
    
    setIsLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerPassword !== registerConfirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    if (registerPassword.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const { error: signUpError } = await signUp(registerEmail, registerPassword, fullName);

    if (signUpError) {
      toast({
        title: "Registration Failed",
        description: signUpError.message,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    const { data: session } = await supabase.auth.getSession();
    
    if (session.session?.user) {
      const { error: roleError } = await supabase
        .from('physician_roles')
        .insert({
          user_id: session.session.user.id,
          role: 'specialist',
          npi_number: npiNumber || null,
          specialty: specialty || 'Pediatric Endocrinology',
          state: state || null,
          verified: false,
        });

      if (roleError) {
        console.error('Error creating specialist role:', roleError);
        toast({
          title: "Registration Incomplete",
          description: "Account created but specialist profile setup failed. Please contact support.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Registration Successful!",
          description: "Welcome to the Specialist Portal. You can now access your dashboard.",
        });
        navigate(from, { replace: true });
      }
    } else {
      toast({
        title: "Almost there!",
        description: "Please check your email to verify your account, then log in.",
      });
      setActiveTab('login');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0d1b2a]">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#0d1b2a] to-[#1b2838] py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 text-accent mb-4">
            <Activity className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Specialist Portal</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Pediatric Endocrinologists – Receive and respond to e-Consults from referring PCPs.
          </p>
          <p className="text-sm text-accent mt-2">
            This portal is exclusively for pediatric endocrinology specialists.
          </p>
        </div>
      </section>

      {/* Login/Register Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-[1fr_auto] gap-6 items-start max-w-5xl mx-auto">
            {/* Form Box */}
            <div className="order-2 md:order-1">
              <div className="bg-card border border-border rounded-lg shadow-md p-8 md:p-10 max-w-lg mx-auto md:mx-0">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="login-email" className="text-base">Email</Label>
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="your.email@hospital.com"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          required
                          className="w-full h-12 text-base"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="login-password" className="text-base">Password</Label>
                        <Input
                          id="login-password"
                          type="password"
                          placeholder="Enter your password"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          required
                          className="w-full h-12 text-base"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg h-12"
                        size="lg"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Logging in...
                          </>
                        ) : (
                          <>
                            Log In
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>

                      <div className="text-center">
                        <Link to="/reset-password" className="text-base text-accent hover:underline">
                          Forgot your password?
                        </Link>
                      </div>
                    </form>
                  </TabsContent>

                  <TabsContent value="register">
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 space-y-2">
                          <Label htmlFor="full-name">Full Name *</Label>
                          <Input
                            id="full-name"
                            placeholder="Dr. Jane Smith"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            className="h-11"
                          />
                        </div>

                        <div className="col-span-2 space-y-2">
                          <Label htmlFor="register-email">Email *</Label>
                          <Input
                            id="register-email"
                            type="email"
                            placeholder="your.email@hospital.com"
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                            required
                            className="h-11"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="register-password">Password *</Label>
                          <Input
                            id="register-password"
                            type="password"
                            placeholder="Min 6 characters"
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                            required
                            className="h-11"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm Password *</Label>
                          <Input
                            id="confirm-password"
                            type="password"
                            placeholder="Confirm password"
                            value={registerConfirmPassword}
                            onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                            required
                            className="h-11"
                          />
                        </div>

                        <div className="col-span-2 space-y-2">
                          <Label htmlFor="specialty">Specialty</Label>
                          <Input
                            id="specialty"
                            placeholder="Pediatric Endocrinology"
                            value={specialty}
                            onChange={(e) => setSpecialty(e.target.value)}
                            className="h-11"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="npi">NPI Number *</Label>
                          <Input
                            id="npi"
                            placeholder="1234567890"
                            value={npiNumber}
                            onChange={(e) => setNpiNumber(e.target.value)}
                            required
                            className="h-11"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="medical-license">Medical License #</Label>
                          <Input
                            id="medical-license"
                            placeholder="License number"
                            value={medicalLicense}
                            onChange={(e) => setMedicalLicense(e.target.value)}
                            className="h-11"
                          />
                        </div>

                        <div className="col-span-2 space-y-2">
                          <Label htmlFor="state">State *</Label>
                          <Input
                            id="state"
                            placeholder="VA or MD"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                            className="h-11"
                          />
                          <p className="text-xs text-muted-foreground">
                            Currently serving specialists in Virginia and Maryland
                          </p>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-12 mt-6"
                        size="lg"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating Account...
                          </>
                        ) : (
                          <>
                            Register as Specialist
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Supporting Visual */}
            <div className="order-1 md:order-2 flex items-start justify-center md:justify-end">
              <img
                src={doctorImage}
                alt="Dr. Ladan Davallow - Pediatric Endocrinologist"
                className="rounded-lg shadow-lg w-full max-w-[373px] h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-[#1b2838]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/20 text-accent mb-3">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-white mb-2">HIPAA Compliant</h3>
              <p className="text-sm text-gray-400">Secure, encrypted platform for patient consultations</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/20 text-accent mb-3">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-white mb-2">e-Consult Review</h3>
              <p className="text-sm text-gray-400">Receive and respond to consultations from PCPs</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/20 text-accent mb-3">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-white mb-2">Specialist Support</h3>
              <p className="text-sm text-gray-400">
                <Link to="/contact-us" className="text-accent hover:underline">
                  Contact us
                </Link>{" "}
                for assistance
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SpecialistLogin;
