
import React from 'react';
import PodNavbar from '@/components/PodNavbar';
import PodFooter from '@/components/PodFooter';
import PodcastCard, { PodcastCardProps } from '@/components/PodcastCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

// Sample data for library
const favoritePodcasts: PodcastCardProps[] = [
  {
    id: "1",
    title: "The Creative Mind",
    creator: "Alex Johnson",
    coverImage: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Creativity",
  },
  {
    id: "3",
    title: "Business Insights",
    creator: "James Wilson",
    coverImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Business",
  },
];

const recentPodcasts: PodcastCardProps[] = [
  {
    id: "2",
    title: "Tech Today",
    creator: "Sarah Miller",
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Technology",
  },
  {
    id: "4",
    title: "Mindfulness Meditation",
    creator: "Emma Thompson",
    coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Wellness",
  },
];

const downloadedPodcasts: PodcastCardProps[] = [
  {
    id: "5",
    title: "History Uncovered",
    creator: "David Brown",
    coverImage: "https://images.unsplash.com/photo-1461360228754-6e81c478b882?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "History",
  },
];

const LibraryPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PodNavbar />
      <main className="flex-grow py-8">
        <div className="pod-container">
          <h1 className="text-3xl font-bold mb-8">Your Library</h1>
          
          <Tabs defaultValue="favorites" className="mb-8">
            <TabsList>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="recent">Recently Played</TabsTrigger>
              <TabsTrigger value="downloaded">Downloaded</TabsTrigger>
              <TabsTrigger value="playlists">Playlists</TabsTrigger>
            </TabsList>
            
            <TabsContent value="favorites">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {favoritePodcasts.map((podcast) => (
                  <PodcastCard key={podcast.id} {...podcast} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="recent">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {recentPodcasts.map((podcast) => (
                  <PodcastCard key={podcast.id} {...podcast} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="downloaded">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {downloadedPodcasts.map((podcast) => (
                  <PodcastCard key={podcast.id} {...podcast} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="playlists">
              <div className="mt-6">
                <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-border rounded-lg">
                  <p className="text-lg text-muted-foreground mb-4">Create your first playlist</p>
                  <Button className="bg-pod-purple hover:bg-pod-purple-dark">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Playlist
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <PodFooter />
    </div>
  );
};

export default LibraryPage;
