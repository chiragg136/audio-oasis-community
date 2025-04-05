
import React from 'react';
import PodNavbar from '@/components/PodNavbar';
import PodFooter from '@/components/PodFooter';
import PodcastCard, { PodcastCardProps } from '@/components/PodcastCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Sample data for explore page
const explorePodcasts: PodcastCardProps[] = [
  {
    id: "6",
    title: "Marketing Mastery",
    creator: "Jennifer Lee",
    coverImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Marketing",
  },
  {
    id: "7",
    title: "Science Today",
    creator: "Dr. Michael Chen",
    coverImage: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Science",
    isNew: true,
  },
  {
    id: "8",
    title: "Daily Fitness",
    creator: "Samantha Wright",
    coverImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Fitness",
  },
  {
    id: "9",
    title: "World Politics",
    creator: "Robert Evans",
    coverImage: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Politics",
  },
  {
    id: "10",
    title: "Art & Culture",
    creator: "Isabella Martinez",
    coverImage: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Art",
    isNew: true,
  },
  {
    id: "11",
    title: "Financial Freedom",
    creator: "Thomas Johnson",
    coverImage: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Finance",
  },
  {
    id: "12",
    title: "Travel Stories",
    creator: "Emma Rodriguez",
    coverImage: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Travel",
  },
  {
    id: "13",
    title: "Tech Innovations",
    creator: "Daniel Kim",
    coverImage: "https://images.unsplash.com/photo-1535303311164-664fc9ec6532?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Technology",
  }
];

const ExplorePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PodNavbar />
      <main className="flex-grow py-8">
        <div className="pod-container">
          <h1 className="text-3xl font-bold mb-8">Explore Podcasts</h1>
          
          <div className="relative mb-8 max-w-lg mx-auto">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search podcasts, creators, or topics..."
              className="pl-10 py-6"
            />
          </div>
          
          <Tabs defaultValue="trending" className="mb-8">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-4">
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="recommended">For You</TabsTrigger>
            </TabsList>
            <TabsContent value="trending">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {explorePodcasts.map((podcast) => (
                  <PodcastCard key={podcast.id} {...podcast} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="new">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {explorePodcasts.filter(p => p.isNew).map((podcast) => (
                  <PodcastCard key={podcast.id} {...podcast} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="popular">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {explorePodcasts.slice(0, 4).map((podcast) => (
                  <PodcastCard key={podcast.id} {...podcast} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="recommended">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {explorePodcasts.slice(2, 6).map((podcast) => (
                  <PodcastCard key={podcast.id} {...podcast} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <PodFooter />
    </div>
  );
};

export default ExplorePage;
