import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, RefreshCw } from "lucide-react";

const VerifyEmail = () => {
  const [isResending, setIsResending] = useState(false);
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // If user is verified, redirect to home
  if (!loading && user?.email_confirmed_at) {
    navigate("/");
    return null;
  }

  // If no user, redirect to auth
  if (!loading && !user) {
    navigate("/auth");
    return null;
  }

  const handleResendEmail = async () => {
    if (!user?.email) return;
    
    setIsResending(true);
    
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: user.email,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
      },
    });
    
    setIsResending(false);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Email sent",
        description: "We've sent another verification email to your inbox.",
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Mail className="h-6 w-6 text-accent" />
              </div>
              <CardTitle className="text-2xl font-bold text-primary">
                Verify Your Email
              </CardTitle>
              <CardDescription>
                We've sent a verification link to <span className="font-medium">{user?.email}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                Please check your inbox and click the verification link to continue. 
                If you don't see the email, check your spam folder.
              </p>
              
              <Button
                onClick={handleResendEmail}
                variant="outline"
                className="w-full"
                disabled={isResending}
              >
                {isResending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Resend Verification Email
                  </>
                )}
              </Button>
              
              <Button
                onClick={handleSignOut}
                variant="ghost"
                className="w-full"
              >
                Sign out and use a different email
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VerifyEmail;
