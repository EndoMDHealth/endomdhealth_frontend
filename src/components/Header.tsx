import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Search, Phone, Mail, FileText, Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    {
      title: "Who We Are",
      items: [
        { title: "What We Treat", href: "/what-we-treat" },
        { title: "Resources", href: "/resources" },
        { title: "About Us", href: "/about" },
        { title: "Blog", href: "/blog" },
      ],
    },
    {
      title: "What We Offer",
      items: [
        { title: "Medical Consult", href: "/what-we-offer/medical-consult" },
        { title: "Nutrition & Lifestyle Coaching", href: "/what-we-offer/nutrition-lifestyle-coaching" },
        { title: "E-Consult", href: "/what-we-offer/e-consult" },
      ],
    },
    {
      title: "Who We Serve",
      items: [
        { title: "For Patients", href: "/who-we-serve/patients" },
        { title: "For Parents", href: "/who-we-serve/parents" },
        { title: "For Healthcare Professionals", href: "/who-we-serve/healthcare-professionals" },
        { title: "For Schools", href: "/who-we-serve/schools" },
        { title: "For Community Partners", href: "/who-we-serve/community-partners" },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold">EndoMD Health</h1>
            <span className="hidden md:block text-sm font-medium text-accent">Helping kids thrive</span>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="space-x-6">
              {navigationItems.map((nav) => (
                <NavigationMenuItem key={nav.title}>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-primary-foreground/10 text-primary-foreground">
                    {nav.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-64 gap-3 p-4 bg-card text-card-foreground">
                      {nav.items.map((item) => (
                        <li key={item.href}>
                          <NavigationMenuLink asChild>
                            <a
                              href={item.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">{item.title}</div>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Contact Info - Desktop */}
          <div className="hidden xl:flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>571-480-6053</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail className="h-4 w-4" />
              <span>info@endomdhealth.com</span>
            </div>
            <div className="flex items-center space-x-1">
              <FileText className="h-4 w-4" />
              <span>804-660-6321</span>
            </div>
          </div>

          {/* Right Side - CTA & Search */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <Input 
                type="search" 
                placeholder="Search..."
                className="w-40 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/70"
              />
              <Search className="h-4 w-4 text-primary-foreground/70" />
            </div>
            
            <Button variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
              Request Appointment
            </Button>

            {/* Mobile Menu Toggle */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden text-primary-foreground">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>EndoMD Health</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  {navigationItems.map((nav) => (
                    <div key={nav.title} className="space-y-2">
                      <h3 className="font-semibold text-primary">{nav.title}</h3>
                      <ul className="space-y-2 pl-4">
                        {nav.items.map((item) => (
                          <li key={item.href}>
                            <a
                              href={item.href}
                              className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {item.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  
                  {/* Mobile Contact Info */}
                  <div className="space-y-2 pt-4 border-t">
                    <h3 className="font-semibold text-primary">Contact Us</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>571-480-6053</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>info@endomdhealth.com</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4" />
                        <span>804-660-6321</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;