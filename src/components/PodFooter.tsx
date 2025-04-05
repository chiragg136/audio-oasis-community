
import React from 'react';
import { Link } from 'react-router-dom';
import { Headphones } from 'lucide-react';

const PodFooter = () => {
  return (
    <footer className="bg-background border-t">
      <div className="pod-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center">
              <Headphones className="h-8 w-8 text-pod-purple" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-pod-purple to-pod-blue bg-clip-text text-transparent">
                PodVilla
              </span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              The innovative podcast platform that empowers creators and listeners.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><Link to="/explore" className="text-muted-foreground hover:text-foreground">Explore</Link></li>
              <li><Link to="/library" className="text-muted-foreground hover:text-foreground">Library</Link></li>
              <li><Link to="/community" className="text-muted-foreground hover:text-foreground">Community</Link></li>
              <li><Link to="/create" className="text-muted-foreground hover:text-foreground">Create</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="text-muted-foreground hover:text-foreground">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} PodVilla. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-foreground">Twitter</a>
            <a href="#" className="text-muted-foreground hover:text-foreground">Instagram</a>
            <a href="#" className="text-muted-foreground hover:text-foreground">Discord</a>
            <a href="#" className="text-muted-foreground hover:text-foreground">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PodFooter;
