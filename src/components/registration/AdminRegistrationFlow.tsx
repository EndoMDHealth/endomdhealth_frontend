import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowRight, ArrowLeft, Shield, User, FileCheck, CheckCircle } from "lucide-react";

interface AdminRegistrationFlowProps {
  onSuccess: (email: string) => void;
  onFailed: (message: string) => void;
}

type Step = 1 | 2 | 3 | 4;

const AdminRegistrationFlow = ({ onSuccess, onFailed }: AdminRegistrationFlowProps) => {
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
  const [employeeId, setEmployeeId] = useState("");
  const [department, setDepartment] = useState("");

  // Step 3: Additional Requirements
  const [phone, setPhone] = useState("");
  const [adminCode, setAdminCode] = useState("");

  const steps = [
    { number: 1, title: "Account Info", icon: User },
    { number: 2, title: "Identity Verification", icon: FileCheck },
    { number: 3, title: "Admin Verification", icon: Shield },
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
    if (!employeeId.trim()) {
      toast({ title: "Missing fields", description: "Employee ID is required for verification.", variant: "destructive" });
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!adminCode.trim()) {
      toast({ title: "Missing fields", description: "Admin authorization code is required.", variant: "destructive" });
      return false;
    }
    // Simple validation - in production, this would verify against a backend
    if (adminCode !== "ENDOMD-ADMIN-2024") {
      toast({ title: "Invalid code", description: "The admin authorization code is invalid.", variant: "destructive" });
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
        // Create admin role
        const { error: roleError } = await supabase.from("physician_roles").insert({
          user_id: session.session.user.id,
          role: "admin",
          phone: phone || null,
          verified: true, // Admin with valid code is pre-verified
        });

        if (roleError) {
          console.error("Error creating admin role:", roleError);
          onFailed("Account created but admin profile setup failed. Please contact support.");
          setIsLoading(false);
          return;
        }

        toast({
          title: "Registration Successful!",
          description: "Welcome to the admin portal.",
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
    <Card className="border-amber-200">
      <CardHeader className="border-b border-amber-100 bg-amber-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
            <Shield className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <CardTitle className="text-xl text-amber-900">Admin Registration</CardTitle>
            <CardDescription>Platform administrator account setup</CardDescription>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mt-6">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  currentStep >= step.number
                    ? "bg-amber-600 text-white"
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
                    currentStep > step.number ? "bg-amber-600" : "bg-muted"
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
                placeholder="John Smith"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@endomdhealth.com"
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
              Provide your employee credentials for identity verification.
            </p>
            <div className="space-y-2">
              <Label htmlFor="employeeId">Employee ID *</Label>
              <Input
                id="employeeId"
                placeholder="EMP-12345"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                placeholder="e.g., Operations, IT"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Step 3: Admin Verification */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-4">Admin Authorization</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Enter the admin authorization code provided by your supervisor.
            </p>
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
              <Label htmlFor="adminCode">Admin Authorization Code *</Label>
              <Input
                id="adminCode"
                placeholder="Enter authorization code"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Contact your supervisor if you don't have this code.
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
                <span className="text-muted-foreground">Employee ID:</span>
                <span className="font-medium">{employeeId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Department:</span>
                <span className="font-medium">{department || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Role:</span>
                <span className="font-medium text-amber-600">Administrator</span>
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
            <Button onClick={handleSubmit} disabled={isLoading} className="bg-amber-600 hover:bg-amber-700">
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

export default AdminRegistrationFlow;
