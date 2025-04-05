
import React from 'react';
import PodcastCard, { PodcastCardProps } from './PodcastCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample data for featured podcasts
const featuredPodcasts: PodcastCardProps[] = [
  {
    id: "1",
    title: "The Creative Mind",
    creator: "Alex Johnson",
    coverImage: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Creativity",
    isFeatured: true,
  },
  {
    id: "2",
    title: "Tech Today",
    creator: "Sarah Miller",
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Technology",
    isNew: true,
  },
  {
    id: "3",
    title: "Business Insights",
    creator: "James Wilson",
    coverImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Business",
  },
  {
    id: "4",
    title: "Mindfulness Meditation",
    creator: "Emma Thompson",
    coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Wellness",
    isNew: true,
  },
  {
    id: "5",
    title: "History Uncovered",
    creator: "David Brown",
    coverImage: "https://images.unsplash.com/photo-1461360228754-6e81c478b882?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "History",
  },
];

const FeaturedPodcasts = () => {
  return (
    <section className="py-16 bg-background">
      <div className="pod-container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Podcasts</h2>
          <Button variant="ghost" className="text-pod-purple gap-2" asChild>
            <Link to="/explore">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPodcasts.map((podcast) => (
            <PodcastCard key={podcast.id} {...podcast} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPodcasts;
