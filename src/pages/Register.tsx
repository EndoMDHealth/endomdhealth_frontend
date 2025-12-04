import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, Shield, User, ArrowRight, ArrowLeft, CheckCircle, XCircle, Loader2 } from "lucide-react";
import ProviderRegistrationFlow from "@/components/registration/ProviderRegistrationFlow";
import AdminRegistrationFlow from "@/components/registration/AdminRegistrationFlow";
import PatientRegistrationFlow from "@/components/registration/PatientRegistrationFlow";

type UserRole = "provider" | "admin" | "patient" | null;
type RegistrationStatus = "selecting" | "registering" | "success" | "failed";

const Register = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [status, setStatus] = useState<RegistrationStatus>("selecting");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStatus("registering");
  };

  const handleRegistrationSuccess = (redirectPath: string) => {
    setStatus("success");
    setTimeout(() => {
      navigate(redirectPath, { replace: true });
    }, 2000);
  };

  const handleRegistrationFailed = (message: string) => {
    setErrorMessage(message);
    setStatus("failed");
  };

  const handleRetry = () => {
    setStatus("registering");
    setErrorMessage("");
  };

  const handleBack = () => {
    setSelectedRole(null);
    setStatus("selecting");
    setErrorMessage("");
  };

  const roleCards = [
    {
      role: "provider" as UserRole,
      icon: Stethoscope,
      title: "Healthcare Provider",
      description: "Register as a physician to submit e-Consults and access the provider dashboard.",
      color: "bg-purple-100 text-purple-600",
      borderColor: "border-purple-200 hover:border-purple-400",
    },
    {
      role: "admin" as UserRole,
      icon: Shield,
      title: "Administrator",
      description: "Register as an admin to manage e-Consults and oversee platform operations.",
      color: "bg-amber-100 text-amber-600",
      borderColor: "border-amber-200 hover:border-amber-400",
    },
    {
      role: "patient" as UserRole,
      icon: User,
      title: "Patient / Parent",
      description: "Register as a patient or parent to request appointments and access resources.",
      color: "bg-green-100 text-green-600",
      borderColor: "border-green-200 hover:border-green-400",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Role Selection */}
        {status === "selecting" && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Create Your Account
              </h1>
              <p className="text-lg text-muted-foreground">
                Select your role to begin the registration process
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {roleCards.map((card) => (
                <Card
                  key={card.role}
                  className={`cursor-pointer transition-all duration-200 border-2 ${card.borderColor} hover:shadow-lg`}
                  onClick={() => handleRoleSelect(card.role)}
                >
                  <CardHeader className="text-center pb-2">
                    <div className={`mx-auto w-16 h-16 rounded-full ${card.color} flex items-center justify-center mb-3`}>
                      <card.icon className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-xl">{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-sm mb-4">
                      {card.description}
                    </CardDescription>
                    <Button variant="ghost" className="text-primary">
                      Select <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Button
                  variant="link"
                  className="text-primary p-0 h-auto"
                  onClick={() => navigate("/auth")}
                >
                  Sign in here
                </Button>
              </p>
            </div>
          </div>
        )}

        {/* Registration Flow */}
        {status === "registering" && selectedRole && (
          <div className="max-w-2xl mx-auto">
            <Button
              variant="ghost"
              className="mb-6 text-muted-foreground"
              onClick={handleBack}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to role selection
            </Button>

            {selectedRole === "provider" && (
              <ProviderRegistrationFlow
                onSuccess={() => handleRegistrationSuccess("/provider-dashboard")}
                onFailed={handleRegistrationFailed}
              />
            )}

            {selectedRole === "admin" && (
              <AdminRegistrationFlow
                onSuccess={() => handleRegistrationSuccess("/provider-dashboard")}
                onFailed={handleRegistrationFailed}
              />
            )}

            {selectedRole === "patient" && (
              <PatientRegistrationFlow
                onSuccess={() => handleRegistrationSuccess("/")}
                onFailed={handleRegistrationFailed}
              />
            )}
          </div>
        )}

        {/* Success State */}
        {status === "success" && (
          <div className="max-w-md mx-auto text-center">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-8 pb-6">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-green-800 mb-2">
                  Registration Successful!
                </h2>
                <p className="text-green-700 mb-4">
                  Your account has been created successfully.
                </p>
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Redirecting to your dashboard...</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Failed State */}
        {status === "failed" && (
          <div className="max-w-md mx-auto text-center">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-8 pb-6">
                <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                  <XCircle className="w-10 h-10 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-red-800 mb-2">
                  Registration Failed
                </h2>
                <p className="text-red-700 mb-6">
                  {errorMessage || "An error occurred during registration. Please try again."}
                </p>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" onClick={handleBack}>
                    Change Role
                  </Button>
                  <Button onClick={handleRetry}>
                    Retry Registration
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Register;
