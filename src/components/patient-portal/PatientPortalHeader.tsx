import { useState } from 'react';
import { Bell, ChevronDown, LogOut, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import endo_yellow from '@/assets/logos/endo_yellow.png';

interface PatientPortalHeaderProps {
  firstName: string;
}

const PatientPortalHeader = ({ firstName }: PatientPortalHeaderProps) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasNotifications] = useState(true);

  const handleSignOut = async () => {
    await signOut();
    navigate('/for-patients');
  };

  return (
    <header className="sticky top-0 z-50 bg-patient-navy shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <img src={endo_yellow} alt="EndoMD Health Logo" className="w-8 h-8" />
            <div className="flex flex-col">
              <span className="text-xl font-bold">
                <span className="text-patient-gold">ENDO</span>
                <span className="text-white">MD Health</span>
              </span>
              <span className="text-xs text-white/70 -mt-1">Patient Portal</span>
            </div>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Notification Bell */}
            <Button
              variant="ghost"
              size="icon"
              className="relative text-white hover:bg-white/10"
            >
              <Bell className="h-5 w-5" />
              {hasNotifications && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-patient-coral rounded-full" />
              )}
            </Button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10 flex items-center space-x-2"
                >
                  <div className="w-8 h-8 rounded-full bg-patient-teal flex items-center justify-center text-white font-semibold">
                    {firstName.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden lg:inline">{firstName}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="cursor-pointer">
                  <User className="h-4 w-4 mr-2" />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="flex flex-col space-y-3">
              <Button
                variant="ghost"
                className="justify-start text-white hover:bg-white/10"
              >
                <Bell className="h-5 w-5 mr-2" />
                Notifications
                {hasNotifications && (
                  <span className="ml-2 w-2 h-2 bg-patient-coral rounded-full" />
                )}
              </Button>
              <Button
                variant="ghost"
                className="justify-start text-white hover:bg-white/10"
              >
                <User className="h-5 w-5 mr-2" />
                My Profile
              </Button>
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="justify-start text-white hover:bg-white/10"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default PatientPortalHeader;
