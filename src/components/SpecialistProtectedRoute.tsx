import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface SpecialistProtectedRouteProps {
  children: React.ReactNode;
}

const SpecialistProtectedRoute = ({ children }: SpecialistProtectedRouteProps) => {
  const { user, loading: authLoading } = useAuth();
  const location = useLocation();
  const [isSpecialist, setIsSpecialist] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSpecialistRole = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('physician_roles')
        .select('id, role')
        .eq('user_id', user.id)
        .eq('role', 'specialist')
        .maybeSingle();

      if (error) {
        console.error('Error checking specialist role:', error);
        setIsSpecialist(false);
      } else {
        setIsSpecialist(!!data);
      }
      setLoading(false);
    };

    if (!authLoading) {
      checkSpecialistRole();
    }
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#0d1b2a] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/specialist-login" state={{ from: location.pathname }} replace />;
  }

  if (isSpecialist === false) {
    return <Navigate to="/specialist-login?register=true" replace />;
  }

  return <>{children}</>;
};

export default SpecialistProtectedRoute;
