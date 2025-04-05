
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Headphones, Upload, Users } from "lucide-react";

const PodHero = () => {
  return (
    <div className="py-16 md:py-24 bg-gradient-to-br from-pod-purple/10 to-pod-blue/5">
      <div className="pod-container">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-pod-purple to-pod-blue bg-clip-text text-transparent">
              Your Voice. Your Community.
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto md:mx-0">
              Discover, create, and connect with podcasters and listeners in a revolutionary audio space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" className="bg-pod-purple hover:bg-pod-purple-dark" asChild>
                <Link to="/explore">
                  <Headphones className="mr-2 h-5 w-5" />
                  Discover Podcasts
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-pod-purple text-pod-purple hover:bg-pod-purple/10" asChild>
                <Link to="/create">
                  <Upload className="mr-2 h-5 w-5" />
                  Start Creating
                </Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center md:justify-start">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Join thousands of creators and listeners</span>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="w-full h-64 md:h-80 lg:h-96 bg-gradient-to-br from-pod-purple/20 to-pod-blue/20 rounded-2xl relative overflow-hidden">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <div className="h-32 w-32 rounded-full bg-pod-purple flex items-center justify-center mb-4 animate-pulse-light">
                  <Headphones className="h-16 w-16 text-white" />
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-xl">PodVilla Experience</h3>
                  <p className="text-muted-foreground">Modern. Secure. Interactive.</p>
                </div>
              </div>
              {/* Decorative circles */}
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-pod-purple/10"></div>
              <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-pod-blue/10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodHero;
