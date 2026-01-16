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
  Send,
  Home,
  FileDown,
  Building2,
  UserCircle,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { RoleBadge } from "./RoleBadge";

type UserRole = 'physician' | 'admin' | 'admin_staff' | 'specialist';

interface SidebarItem {
  id: string;
  label: string;
  adminLabel?: string; // Alternative label for admin_staff
  icon: React.ElementType;
  path?: string;
  children?: { id: string; label: string; path: string }[];
  adminOnly?: boolean;
  providerOnly?: boolean;
}

const getSidebarItems = (isAdminStaff: boolean): SidebarItem[] => [
  { id: 'home', label: 'Home', icon: Home, path: '/provider-dashboard' },
  { 
    id: 'submissions', 
    label: isAdminStaff ? 'e-Consults' : 'My e-Consults', 
    icon: Send,
    children: [
      { id: 'submissions-active', label: 'Active Submissions', path: '/provider-dashboard/submissions/active' },
      { id: 'submissions-archived', label: 'Archived Submissions', path: '/provider-dashboard/submissions/archived' },
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
    label: isAdminStaff ? 'Patient Referrals' : 'My Referrals', 
    icon: FileText,
    children: [
      { id: 'referrals-active', label: 'Active', path: '/provider-dashboard/referrals/active' },
    ]
  },
  { id: 'account', label: 'Account', icon: UserCircle, path: '/provider-dashboard/account' },
  { id: 'forms', label: 'Forms', icon: FileDown, path: '/provider-dashboard/forms' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/provider-dashboard/analytics', adminOnly: true },
  { id: 'team', label: 'Providers / Team', icon: Users, path: '/provider-dashboard/team', adminOnly: true },
  { id: 'clinic', label: 'Practice Settings', icon: Building2, path: '/provider-dashboard/clinic', adminOnly: true },
  { id: 'support', label: 'Support', icon: HelpCircle, path: '/provider-dashboard/support' },
];

interface DashboardSidebarProps {
  onNavigate?: (path: string) => void;
  userRole?: UserRole;
  clinicName?: string;
}

export const DashboardSidebar = ({ onNavigate, userRole, clinicName }: DashboardSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [expandedItems, setExpandedItems] = useState<string[]>(['submissions', 'referrals', 'responses']);
  const [isAdmin, setIsAdmin] = useState(false);
  const [role, setRole] = useState<UserRole>('physician');
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Check screen size on mount and set default collapse state
  useEffect(() => {
    const checkScreenSize = () => {
      setIsCollapsed(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const checkRole = async () => {
      if (userRole) {
        setRole(userRole);
        setIsAdmin(userRole === 'admin' || userRole === 'admin_staff');
        return;
      }
      
      if (!user) return;
      const { data } = await supabase
        .from('physician_roles')
        .select('role')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (data?.role) {
        setRole(data.role as UserRole);
        setIsAdmin(data.role === 'admin' || data.role === 'admin_staff');
      }
    };
    checkRole();
  }, [user, userRole]);

  const sidebarItems = getSidebarItems(role === 'admin_staff');

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
    <aside className={cn(
      "bg-card border-r border-border flex flex-col h-[calc(100vh-64px)] sticky top-16 transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Toggle button */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!isCollapsed && <RoleBadge role={role} />}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "p-2 hover:bg-muted rounded-lg transition-colors",
            isCollapsed && "mx-auto"
          )}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
        </button>
      </div>
      
      {/* View indicator - only show when expanded */}
      {!isCollapsed && (
        <div className="px-4 py-3 border-b border-border">
          {role === 'admin_staff' && (
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Building2 className="h-3 w-3" />
              Clinic-wide view
            </p>
          )}
          {role === 'physician' && (
            <p className="text-xs text-muted-foreground">
              Showing your submissions
            </p>
          )}
          {clinicName && (
            <p className="text-xs font-medium text-foreground mt-1 truncate">
              {clinicName}
            </p>
          )}
        </div>
      )}
      
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
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
                  if (isCollapsed && !hasChildren && item.path) {
                    handleNavigate(item.path);
                  } else if (hasChildren) {
                    if (isCollapsed) {
                      setIsCollapsed(false);
                      setTimeout(() => toggleExpand(item.id), 100);
                    } else {
                      toggleExpand(item.id);
                    }
                  } else if (item.path) {
                    handleNavigate(item.path);
                  }
                }}
                disabled={isDisabled}
                title={isCollapsed ? item.label : undefined}
                className={cn(
                  "w-full flex items-center rounded-lg text-sm font-medium transition-all duration-200",
                  isCollapsed ? "justify-center p-3" : "justify-between px-3 py-2.5",
                  active && !hasChildren
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : isDisabled
                    ? "text-muted-foreground/50 cursor-not-allowed"
                    : "text-foreground hover:bg-muted"
                )}
              >
                <div className={cn(
                  "flex items-center",
                  isCollapsed ? "justify-center" : "gap-3"
                )}>
                  <Icon className={cn(
                    "h-5 w-5 flex-shrink-0",
                    active && !hasChildren ? "text-primary-foreground" : isDisabled ? "text-muted-foreground/50" : "text-muted-foreground"
                  )} />
                  {!isCollapsed && <span>{item.label}</span>}
                </div>
                {!isCollapsed && hasChildren && (
                  isExpanded 
                    ? <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    : <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
              
              {!isCollapsed && hasChildren && isExpanded && (
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
          <div className={cn(
            "flex items-center gap-2 text-xs text-muted-foreground",
            isCollapsed && "justify-center"
          )}>
            <div className="h-2 w-2 rounded-full bg-accent animate-pulse" title={isCollapsed ? "Admin Access" : undefined} />
            {!isCollapsed && <span>Admin Access</span>}
          </div>
        </div>
      )}
    </aside>
  );
};
