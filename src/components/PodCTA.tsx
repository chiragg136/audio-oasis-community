
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PodCTA = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-pod-purple to-pod-blue">
      <div className="pod-container text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Share Your Voice?</h2>
        <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8">
          Join thousands of creators who are building their audience and sharing their passion with the world.
        </p>
        <Button size="lg" className="bg-white text-pod-purple hover:bg-white/90" asChild>
          <Link to="/create">Start Creating</Link>
        </Button>
      </div>
    </section>
  );
};

export default PodCTA;
