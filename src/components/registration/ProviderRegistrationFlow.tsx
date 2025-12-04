import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowRight, ArrowLeft, Stethoscope, User, FileCheck, CheckCircle } from "lucide-react";

interface ProviderRegistrationFlowProps {
  onSuccess: (email: string) => void;
  onFailed: (message: string) => void;
}

type Step = 1 | 2 | 3 | 4;

const ProviderRegistrationFlow = ({ onSuccess, onFailed }: ProviderRegistrationFlowProps) => {
  const { signUp } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isLoading, setIsLoading] = useState(false);

  // Step 1: Basic Info
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Step 2: Identity Verification
  const [npiNumber, setNpiNumber] = useState("");
  const [stateLicense, setStateLicense] = useState("");

  // Step 3: Additional Requirements
  const [practiceName, setPracticeName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");

  const steps = [
    { number: 1, title: "Account Info", icon: User },
    { number: 2, title: "Identity Verification", icon: FileCheck },
    { number: 3, title: "Practice Details", icon: Stethoscope },
    { number: 4, title: "Review & Submit", icon: CheckCircle },
  ];

  const validateStep1 = () => {
    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" });
      return false;
    }
    if (password !== confirmPassword) {
      toast({ title: "Passwords don't match", description: "Please ensure passwords match.", variant: "destructive" });
      return false;
    }
    if (password.length < 6) {
      toast({ title: "Password too short", description: "Password must be at least 6 characters.", variant: "destructive" });
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!npiNumber.trim() || !stateLicense.trim()) {
      toast({ title: "Missing fields", description: "NPI and state license are required for verification.", variant: "destructive" });
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!state.trim()) {
      toast({ title: "Missing fields", description: "State is required.", variant: "destructive" });
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    if (currentStep === 3 && !validateStep3()) return;
    setCurrentStep((prev) => (prev + 1) as Step);
  };

  const handleBack = () => {
    setCurrentStep((prev) => (prev - 1) as Step);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      // Sign up the user
      const { error: signUpError } = await signUp(email, password, fullName);

      if (signUpError) {
        onFailed(signUpError.message);
        setIsLoading(false);
        return;
      }

      // Wait for auth to complete
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Get the session
      const { data: session } = await supabase.auth.getSession();

      if (session.session?.user) {
        // Create physician role
        const { error: roleError } = await supabase.from("physician_roles").insert({
          user_id: session.session.user.id,
          role: "physician",
          practice_name: practiceName || null,
          npi_number: npiNumber || null,
          specialty: specialty || null,
          state: state || null,
          phone: phone || null,
          verified: false,
        });

        if (roleError) {
          console.error("Error creating physician role:", roleError);
          onFailed("Account created but provider profile setup failed. Please contact support.");
          setIsLoading(false);
          return;
        }

        toast({
          title: "Registration Successful!",
          description: "Welcome to the e-Consult portal.",
        });
        onSuccess(email);
      } else {
        toast({
          title: "Almost there!",
          description: "Please check your email to verify your account.",
        });
        onSuccess(email);
      }
    } catch (error) {
      onFailed("An unexpected error occurred. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <Card className="border-purple-200">
      <CardHeader className="border-b border-purple-100 bg-purple-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
            <Stethoscope className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <CardTitle className="text-xl text-purple-900">Provider Registration</CardTitle>
            <CardDescription>Healthcare professional account setup</CardDescription>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mt-6">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  currentStep >= step.number
                    ? "bg-purple-600 text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {currentStep > step.number ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  step.number
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-12 md:w-20 h-1 mx-1 ${
                    currentStep > step.number ? "bg-purple-600" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        {/* Step 1: Account Info */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-4">Account Information</h3>
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                placeholder="Dr. Jane Smith"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@practice.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Min 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Identity Verification */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-4">Identity Verification</h3>
            <p className="text-sm text-muted-foreground mb-4">
              We need to verify your credentials to ensure platform security.
            </p>
            <div className="space-y-2">
              <Label htmlFor="npiNumber">NPI Number *</Label>
              <Input
                id="npiNumber"
                placeholder="1234567890"
                value={npiNumber}
                onChange={(e) => setNpiNumber(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stateLicense">State License Number *</Label>
              <Input
                id="stateLicense"
                placeholder="Your state medical license number"
                value={stateLicense}
                onChange={(e) => setStateLicense(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Step 3: Additional Requirements */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-4">Practice Details</h3>
            <div className="space-y-2">
              <Label htmlFor="practiceName">Practice Name</Label>
              <Input
                id="practiceName"
                placeholder="Your Medical Practice"
                value={practiceName}
                onChange={(e) => setPracticeName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialty">Specialty</Label>
              <Input
                id="specialty"
                placeholder="e.g., Pediatrics, Family Medicine"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                placeholder="VA or MD"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Currently serving providers in Virginia and Maryland
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-4">Review Your Information</h3>
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium">{fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">NPI Number:</span>
                <span className="font-medium">{npiNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Practice:</span>
                <span className="font-medium">{practiceName || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Specialty:</span>
                <span className="font-medium">{specialty || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">State:</span>
                <span className="font-medium">{state}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              By registering, you agree to our terms of service and privacy policy.
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {currentStep > 1 ? (
            <Button variant="outline" onClick={handleBack} disabled={isLoading}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <Button onClick={handleNext}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isLoading} className="bg-purple-600 hover:bg-purple-700">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Complete Registration
                  <CheckCircle className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProviderRegistrationFlow;
