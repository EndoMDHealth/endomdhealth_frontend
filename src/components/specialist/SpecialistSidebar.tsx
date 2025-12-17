import { cn } from "@/lib/utils";
import { 
  Home, 
  FileText, 
  Clock, 
  CheckCircle2,
  Archive,
  Settings,
  HelpCircle,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface SpecialistSidebarProps {
  onNavigate: (path: string) => void;
  currentView: string;
}

interface MenuItem {
  label: string;
  icon: React.ElementType;
  path: string;
  children?: { label: string; path: string }[];
}

export const SpecialistSidebar = ({ onNavigate, currentView }: SpecialistSidebarProps) => {
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['econsults']);

  const menuItems: MenuItem[] = [
    { label: 'Home', icon: Home, path: '/specialist-dashboard' },
    { 
      label: 'e-Consults', 
      icon: FileText, 
      path: '/specialist-dashboard/consults',
      children: [
        { label: 'New Requests', path: '/specialist-dashboard/consults/new' },
        { label: 'In Progress', path: '/specialist-dashboard/consults/in-progress' },
        { label: 'Completed', path: '/specialist-dashboard/consults/completed' },
      ]
    },
    { label: 'Archive', icon: Archive, path: '/specialist-dashboard/archive' },
    { label: 'Settings', icon: Settings, path: '/specialist-dashboard/settings' },
    { label: 'Support', icon: HelpCircle, path: '/specialist-dashboard/support' },
  ];

  const toggleMenu = (label: string) => {
    setExpandedMenus(prev => 
      prev.includes(label) 
        ? prev.filter(m => m !== label)
        : [...prev, label]
    );
  };

  const isActive = (path: string) => {
    if (path === '/specialist-dashboard' && currentView === 'dashboard') return true;
    if (path.includes('new') && currentView === 'consults-new') return true;
    if (path.includes('in-progress') && currentView === 'consults-in-progress') return true;
    if (path.includes('completed') && currentView === 'consults-completed') return true;
    if (path.includes('archive') && currentView === 'archive') return true;
    return false;
  };

  return (
    <aside className="w-64 min-h-[calc(100vh-64px)] bg-card border-r border-border hidden md:block">
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => (
          <div key={item.label}>
            {item.children ? (
              <>
                <button
                  onClick={() => toggleMenu(item.label.toLowerCase())}
                  className={cn(
                    "w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    expandedMenus.includes(item.label.toLowerCase())
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted"
                  )}
                  aria-label={`Toggle ${item.label} menu`}
                  aria-expanded={expandedMenus.includes(item.label.toLowerCase())}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                  {expandedMenus.includes(item.label.toLowerCase()) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                
                {expandedMenus.includes(item.label.toLowerCase()) && (
                  <div className="ml-7 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <button
                        key={child.path}
                        onClick={() => onNavigate(child.path)}
                        className={cn(
                          "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                          isActive(child.path)
                            ? "bg-accent text-accent-foreground font-medium"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                        aria-label={child.label}
                      >
                        {child.label === 'New Requests' && <Clock className="h-3.5 w-3.5" />}
                        {child.label === 'In Progress' && <FileText className="h-3.5 w-3.5" />}
                        {child.label === 'Completed' && <CheckCircle2 className="h-3.5 w-3.5" />}
                        <span>{child.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Button
                variant="ghost"
                onClick={() => onNavigate(item.path)}
                className={cn(
                  "w-full justify-start gap-3 px-3 py-2.5 h-auto font-medium",
                  isActive(item.path)
                    ? "bg-accent text-accent-foreground"
                    : "text-foreground hover:bg-muted"
                )}
                aria-label={item.label}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Button>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};
