import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X, Search, Phone, Mail } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { name: "Who we are", href: "/who-we-are" },
    { name: "What we offer", href: "#services" },
    { name: "Who we serve", href: "#serve" },
    { name: "Contact Us", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-xl lg:text-2xl font-bold">
              <span className="text-accent">ENDO</span>
              <span className="text-primary-foreground">MD</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-primary-foreground hover:text-accent transition-colors duration-300 font-medium text-sm whitespace-nowrap"
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
                className="w-32 xl:w-40 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/70 pr-8"
              />
              <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary-foreground/70" />
            </div>
          </div>

          {/* Request Appointment Button */}
          <div className="hidden lg:flex items-center">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-4 xl:px-6 py-2 transition-all whitespace-nowrap">
              Request appointment
            </Button>
          </div>

          {/* Contact Info - Desktop only */}
          <div className="hidden xl:flex items-center space-x-6 text-sm text-primary-foreground/90">
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
            className="lg:hidden p-2 text-primary-foreground hover:text-accent transition-colors duration-300"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-primary-foreground/20">
            {/* Mobile Search */}
            <div className="mb-4">
              <div className="relative">
                <Input 
                  type="search" 
                  placeholder="Search..."
                  className="w-full bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/70 pr-8"
                />
                <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary-foreground/70" />
              </div>
            </div>

            {/* Mobile Contact Info */}
            <div className="mb-4 space-y-2 text-sm text-primary-foreground/90">
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
                  className="block text-primary-foreground hover:text-accent transition-colors duration-300 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
            
            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 transition-all">
              Request appointment
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;