
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Mic, Headphones } from 'lucide-react';

const PodCTA = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-pod-purple/20 to-pod-blue/10">
      <div className="pod-container text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Join the PodVilla Community?</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Whether you're a creator looking to share your voice or a listener seeking new content, 
          PodVilla is the platform for you.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-pod-purple hover:bg-pod-purple-dark gap-2" asChild>
            <Link to="/register">
              <Headphones className="h-5 w-5" />
              Join as Listener
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-pod-purple text-pod-purple hover:bg-pod-purple/10 gap-2" asChild>
            <Link to="/register?type=creator">
              <Mic className="h-5 w-5" />
              Join as Creator
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PodCTA;
