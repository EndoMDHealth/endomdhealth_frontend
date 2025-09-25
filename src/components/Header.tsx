import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X, Search, Phone, Mail } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { name: "Who we are", href: "#about" },
    { name: "What we offer", href: "#services" },
    { name: "Who we serve", href: "#serve" },
    { name: "Contact Us", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-brand-starry-hug shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-xl lg:text-2xl font-bold">
              <span className="text-brand-sunshine-boost">ENDO</span>
              <span className="text-white">MD</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white hover:text-brand-sunshine-boost transition-colors duration-300 font-medium text-sm whitespace-nowrap"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex items-center space-x-3">
            <div className="relative">
              <Input 
                type="search" 
                placeholder="Search..."
                className="w-32 xl:w-40 bg-white/10 border-white/20 text-white placeholder:text-white/70 pr-8"
              />
              <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
            </div>
          </div>

          {/* Request Appointment Button */}
          <div className="hidden lg:flex items-center">
            <Button className="bg-brand-sunshine-boost hover:bg-brand-sunshine-boost/90 text-brand-starry-hug font-semibold px-4 xl:px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105 whitespace-nowrap">
              Request appointment
            </Button>
          </div>

          {/* Contact Info - Desktop only */}
          <div className="hidden xl:flex items-center space-x-6 text-sm text-white/90">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>(571) 480-6053</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>info@endomdhealth.com</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-brand-sunshine-boost transition-colors duration-300"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/20">
            {/* Mobile Search */}
            <div className="mb-4">
              <div className="relative">
                <Input 
                  type="search" 
                  placeholder="Search..."
                  className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/70 pr-8"
                />
                <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
              </div>
            </div>

            {/* Mobile Contact Info */}
            <div className="mb-4 space-y-2 text-sm text-white/90">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>(571) 480-6053</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@endomdhealth.com</span>
              </div>
            </div>

            <nav className="space-y-3 mb-4">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-white hover:text-brand-sunshine-boost transition-colors duration-300 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
            
            <Button className="w-full bg-brand-sunshine-boost hover:bg-brand-sunshine-boost/90 text-brand-starry-hug font-semibold py-3 rounded-lg transition-all duration-300">
              Request appointment
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;