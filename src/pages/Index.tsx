
import React from 'react';
import PodNavbar from '@/components/PodNavbar';
import PodHero from '@/components/PodHero';
import FeaturedPodcasts from '@/components/FeaturedPodcasts';
import PodFeatures from '@/components/PodFeatures';
import CategorySection from '@/components/CategorySection';
import PodCTA from '@/components/PodCTA';
import PodFooter from '@/components/PodFooter';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PodNavbar />
      <main className="flex-grow">
        <PodHero />
        <FeaturedPodcasts />
        <CategorySection />
        <PodFeatures />
        <PodCTA />
      </main>
      <PodFooter />
    </div>
  );
};

export default Index;
