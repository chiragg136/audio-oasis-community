
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Headphones, User, Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const PodNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-background border-b py-4 sticky top-0 z-50">
      <div className="pod-container">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center">
              <Headphones className="h-8 w-8 text-pod-purple" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-pod-purple to-pod-blue bg-clip-text text-transparent">
                PodVilla
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className={cn("hidden md:flex items-center space-x-6")}>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search podcasts..."
                className="pl-10 pr-4 py-2 rounded-full bg-secondary/50 hover:bg-secondary focus:bg-secondary focus:outline-none focus:ring-2 focus:ring-pod-purple w-64 transition-all"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link to="/explore">Explore</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/library">Library</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/community">Community</Link>
              </Button>
              <div className="w-px h-6 bg-border" />
              <Button variant="outline" className="gap-2" asChild>
                <Link to="/login">
                  <User className="h-4 w-4" />
                  <span>Login</span>
                </Link>
              </Button>
              <Button className="bg-pod-purple hover:bg-pod-purple-dark" asChild>
                <Link to="/register">Sign Up</Link>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mt-4 md:hidden animate-fade-in">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search podcasts..."
                className="pl-10 pr-4 py-2 rounded-full bg-secondary/50 w-full"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Link to="/explore" className="p-2 hover:bg-secondary rounded-md">
                Explore
              </Link>
              <Link to="/library" className="p-2 hover:bg-secondary rounded-md">
                Library
              </Link>
              <Link to="/community" className="p-2 hover:bg-secondary rounded-md">
                Community
              </Link>
              <div className="h-px w-full bg-border my-2" />
              <Link to="/login" className="p-2 hover:bg-secondary rounded-md">
                Login
              </Link>
              <Button className="bg-pod-purple hover:bg-pod-purple-dark" asChild>
                <Link to="/register">Sign Up</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default PodNavbar;
