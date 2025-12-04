import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowRight, ArrowLeft, User, FileCheck, CheckCircle, Heart } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface PatientRegistrationFlowProps {
  onSuccess: (email: string) => void;
  onFailed: (message: string) => void;
}

type Step = 1 | 2 | 3 | 4;

const PatientRegistrationFlow = ({ onSuccess, onFailed }: PatientRegistrationFlowProps) => {
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
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phone, setPhone] = useState("");

  // Step 3: Additional Requirements
  const [isParent, setIsParent] = useState(false);
  const [childName, setChildName] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const steps = [
    { number: 1, title: "Account Info", icon: User },
    { number: 2, title: "Verification", icon: FileCheck },
    { number: 3, title: "Additional Info", icon: Heart },
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
    if (!phone.trim()) {
      toast({ title: "Missing fields", description: "Phone number is required.", variant: "destructive" });
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!acceptTerms) {
      toast({ title: "Terms required", description: "Please accept the terms and conditions.", variant: "destructive" });
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

      toast({
        title: "Registration Successful!",
        description: "Please check your email to verify your account.",
      });
      onSuccess(email);
    } catch (error) {
      onFailed("An unexpected error occurred. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <Card className="border-green-200">
      <CardHeader className="border-b border-green-100 bg-green-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <User className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <CardTitle className="text-xl text-green-900">Patient Registration</CardTitle>
            <CardDescription>Patient or parent account setup</CardDescription>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mt-6">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  currentStep >= step.number
                    ? "bg-green-600 text-white"
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
                    currentStep > step.number ? "bg-green-600" : "bg-muted"
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
                placeholder="Your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
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

        {/* Step 2: Verification */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-4">Contact Verification</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Provide your contact information for account verification.
            </p>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Step 3: Additional Info */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-4">Additional Information</h3>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isParent"
                checked={isParent}
                onCheckedChange={(checked) => setIsParent(checked as boolean)}
              />
              <Label htmlFor="isParent">I am registering on behalf of my child</Label>
            </div>
            {isParent && (
              <div className="space-y-2 mt-4">
                <Label htmlFor="childName">Child's Name</Label>
                <Input
                  id="childName"
                  placeholder="Your child's name"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                />
              </div>
            )}
            <div className="flex items-start space-x-2 mt-6">
              <Checkbox
                id="acceptTerms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
              />
              <Label htmlFor="acceptTerms" className="text-sm leading-relaxed">
                I accept the{" "}
                <a href="/terms-of-service" className="text-primary hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy-policy" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </Label>
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
                <span className="text-muted-foreground">Phone:</span>
                <span className="font-medium">{phone}</span>
              </div>
              {isParent && childName && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Child's Name:</span>
                  <span className="font-medium">{childName}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Account Type:</span>
                <span className="font-medium text-green-600">
                  {isParent ? "Parent/Guardian" : "Patient"}
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              A verification email will be sent to confirm your account.
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
            <Button onClick={handleSubmit} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
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

export default PatientRegistrationFlow;
