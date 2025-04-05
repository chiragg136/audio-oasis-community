
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const PodNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const location = useLocation();

  const navigationLinks = [
    { name: "Explore", href: "/explore" },
    { name: "Library", href: "/library" },
    { name: "Community", href: "/community" },
    { name: "Rooms", href: "/rooms" },
  ];

  const handleLoginClick = () => {
    if (location.pathname !== '/login') {
      // If not already on login page, toast a message
      toast({
        title: "Welcome Back!",
        description: "Login to access your personalized podcast experience",
      });
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navbarClasses = {
    header: "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
    container: "pod-container flex h-16 items-center justify-between",
    logoLink: "flex items-center gap-2 font-bold text-xl text-foreground",
    desktopNav: "hidden md:flex ml-8 space-x-6",
    navLink: `text-sm transition-colors hover:text-foreground ${location.pathname === '/explore' ? 'text-foreground font-medium' : 'text-muted-foreground'}`,
    authButtons: "hidden md:flex gap-2",
    mobileMenuButton: "md:hidden",
    mobileNav: "md:hidden border-t",
    mobileNavLink: `text-sm transition-colors py-2 px-3 rounded-md ${location.pathname === '/explore' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`,
    mobileAuthButtons: "flex flex-col gap-2",
  };

  return (
    <header className={navbarClasses.header}>
      <div className={navbarClasses.container}>
        <div className="flex items-center">
          <Link to="/" className={navbarClasses.logoLink}>
            <span className="text-pod-purple">Pod</span>Villa
          </Link>
          
          {/* Desktop Navigation */}
          <nav className={navbarClasses.desktopNav}>
            {navigationLinks.map(link => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm transition-colors hover:text-foreground ${location.pathname === link.href ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-2">
            <Button variant="ghost" size="sm" asChild onClick={handleLoginClick}>
              <Link to="/login">Login</Link>
            </Button>
            <Button size="sm" className="bg-pod-purple hover:bg-pod-purple-dark" asChild>
              <Link to="/register">Sign Up</Link>
            </Button>
          </div>
          
          <Button variant="outline" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t">
          <nav className="flex flex-col p-4 space-y-3">
            {navigationLinks.map(link => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm transition-colors py-2 px-3 rounded-md ${location.pathname === link.href ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <hr className="my-2" />
            <div className="flex flex-col gap-2">
              <Button variant="ghost" size="sm" asChild onClick={handleLoginClick}>
                <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
              </Button>
              <Button size="sm" className="bg-pod-purple hover:bg-pod-purple-dark" asChild onClick={() => setIsOpen(false)}>
                <Link to="/register">Sign Up</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default PodNavbar;
