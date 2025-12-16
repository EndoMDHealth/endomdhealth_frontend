import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X, Search, Phone, Mail, LogOut, User } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import endo_yellow from "../assets/logos/endo_yellow.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    if (user) {
      const fullName = user.user_metadata.full_name;
      document.title = `EndoMD Health - ${fullName}`;
      setFullName(fullName);
    } else {
      document.title = "EndoMD Health";
    }
  }, [user]);

  const whoWeAreItems = [
    { name: "What We Treat", href: "/what-we-treat" },
    { name: "Resources", href: "/resources" },
    { name: "About Us", href: "/about-us" },
    { name: "Blog", href: "/blog" },
  ];

  const whatWeOfferItems = [
    { name: "Medical Consult", href: "/medical-consult" },
    { name: "Nutrition & Lifestyle Coaching", href: "/nutrition-coaching" },
    { name: "E-Consult", href: "/e-consult" },
  ];

  const whoWeServeItems = [
    { name: "For Patients", href: "/for-patients" },
    { name: "For Parents", href: "/for-parents" },
    { name: "For Providers", href: "/for-healthcare-professionals" },
    { name: "For Schools", href: "/for-schools" },
    { name: "For Community Partners", href: "/for-community-partners" },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-md">
      {/* Top Bar - Contact Info */}
      <div className="bg-primary-foreground/10 border-b border-primary-foreground/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center lg:justify-end gap-6 py-2 text-sm text-primary-foreground/90">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>(571) 480-6053</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>info@endomdhealth.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            {" "}
            <img src={endo_yellow} alt="EndoMD Health Logo" className="w-5 h-5 mr-2"></img>
            <a href="/" className="text-xl lg:text-2xl font-bold">
              <span className="text-accent">ENDO</span>
              <span className="text-primary-foreground">MD</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="flex-row space-x-2">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-primary-foreground hover:text-accent hover:bg-primary-foreground/10 data-[state=open]:bg-primary-foreground/10 data-[state=open]:text-accent text-base font-medium px-4 h-12">
                  Who We Are
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[280px] gap-1 p-3 bg-background">
                    {whoWeAreItems.map((item) => (
                      <li key={item.name}>
                        <NavigationMenuLink asChild>
                          <a
                            href={item.href}
                            className={cn(
                              "block select-none rounded-md px-3 py-2 leading-none no-underline outline-none transition-all hover:bg-accent/10 hover:text-accent focus:bg-accent/10 focus:text-accent border border-transparent hover:border-accent/20",
                            )}
                          >
                            <div className="text-sm font-medium">{item.name}</div>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-primary-foreground hover:text-accent hover:bg-primary-foreground/10 data-[state=open]:bg-primary-foreground/10 data-[state=open]:text-accent text-base font-medium px-4 h-12">
                  What We Offer
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[320px] gap-1 p-3 bg-background">
                    {whatWeOfferItems.map((item) => (
                      <li key={item.name}>
                        <NavigationMenuLink asChild>
                          <a
                            href={item.href}
                            className={cn(
                              "block select-none rounded-md px-3 py-2 leading-none no-underline outline-none transition-all hover:bg-accent/10 hover:text-accent focus:bg-accent/10 focus:text-accent border border-transparent hover:border-accent/20",
                            )}
                          >
                            <div className="text-sm font-medium">{item.name}</div>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-primary-foreground hover:text-accent hover:bg-primary-foreground/10 data-[state=open]:bg-primary-foreground/10 data-[state=open]:text-accent text-base font-medium px-4 h-12">
                  Who We Serve
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[340px] gap-1 p-3 md:grid-cols-2 bg-background">
                    {whoWeServeItems.map((item) => (
                      <li key={item.name}>
                        <NavigationMenuLink asChild>
                          <a
                            href={item.href}
                            className={cn(
                              "block select-none rounded-md px-3 py-2 leading-none no-underline outline-none transition-all hover:bg-accent/10 hover:text-accent focus:bg-accent/10 focus:text-accent border border-transparent hover:border-accent/20",
                            )}
                          >
                            <div className="text-sm font-medium">{item.name}</div>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a
                    href="/contact-us"
                    className="bg-transparent text-primary-foreground hover:text-accent hover:bg-primary-foreground/10 text-base font-medium px-4 h-12 inline-flex items-center justify-center"
                  >
                    Contact Us
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

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

          {/* Login & Request Appointment Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-4 xl:px-6 py-2 transition-all whitespace-nowrap">
                    <User className="h-4 w-4 mr-2" />
                    {/* {user?email.split('@')[0]} */}
                    {fullName}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                asChild
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-4 xl:px-6 py-2 transition-all whitespace-nowrap"
              >
                <a href="/auth">Login</a>
              </Button>
            )}
            <Button
              asChild
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-4 xl:px-6 py-2 transition-all whitespace-nowrap"
            >
              <a href="/appointment-request">Request appointment</a>
            </Button>
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

            <nav className="space-y-3 mb-4">
              <div>
                <div className="text-primary-foreground font-semibold mb-2">Who We Are</div>
                <div className="pl-4 space-y-2">
                  {whoWeAreItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block text-primary-foreground/80 hover:text-accent transition-colors duration-300 py-1 text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-primary-foreground font-semibold mb-2">What We Offer</div>
                <div className="pl-4 space-y-2">
                  {whatWeOfferItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block text-primary-foreground/80 hover:text-accent transition-colors duration-300 py-1 text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-primary-foreground font-semibold mb-2">Who We Serve</div>
                <div className="pl-4 space-y-2">
                  {whoWeServeItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block text-primary-foreground/80 hover:text-accent transition-colors duration-300 py-1 text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>

              <a
                href="/contact-us"
                className="block text-primary-foreground font-semibold hover:text-accent transition-colors duration-300 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </a>
            </nav>

            <div className="space-y-2">
              {user ? (
                <Button
                  onClick={handleSignOut}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 transition-all"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              ) : (
                <Button
                  asChild
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 transition-all"
                >
                  <a href="/auth">Login</a>
                </Button>
              )}
              <Button
                asChild
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 transition-all"
              >
                <a href="/appointment-request">Request appointment</a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
