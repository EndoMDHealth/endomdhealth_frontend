import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  HelpCircle, 
  FileText, 
  MessageSquare, 
  BarChart3, 
  Users,
  ChevronDown,
  ChevronRight,
  Archive,
  Send,
  Home,
  FileDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path?: string;
  children?: { id: string; label: string; path: string }[];
  adminOnly?: boolean;
}

const sidebarItems: SidebarItem[] = [
  { id: 'home', label: 'Home', icon: Home, path: '/provider-dashboard' },
  { 
    id: 'submissions', 
    label: 'e-Consult Submissions', 
    icon: Send,
    children: [
      { id: 'submissions-active', label: 'Active', path: '/provider-dashboard/submissions/active' },
      { id: 'submissions-archived', label: 'Archived', path: '/provider-dashboard/submissions/archived' },
    ]
  },
  { 
    id: 'responses', 
    label: 'Responses', 
    icon: MessageSquare,
    children: [
      { id: 'responses-active', label: 'Active', path: '/provider-dashboard/responses/active' },
      { id: 'responses-archived', label: 'Archived', path: '/provider-dashboard/responses/archived' },
    ]
  },
  { 
    id: 'referrals', 
    label: 'Patient Referrals', 
    icon: FileText,
    children: [
      { id: 'referrals-active', label: 'Active', path: '/provider-dashboard/referrals/active' },
    ]
  },
  { id: 'forms', label: 'Forms', icon: FileDown, path: '/provider-dashboard/forms' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/provider-dashboard/analytics', adminOnly: true },
  { id: 'team', label: 'Providers / Team', icon: Users, path: '/provider-dashboard/team', adminOnly: true },
  { id: 'support', label: 'Support', icon: HelpCircle, path: '/provider-dashboard/support' },
];

interface DashboardSidebarProps {
  onNavigate?: (path: string) => void;
}

export const DashboardSidebar = ({ onNavigate }: DashboardSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [expandedItems, setExpandedItems] = useState<string[]>(['submissions', 'referrals', 'responses']);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) return;
      const { data } = await supabase
        .from('physician_roles')
        .select('role')
        .eq('user_id', user.id)
        .maybeSingle();
      
      setIsAdmin(data?.role === 'admin');
    };
    checkAdminRole();
  }, [user]);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleNavigate = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      navigate(path);
    }
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const isParentActive = (children?: { path: string }[]) => {
    if (!children) return false;
    return children.some(child => location.pathname === child.path);
  };

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col h-[calc(100vh-64px)] sticky top-16">
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {sidebarItems.map((item) => {
          const isDisabled = item.adminOnly && !isAdmin;
          const Icon = item.icon;
          const hasChildren = !!item.children;
          const isExpanded = expandedItems.includes(item.id);
          const active = isActive(item.path) || isParentActive(item.children);
          
          return (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (isDisabled) return;
                  if (hasChildren) {
                    toggleExpand(item.id);
                  } else if (item.path) {
                    handleNavigate(item.path);
                  }
                }}
                disabled={isDisabled}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  active && !hasChildren
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : isDisabled
                    ? "text-muted-foreground/50 cursor-not-allowed"
                    : "text-foreground hover:bg-muted"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn(
                    "h-5 w-5",
                    active && !hasChildren ? "text-primary-foreground" : isDisabled ? "text-muted-foreground/50" : "text-muted-foreground"
                  )} />
                  <span>{item.label}</span>
                </div>
                {hasChildren && (
                  isExpanded 
                    ? <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    : <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
              
              {hasChildren && isExpanded && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.children?.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => handleNavigate(child.path)}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all duration-200",
                        isActive(child.path)
                          ? "bg-accent/20 text-accent-foreground font-medium border-l-2 border-accent"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
      
      {/* Admin indicator */}
      {isAdmin && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span>Admin Access</span>
          </div>
        </div>
      )}
    </aside>
  );
};
