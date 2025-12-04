import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface PhysicianProtectedRouteProps {
  children: React.ReactNode;
}

const PhysicianProtectedRoute = ({ children }: PhysicianProtectedRouteProps) => {
  const { user, loading: authLoading } = useAuth();
  const location = useLocation();
  const [isPhysician, setIsPhysician] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPhysicianRole = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('physician_roles')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error checking physician role:', error);
        setIsPhysician(false);
      } else {
        setIsPhysician(!!data);
      }
      setLoading(false);
    };

    if (!authLoading) {
      checkPhysicianRole();
    }
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#f8f9fb] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    // Store intended destination for redirect after login
    return <Navigate to="/provider-login" state={{ from: location.pathname }} replace />;
  }

  // If not a physician, redirect to registration
  if (isPhysician === false) {
    return <Navigate to="/provider-login?register=true" replace />;
  }

  return <>{children}</>;
};

export default PhysicianProtectedRoute;